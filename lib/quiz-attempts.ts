import "server-only";

import { prisma } from "@/lib/prisma";
import type { QuizAttempt } from "@/types/quiz-attempt";
import { calculateHireability, updateGlobalRanks, updateTopicRanks } from "./ranking";

const toQuizAttempt = (attempt: {
  id: string;
  correctAnswers: number;
  totalQuestions: number;
  scorePercent: number;
  createdAt: Date;
  user: { email: string };
}): QuizAttempt => {
  return {
    id: attempt.id,
    userEmail: attempt.user.email,
    correctAnswers: attempt.correctAnswers,
    totalQuestions: attempt.totalQuestions,
    scorePercent: attempt.scorePercent,
    createdAt: attempt.createdAt.toISOString(),
  };
};

export const createAttempt = async (
  input: {
    userId: string;
    correctAnswers: number;
    totalQuestions: number;
    scorePercent: number;
    topicId?: string;
  },
): Promise<QuizAttempt> => {
  const created = await prisma.attempt.create({
    data: {
      userId: input.userId,
      correctAnswers: input.correctAnswers,
      totalQuestions: input.totalQuestions,
      scorePercent: input.scorePercent,
      topicId: input.topicId,
    },
    include: {
      user: { select: { email: true } },
    },
  });

  // If topic specific, update mastery
  if (input.topicId) {
    const existingMastery = await prisma.userTopicMastery.findUnique({
      where: { userId_topicId: { userId: input.userId, topicId: input.topicId } }
    });

    if (existingMastery) {
      const newCount = existingMastery.attemptsCount + 1;
      const newAvg = (existingMastery.averageScore * existingMastery.attemptsCount + input.scorePercent) / newCount;
      
      await prisma.userTopicMastery.update({
        where: { id: existingMastery.id },
        data: {
          averageScore: newAvg,
          attemptsCount: newCount,
        }
      });
    } else {
      await prisma.userTopicMastery.create({
        data: {
          userId: input.userId,
          topicId: input.topicId,
          averageScore: input.scorePercent,
          attemptsCount: 1,
        }
      });
    }

    // Trigger Ranking Updates (Optimistic / Sequential for now)
    await updateTopicRanks(input.topicId);
    await calculateHireability(input.userId);
    await updateGlobalRanks();
  }

  return toQuizAttempt(created);
};

export const getAttemptsForUser = async (userId: string): Promise<QuizAttempt[]> => {
  const attempts = await prisma.attempt.findMany({
    where: { userId },
    include: {
      user: { select: { email: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return attempts.map(toQuizAttempt);
};

export const getAttemptSummaryForUser = async (userId: string) => {
  const [attemptsCount, average] = await Promise.all([
    prisma.attempt.count({ where: { userId } }),
    prisma.attempt.aggregate({
      where: { userId },
      _avg: { scorePercent: true },
    }),
  ]);

  return {
    attemptsCount,
    averageScorePercent: Number((average._avg.scorePercent ?? 0).toFixed(2)),
  };
};
