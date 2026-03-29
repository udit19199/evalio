import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { createAttempt, getAttemptsForUser } from "@/lib/quiz-attempts";

type AttemptPayload = {
  correctAnswers: number;
  totalQuestions: number;
  scorePercent: number;
};

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

  let payload: AttemptPayload;
  try {
    payload = (await request.json()) as AttemptPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
  }

  if (
    !Number.isInteger(payload.correctAnswers) ||
    !Number.isInteger(payload.totalQuestions) ||
    typeof payload.scorePercent !== "number"
  ) {
    return NextResponse.json({ error: "Invalid attempt payload" }, { status: 400 });
  }

  const attempt = await createAttempt({
    userId: session.user.id,
    correctAnswers: payload.correctAnswers,
    totalQuestions: payload.totalQuestions,
    scorePercent: payload.scorePercent,
  });

  return NextResponse.json({ attempt }, { status: 201 });
}
