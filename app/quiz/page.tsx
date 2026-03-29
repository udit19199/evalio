"use client";

import { useEffect, useMemo, useState } from "react";
import QuizCard from "@/components/QuizCard";
import ResultScreen from "@/components/ResultScreen";
import { questions, type Difficulty, type Question } from "@/data/questions";
import type { QuizAttempt } from "@/types/quiz-attempt";

type DifficultyFilter = "all" | Difficulty;

const TOTAL_QUESTIONS_PER_RUN = 30;
const TIMER_DURATION = 20;

const shuffleQuestions = (list: Question[]) => {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

export default function QuizPage() {
  const [difficultyFilter, setDifficultyFilter] = useState<DifficultyFilter>("all");
  const [timerEnabled, setTimerEnabled] = useState(true);
  const [sessionQuestions, setSessionQuestions] = useState<Question[]>([]);
  const [started, setStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isLocked, setIsLocked] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [attempts, setAttempts] = useState<QuizAttempt[]>([]);
  const [isSavingAttempt, setIsSavingAttempt] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [hasSavedCurrentResult, setHasSavedCurrentResult] = useState(false);

  const totalQuestions = sessionQuestions.length;
  const currentQuestion = sessionQuestions[currentIndex];
  const isQuizFinished = started && currentIndex >= totalQuestions;
  const isTimedOut = timerEnabled && timeLeft === 0 && !isLocked;

  const scorePercent = useMemo(() => {
    if (!totalQuestions) {
      return 0;
    }
    return Math.round((correctAnswers / totalQuestions) * 100);
  }, [correctAnswers, totalQuestions]);

  useEffect(() => {
    if (!started || isQuizFinished || !timerEnabled || isLocked) {
      return;
    }

    if (timeLeft === null) {
      return;
    }

    if (timeLeft <= 0) {
      return;
    }

    const timer = window.setTimeout(() => {
      setTimeLeft((prev) => (prev === null ? null : prev - 1));
    }, 1000);

    return () => {
      window.clearTimeout(timer);
    };
  }, [started, isQuizFinished, timerEnabled, isLocked, timeLeft]);

  useEffect(() => {
    if (!isQuizFinished || totalQuestions === 0 || hasSavedCurrentResult) {
      return;
    }

    const saveAttempt = async () => {
      setIsSavingAttempt(true);
      setSaveError(null);

      try {
        const postResponse = await fetch("/api/attempts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            correctAnswers,
            totalQuestions,
            scorePercent,
          }),
        });

        if (!postResponse.ok) {
          throw new Error("Could not save attempt.");
        }

        const getResponse = await fetch("/api/attempts", {
          method: "GET",
          cache: "no-store",
        });

        if (!getResponse.ok) {
          throw new Error("Could not load attempt history.");
        }

        const payload = (await getResponse.json()) as {
          email: string;
          attempts: QuizAttempt[];
        };

        setUserEmail(payload.email);
        setAttempts(payload.attempts);
        setHasSavedCurrentResult(true);
      } catch {
        setSaveError("Failed to save this attempt. Please retry by restarting the quiz.");
      } finally {
        setIsSavingAttempt(false);
      }
    };

    void saveAttempt();
  }, [isQuizFinished, totalQuestions, hasSavedCurrentResult, correctAnswers, scorePercent]);

  const startQuiz = () => {
    const filtered =
      difficultyFilter === "all"
        ? questions
        : questions.filter((question) => question.difficulty === difficultyFilter);

    const randomized = shuffleQuestions(filtered);
    const selected = randomized.slice(0, Math.min(TOTAL_QUESTIONS_PER_RUN, randomized.length));

    setSessionQuestions(selected);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsLocked(false);
    setCorrectAnswers(0);
    setScore(0);
    setTimeLeft(timerEnabled ? TIMER_DURATION : null);
    setUserEmail(null);
    setAttempts([]);
    setIsSavingAttempt(false);
    setSaveError(null);
    setHasSavedCurrentResult(false);
    setStarted(true);
  };

  const handleSelectAnswer = (answer: string) => {
    if (!currentQuestion || isLocked) {
      return;
    }

    setSelectedAnswer(answer);
    setIsLocked(true);

    if (answer === currentQuestion.correctAnswer) {
      setCorrectAnswers((prev) => prev + 1);
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (!isLocked && !isTimedOut) {
      return;
    }

    setCurrentIndex((prev) => prev + 1);
    setSelectedAnswer(null);
    setIsLocked(false);
    setTimeLeft(timerEnabled ? TIMER_DURATION : null);
  };

  const handleRestart = () => {
    setStarted(false);
    setSessionQuestions([]);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsLocked(false);
    setCorrectAnswers(0);
    setScore(0);
    setTimeLeft(null);
    setUserEmail(null);
    setAttempts([]);
    setIsSavingAttempt(false);
    setSaveError(null);
    setHasSavedCurrentResult(false);
  };

  if (!started) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 px-4 py-12 text-zinc-100">
        <div className="mx-auto w-full max-w-3xl rounded-2xl border border-zinc-800 bg-zinc-950/80 p-8 shadow-2xl shadow-zinc-950/40">
          <h1 className="text-3xl font-bold tracking-tight">C++ Loop Output Prediction Quiz</h1>
          <p className="mt-3 text-zinc-300">
            30 questions in one run. Predict outputs from loop-only C++ code snippets.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-zinc-200">Difficulty Filter</span>
              <select
                value={difficultyFilter}
                onChange={(event) => setDifficultyFilter(event.target.value as DifficultyFilter)}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-zinc-100 focus:border-amber-400 focus:outline-none"
              >
                <option value="all">All (30 questions)</option>
                <option value="easy">Easy only (10 questions)</option>
                <option value="medium">Medium only (10 questions)</option>
                <option value="hard">Hard only (10 questions)</option>
              </select>
            </label>

            <label className="flex items-center justify-between rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2">
              <span className="text-sm font-semibold text-zinc-200">Enable Timer (20s)</span>
              <input
                type="checkbox"
                checked={timerEnabled}
                onChange={(event) => setTimerEnabled(event.target.checked)}
                className="h-4 w-4 accent-amber-400"
              />
            </label>
          </div>

          <button
            type="button"
            onClick={startQuiz}
            className="mt-8 rounded-lg bg-amber-400 px-6 py-3 text-sm font-semibold text-zinc-900 transition hover:bg-amber-300"
          >
            Start Quiz
          </button>
        </div>
      </main>
    );
  }

  if (isQuizFinished) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 px-4 py-12">
        <ResultScreen
          correctAnswers={correctAnswers}
          totalQuestions={totalQuestions}
          onRestart={handleRestart}
          username={userEmail}
          attempts={attempts}
          isSaving={isSavingAttempt}
          saveError={saveError}
        />
      </main>
    );
  }

  if (!currentQuestion) {
    return null;
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 px-4 py-8 text-zinc-100">
      <div className="mx-auto mb-4 flex w-full max-w-4xl items-center justify-between text-sm text-zinc-300">
        <p>
          Score: <span className="font-semibold text-emerald-300">{score}</span> / {totalQuestions}
        </p>
        <p>
          Accuracy: <span className="font-semibold text-sky-300">{scorePercent}%</span>
        </p>
      </div>

      <div className="mx-auto flex w-full max-w-4xl justify-center">
        <QuizCard
          question={currentQuestion}
          questionNumber={currentIndex + 1}
          totalQuestions={totalQuestions}
          selectedAnswer={selectedAnswer}
          isLocked={isLocked || isTimedOut}
          isTimedOut={isTimedOut}
          onSelectAnswer={handleSelectAnswer}
          onNext={handleNext}
          timeLeft={timerEnabled ? timeLeft : null}
        />
      </div>
    </main>
  );
}
