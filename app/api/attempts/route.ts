import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { createAttempt, getAttemptsForUser } from "@/lib/quiz-attempts";
import { z } from "zod";

const attemptPayloadSchema = z.object({
  correctAnswers: z.number().int().min(0),
  totalQuestions: z.number().int().min(1),
  scorePercent: z.number().min(0).max(100),
});

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id || !session.user.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const attempts = await getAttemptsForUser(session.user.id);
  return NextResponse.json({ email: session.user.email, attempts });
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

  const parsed = attemptPayloadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid attempt payload" }, { status: 400 });
  }

  const payload = parsed.data;

  const attempt = await createAttempt({
    userId: session.user.id,
    correctAnswers: payload.correctAnswers,
    totalQuestions: payload.totalQuestions,
    scorePercent: payload.scorePercent,
  });

  return NextResponse.json({ attempt }, { status: 201 });
}
