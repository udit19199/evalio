import { NextResponse } from "next/server";
import { z } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const questionUpdateSchema = z.object({
  text: z.string().min(1).optional(),
  options: z.array(z.string().min(1)).min(2).optional(),
  correctAnswer: z.string().min(1).optional(),
  explanation: z.string().min(1).optional(),
  difficulty: z.enum(["easy", "medium", "hard"]).optional(),
  subtopic: z.string().min(1).nullable().optional(),
  topicIds: z.array(z.string().min(1)).min(1).optional(),
});

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const question = await prisma.question.findUnique({
    where: { id },
    include: {
      topics: {
        select: { id: true, name: true, skillId: true },
      },
    },
  });

  if (!question) {
    return NextResponse.json({ error: "Question not found" }, { status: 404 });
  }

  return NextResponse.json({ question });
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
  }

  const parsed = questionUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid question payload" }, { status: 400 });
  }

  const payload = parsed.data;
  const nextOptions = payload.options;
  const nextCorrectAnswer = payload.correctAnswer;

  if (nextOptions && nextCorrectAnswer && !nextOptions.includes(nextCorrectAnswer)) {
    return NextResponse.json(
      { error: "correctAnswer must match one option" },
      { status: 400 },
    );
  }

  const existing = await prisma.question.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: "Question not found" }, { status: 404 });
  }

  const effectiveOptions = nextOptions ?? existing.options.split("|||");
  const effectiveCorrectAnswer = nextCorrectAnswer ?? existing.correctAnswer;
  if (!effectiveOptions.includes(effectiveCorrectAnswer)) {
    return NextResponse.json(
      { error: "correctAnswer must match one option" },
      { status: 400 },
    );
  }

  const question = await prisma.question.update({
    where: { id },
    data: {
      ...(payload.text !== undefined ? { text: payload.text } : {}),
      ...(payload.options !== undefined ? { options: payload.options.join("|||") } : {}),
      ...(payload.correctAnswer !== undefined ? { correctAnswer: payload.correctAnswer } : {}),
      ...(payload.explanation !== undefined ? { explanation: payload.explanation } : {}),
      ...(payload.difficulty !== undefined ? { difficulty: payload.difficulty } : {}),
      ...(payload.subtopic !== undefined ? { subtopic: payload.subtopic ?? null } : {}),
      ...(payload.topicIds !== undefined
        ? {
            topics: {
              set: payload.topicIds.map((topicId) => ({ id: topicId })),
            },
          }
        : {}),
    },
    include: {
      topics: {
        select: { id: true, name: true, skillId: true },
      },
    },
  });

  return NextResponse.json({ question });
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const existing = await prisma.question.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: "Question not found" }, { status: 404 });
  }

  await prisma.question.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
