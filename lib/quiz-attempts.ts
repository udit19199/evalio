import "server-only";

import { prisma } from "@/lib/prisma";
import type { QuizAttempt } from "@/types/quiz-attempt";

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
  },
): Promise<QuizAttempt> => {
  const created = await prisma.attempt.create({
    data: {
      userId: input.userId,
      correctAnswers: input.correctAnswers,
      totalQuestions: input.totalQuestions,
      scorePercent: input.scorePercent,
    },
    include: {
      user: { select: { email: true } },
    },
  });

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
