"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import QuizCard from "@/components/QuizCard";
import ResultScreen from "@/components/ResultScreen";
import type { Question, Difficulty } from "@/data/questions";
import type { QuizAttempt } from "@/types/quiz-attempt";
import { cn } from "@/lib/utils";
import { Target, ArrowRight, BookOpen, ChevronDown } from "lucide-react";
import { getQuizQuestions } from "@/lib/actions/quiz";

type DifficultyFilter = "all" | Difficulty;

interface QuizMetadata {
  id: string;
  name: string;
  topics: { id: string; name: string }[];
}

const TOTAL_QUESTIONS_PER_RUN = 20;
const TIMER_DURATION = 20;

export default function QuizPage() {
  const [metadata, setMetadata] = useState<QuizMetadata[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [difficultyFilter, setDifficultyFilter] = useState<DifficultyFilter>("all");
  const [timerEnabled, setTimerEnabled] = useState(true);
  
  const [sessionQuestions, setSessionQuestions] = useState<Question[]>([]);
  const [started, setStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
  const isQuizFinished = started && currentIndex >= totalQuestions && totalQuestions > 0;
  const isTimedOut = timerEnabled && timeLeft === 0 && !isLocked;

  const scorePercent = useMemo(() => {
    if (!totalQuestions) return 0;
    return Math.round((correctAnswers / totalQuestions) * 100);
  }, [correctAnswers, totalQuestions]);

  useEffect(() => {
    async function fetchMetadata() {
      const res = await fetch("/api/quiz/metadata");
      if (res.ok) {
        const data = await res.json();
        setMetadata(data);
        if (data.length > 0 && data[0].topics.length > 0) {
          setSelectedTopic(data[0].topics[0].id);
        }
      }
    }
    fetchMetadata();
  }, []);

  useEffect(() => {
    if (!started || isQuizFinished || !timerEnabled || isLocked || timeLeft === null || timeLeft <= 0) {
      return;
    }

    const timer = window.setTimeout(() => {
      setTimeLeft((prev) => (prev === null ? null : prev - 1));
    }, 1000);

    return () => window.clearTimeout(timer);
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
            topicId: selectedTopic,
          }),
        });

        if (!postResponse.ok) throw new Error("Could not save attempt.");

        const getResponse = await fetch("/api/attempts", {
          method: "GET",
          cache: "no-store",
        });

        if (!getResponse.ok) throw new Error("Could not load attempt history.");

        const payload = await getResponse.json();
        setUserEmail(payload.email);
        setAttempts(payload.attempts);
        setHasSavedCurrentResult(true);
      } catch {
        setSaveError("Failed to save this attempt.");
      } finally {
        setIsSavingAttempt(false);
      }
    };

    void saveAttempt();
  }, [isQuizFinished, totalQuestions, hasSavedCurrentResult, correctAnswers, scorePercent, selectedTopic]);

  const startQuiz = async () => {
    if (!selectedTopic) return;
    
    setIsLoading(true);
    const fetchedQuestions = await getQuizQuestions(selectedTopic, difficultyFilter, TOTAL_QUESTIONS_PER_RUN);
    
    if (fetchedQuestions.length === 0) {
      alert("No questions found for this topic/difficulty combination.");
      setIsLoading(false);
      return;
    }

    setSessionQuestions(fetchedQuestions);
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
    setIsLoading(false);
  };

  const handleSelectAnswer = (answer: string) => {
    if (!currentQuestion || isLocked) return;
    setSelectedAnswer(answer);
    setIsLocked(true);
    if (answer === currentQuestion.correctAnswer) {
      setCorrectAnswers((prev) => prev + 1);
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (!isLocked && !isTimedOut) return;
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
      <main className="min-h-svh p-6 md:p-12 flex flex-col items-center justify-center">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-full max-w-4xl bg-white border-[4px] border-black p-8 md:p-16 shadow-[12px_12px_0px_#1a1a1a]"
        >
          <header className="mb-12 border-b-4 border-black pb-8">
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter italic leading-none text-[#1a1a1a]">Run Setup.</h1>
            <p className="text-xs font-black uppercase tracking-widest opacity-40 mt-4">Configure your study parameters</p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 text-[#1a1a1a]">
            <div className="space-y-8">
              <div className="space-y-4">
                <label className="text-xs font-black uppercase tracking-widest block">Choose Topic</label>
                <div className="relative group">
                  <select 
                    value={selectedTopic || ""}
                    onChange={(e) => setSelectedTopic(e.target.value)}
                    className="w-full appearance-none border-4 border-black p-4 pr-12 font-black text-sm outline-none focus:bg-[#ffde59] transition-colors bg-white"
                  >
                    {metadata.map((skill) => (
                      <optgroup key={skill.id} label={skill.name.toUpperCase()}>
                        {skill.topics.map((topic) => (
                          <option key={topic.id} value={topic.id}>{topic.name}</option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 size-5 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-xs font-black uppercase tracking-widest block">Difficulty Level</label>
                <div className="flex flex-wrap gap-2">
                  {(["all", "easy", "medium", "hard"] as const).map((diff) => (
                    <button
                      key={diff}
                      onClick={() => setDifficultyFilter(diff)}
                      className={cn(
                        "px-6 py-2 border-4 border-black font-black uppercase text-xs transition-all",
                        difficultyFilter === diff 
                          ? "bg-[#ffde59] shadow-[4px_4px_0px_#000] translate-x-[-2px] translate-y-[-2px]" 
                          : "bg-white hover:bg-zinc-50"
                      )}
                    >
                      {diff}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-xs font-black uppercase tracking-widest block">Tempo Control</label>
                <button 
                  onClick={() => setTimerEnabled(!timerEnabled)}
                  className={cn(
                    "w-full flex items-center justify-between p-4 border-4 border-black transition-all",
                    timerEnabled ? "bg-[#4d79ff] text-white shadow-[4px_4px_0px_#000]" : "bg-white text-black opacity-40"
                  )}
                >
                  <span className="font-black">20s Speed Run</span>
                  <div className={cn("size-4 border-2 border-black", timerEnabled ? "bg-white" : "bg-zinc-200")} />
                </button>
              </div>
            </div>

            <div className="bg-[#f4f4f4] border-4 border-black p-8 flex flex-col justify-between">
              <div className="space-y-4">
                <BookOpen className="size-12" />
                <h3 className="text-2xl font-black italic">The Mission</h3>
                <p className="font-bold text-sm leading-relaxed opacity-60">
                  Analyze the material, predict the outputs, and identify logic gaps. Correctness is the only metric.
                </p>
              </div>
              <button 
                onClick={startQuiz}
                disabled={isLoading}
                className="mt-12 bg-[#ff4d4d] text-white py-6 text-2xl font-black border-4 border-black shadow-[6px_6px_0px_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all flex items-center justify-center gap-4 disabled:opacity-50"
              >
                {isLoading ? "WAIT..." : "INITIALIZE"} <ArrowRight className="size-6" />
              </button>
            </div>
          </div>
        </motion.div>
      </main>
    );
  }

  if (isQuizFinished) {
    return (
      <main className="min-h-svh p-6 md:p-12 flex flex-col items-center justify-center">
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

  if (!currentQuestion) return null;

  return (
    <main className="min-h-svh p-4 md:p-8 lg:p-12">
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
        timerDuration={TIMER_DURATION}
      />
    </main>
  );
}
