"use client";

import type { QuizAttempt } from "@/types/quiz-attempt";

type ResultScreenProps = {
  correctAnswers: number;
  totalQuestions: number;
  onRestart: () => void;
  username: string | null;
  attempts: QuizAttempt[];
  isSaving: boolean;
  saveError: string | null;
};

const getPerformanceMessage = (percentage: number) => {
  if (percentage < 40) {
    return "Weak";
  }

  if (percentage < 70) {
    return "Average";
  }

  return "Strong";
};

export default function ResultScreen({
  correctAnswers,
  totalQuestions,
  onRestart,
  username,
  attempts,
  isSaving,
  saveError,
}: ResultScreenProps) {
  const percentage = Number(((correctAnswers / totalQuestions) * 100).toFixed(2));
  const performance = getPerformanceMessage(percentage);

  return (
    <div className="w-full max-w-3xl rounded-2xl border border-zinc-800 bg-zinc-950/90 p-8 text-zinc-100 shadow-2xl shadow-zinc-950/40">
      <h2 className="text-3xl font-bold tracking-tight">Quiz Complete</h2>
      <p className="mt-2 text-zinc-300">Here is your loop output prediction result.</p>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-4">
          <p className="text-xs uppercase tracking-wide text-zinc-400">Correct</p>
          <p className="mt-2 text-2xl font-bold text-emerald-300">{correctAnswers}</p>
        </div>
        <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-4">
          <p className="text-xs uppercase tracking-wide text-zinc-400">Total</p>
          <p className="mt-2 text-2xl font-bold text-zinc-100">{totalQuestions}</p>
        </div>
        <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-4">
          <p className="text-xs uppercase tracking-wide text-zinc-400">Score</p>
          <p className="mt-2 text-2xl font-bold text-amber-300">{percentage}%</p>
        </div>
      </div>

      <p className="mt-6 text-lg">
        Performance: <span className="font-semibold text-sky-300">{performance}</span>
      </p>

      <div className="mt-6 rounded-xl border border-zinc-700 bg-zinc-900 p-4">
        <p className="text-xs uppercase tracking-wide text-zinc-400">Attempt Tracking</p>
        <p className="mt-2 text-sm text-zinc-200">
          User: <span className="font-semibold text-zinc-100">{username ?? "Unknown"}</span>
        </p>
        {isSaving && <p className="mt-2 text-sm text-amber-300">Saving this attempt...</p>}
        {saveError && <p className="mt-2 text-sm text-rose-300">{saveError}</p>}

        {!isSaving && !saveError && (
          <p className="mt-2 text-sm text-emerald-300">Attempt saved successfully.</p>
        )}

        <p className="mt-4 text-sm font-semibold text-zinc-200">Recent Attempts</p>
        {attempts.length === 0 ? (
          <p className="mt-2 text-sm text-zinc-400">No saved attempts yet.</p>
        ) : (
          <ul className="mt-2 space-y-2 text-sm text-zinc-300">
            {attempts.slice(0, 5).map((attempt) => (
              <li key={attempt.id} className="rounded-lg border border-zinc-800 bg-zinc-950 p-2">
                {attempt.correctAnswers}/{attempt.totalQuestions} ({attempt.scorePercent}%) -{" "}
                {new Date(attempt.createdAt).toLocaleString()}
              </li>
            ))}
          </ul>
        )}
      </div>

      <button
        type="button"
        onClick={onRestart}
        className="mt-8 rounded-lg bg-amber-400 px-5 py-2.5 text-sm font-semibold text-zinc-900 transition hover:bg-amber-300"
      >
        Restart Quiz
      </button>
    </div>
  );
}
