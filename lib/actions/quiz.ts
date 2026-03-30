"use server";

import { prisma } from "@/lib/prisma";

export async function getQuizQuestions(topicIds: string[], difficulty: string, limit: number = 20) {
  try {
    const selectedTopicIds = new Set(topicIds);
    const questions = await prisma.question.findMany({
      where: {
        topics: { some: { id: { in: topicIds } } },
        ...(difficulty !== "all" ? { difficulty } : {}),
      },
      include: {
        topics: {
          select: { id: true, name: true },
        },
      },
      take: limit,
    });

    // Shuffle results
    return questions
      .sort(() => Math.random() - 0.5)
      .map((q) => ({
        id: q.id,
        code: q.text,
        topicName:
          q.topics.find((topic) => selectedTopicIds.has(topic.id))?.name ??
          q.topics[0]?.name ??
          "General",
        subtopic: q.subtopic ?? "General",
        options: q.options.split("|||"),
        correctAnswer: q.correctAnswer,
        explanation: q.explanation,
        difficulty: q.difficulty as "easy" | "medium" | "hard",
      }));
  } catch (error) {
    console.error("Failed to fetch questions:", error);
    return [];
  }
}

export async function getQuestionStats(topicIds: string[], difficulty: string) {
  try {
    const whereClause = {
      topics: { some: { id: { in: topicIds } } },
      ...(difficulty !== "all" ? { difficulty } : {}),
    };

    const [total, easy, medium, hard] = await Promise.all([
      prisma.question.count({ where: whereClause }),
      prisma.question.count({ 
        where: { ...whereClause, difficulty: "easy" } 
      }),
      prisma.question.count({ 
        where: { ...whereClause, difficulty: "medium" } 
      }),
      prisma.question.count({ 
        where: { ...whereClause, difficulty: "hard" } 
      }),
    ]);

    return { total, easy, medium, hard };
  } catch (error) {
    console.error("Failed to fetch question stats:", error);
    return { total: 0, easy: 0, medium: 0, hard: 0 };
  }
}
