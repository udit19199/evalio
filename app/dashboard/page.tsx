import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import SignOutButton from "@/components/SignOutButton";
import { authOptions } from "@/lib/auth";
import { getAttemptsForUser, getAttemptSummaryForUser } from "@/lib/quiz-attempts";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id || !session.user.email) {
    redirect("/signin");
  }

  const [summary, attempts] = await Promise.all([
    getAttemptSummaryForUser(session.user.id),
    getAttemptsForUser(session.user.id),
  ]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 px-4 py-10 text-zinc-100">
      <div className="mx-auto w-full max-w-4xl rounded-2xl border border-zinc-800 bg-zinc-950/90 p-8 shadow-2xl shadow-zinc-950/40">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="mt-2 text-zinc-300">Signed in as {session.user.email}</p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/quiz"
              className="rounded-lg bg-amber-400 px-4 py-2 text-sm font-semibold text-zinc-900 transition hover:bg-amber-300"
            >
              Start Quiz
            </Link>
            <SignOutButton />
          </div>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-4">
            <p className="text-xs uppercase tracking-wide text-zinc-400">Total Attempts</p>
            <p className="mt-2 text-2xl font-bold text-emerald-300">{summary.attemptsCount}</p>
          </div>
          <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-4">
            <p className="text-xs uppercase tracking-wide text-zinc-400">Average Score</p>
            <p className="mt-2 text-2xl font-bold text-sky-300">{summary.averageScorePercent}%</p>
          </div>
        </div>

        <div className="mt-8 rounded-xl border border-zinc-700 bg-zinc-900 p-4">
          <p className="text-sm font-semibold text-zinc-200">Recent Attempts</p>
          {attempts.length === 0 ? (
            <p className="mt-2 text-sm text-zinc-400">No attempts yet. Start your first quiz.</p>
          ) : (
            <ul className="mt-3 space-y-2 text-sm text-zinc-300">
              {attempts.slice(0, 10).map((attempt) => (
                <li key={attempt.id} className="rounded-lg border border-zinc-800 bg-zinc-950 p-3">
                  {attempt.correctAnswers}/{attempt.totalQuestions} ({attempt.scorePercent}%) -{" "}
                  {new Date(attempt.createdAt).toLocaleString()}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </main>
  );
}
