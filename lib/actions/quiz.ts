"use server";

import { prisma } from "@/lib/prisma";

export async function getQuizQuestions(topicId: string, difficulty: string, limit: number = 20) {
  try {
    const questions = await prisma.question.findMany({
      where: {
        topics: { some: { id: topicId } },
        ...(difficulty !== "all" ? { difficulty } : {}),
      },
      take: limit,
    });

    // Shuffle results
    return questions
      .sort(() => Math.random() - 0.5)
      .map((q) => ({
        id: q.id,
        code: q.text,
        options: q.options.split("|||"),
        correctAnswer: q.correctAnswer,
        explanation: q.explanation,
        difficulty: q.difficulty as any,
      }));
  } catch (error) {
    console.error("Failed to fetch questions:", error);
    return [];
  }
}
