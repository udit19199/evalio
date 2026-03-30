import { NextResponse } from "next/server";
import { z } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const questionCreateSchema = z.object({
  text: z.string().min(1),
  options: z.array(z.string().min(1)).min(2),
  correctAnswer: z.string().min(1),
  explanation: z.string().min(1),
  difficulty: z.enum(["easy", "medium", "hard"]),
  subtopic: z.string().min(1).optional(),
  topicIds: z.array(z.string().min(1)).min(1),
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const topicId = searchParams.get("topicId") ?? undefined;
  const difficulty = searchParams.get("difficulty") ?? undefined;
  const skillId = searchParams.get("skillId") ?? undefined;
  const limit = Math.min(Number(searchParams.get("limit") ?? 50), 200);

  const questions = await prisma.question.findMany({
    where: {
      ...(difficulty ? { difficulty } : {}),
      ...(topicId ? { topics: { some: { id: topicId } } } : {}),
      ...(skillId ? { topics: { some: { skillId } } } : {}),
    },
    include: {
      topics: {
        select: { id: true, name: true, skillId: true },
      },
    },
    orderBy: { id: "desc" },
    take: Number.isFinite(limit) ? limit : 50,
  });

  return NextResponse.json({ questions });
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
  }

  const parsed = questionCreateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid question payload" }, { status: 400 });
  }

  const payload = parsed.data;
  if (!payload.options.includes(payload.correctAnswer)) {
    return NextResponse.json(
      { error: "correctAnswer must match one option" },
      { status: 400 },
    );
  }

  const question = await prisma.question.create({
    data: {
      text: payload.text,
      options: payload.options.join("|||"),
      correctAnswer: payload.correctAnswer,
      explanation: payload.explanation,
      difficulty: payload.difficulty,
      subtopic: payload.subtopic,
      topics: {
        connect: payload.topicIds.map((id) => ({ id })),
      },
    },
    include: {
      topics: {
        select: { id: true, name: true, skillId: true },
      },
    },
  });

  return NextResponse.json({ question }, { status: 201 });
}
