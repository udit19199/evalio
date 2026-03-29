"use client";

import type { Question } from "@/data/questions";

type QuizCardProps = {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  selectedAnswer: string | null;
  isLocked: boolean;
  isTimedOut: boolean;
  onSelectAnswer: (answer: string) => void;
  onNext: () => void;
  timeLeft: number | null;
};

export default function QuizCard({
  question,
  questionNumber,
  totalQuestions,
  selectedAnswer,
  isLocked,
  isTimedOut,
  onSelectAnswer,
  onNext,
  timeLeft,
}: QuizCardProps) {
  const isCorrect = selectedAnswer === question.correctAnswer;

  return (
    <div className="w-full max-w-4xl rounded-2xl border border-zinc-800 bg-zinc-950/90 p-6 shadow-2xl shadow-zinc-950/40 md:p-8">
      <div className="mb-5 flex items-center justify-between gap-3 text-sm text-zinc-300">
        <span className="rounded-full border border-zinc-700 bg-zinc-900 px-3 py-1 font-semibold uppercase tracking-wide text-zinc-200">
          {question.difficulty}
        </span>
        <span className="font-medium text-zinc-400">
          {questionNumber}/{totalQuestions}
        </span>
      </div>

      <div className="mb-5 overflow-x-auto rounded-xl border border-zinc-800 bg-[#0b1220] p-4">
        <pre className="text-sm leading-6 text-cyan-100">
          <code>{question.code}</code>
        </pre>
      </div>

      <div className="grid gap-3">
        {question.options.map((option) => {
          const isSelected = selectedAnswer === option;
          const isAnswer = option === question.correctAnswer;

          let optionClassName =
            "border-zinc-700 bg-zinc-900/60 text-zinc-100 hover:border-zinc-500";

          if (isLocked && isAnswer) {
            optionClassName = "border-emerald-400 bg-emerald-900/40 text-emerald-100";
          } else if (isLocked && isSelected && !isAnswer) {
            optionClassName = "border-rose-400 bg-rose-900/40 text-rose-100";
          } else if (!isLocked && isSelected) {
            optionClassName = "border-sky-400 bg-sky-900/40 text-sky-100";
          }

          return (
            <button
              key={option}
              type="button"
              onClick={() => onSelectAnswer(option)}
              disabled={isLocked}
              className={`w-full rounded-lg border px-4 py-3 text-left text-sm font-medium transition ${optionClassName} disabled:cursor-not-allowed`}
            >
              {option}
            </button>
          );
        })}
      </div>

      {(isLocked || isTimedOut) && selectedAnswer && (
        <div className="mt-5 rounded-xl border border-zinc-700 bg-zinc-900/80 p-4 text-sm">
          <p className={`font-semibold ${isCorrect ? "text-emerald-300" : "text-rose-300"}`}>
            {isCorrect ? "Correct" : "Incorrect"}
          </p>
          <p className="mt-2 text-zinc-200">{question.explanation}</p>
        </div>
      )}

      {isTimedOut && !selectedAnswer && (
        <div className="mt-5 rounded-xl border border-amber-500/40 bg-amber-900/20 p-4 text-sm text-amber-200">
          Time is up. Correct answer: <span className="font-semibold">{question.correctAnswer}</span>
          <p className="mt-2 text-zinc-200">{question.explanation}</p>
        </div>
      )}

      <div className="mt-6 flex items-center justify-between gap-4">
        <span className="text-sm text-zinc-400">
          {timeLeft === null ? "No timer" : `Time left: ${timeLeft}s`}
        </span>
        <button
          type="button"
          onClick={onNext}
          disabled={!isLocked && !isTimedOut}
          className="rounded-lg bg-amber-400 px-5 py-2.5 text-sm font-semibold text-zinc-900 transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:bg-zinc-700 disabled:text-zinc-400"
        >
          {questionNumber === totalQuestions ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
}
