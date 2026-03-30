"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import QuizCard from "@/components/QuizCard";
import ResultScreen from "@/components/ResultScreen";
import type { Question, Difficulty } from "@/data/questions";
import type { QuizAttempt } from "@/types/quiz-attempt";
import { cn } from "@/lib/utils";
import { ArrowRight, ChevronDown, Layers, CheckSquare, Circle } from "lucide-react";
import { getQuizQuestions, getQuestionStats } from "@/lib/actions/quiz";
import { Slider } from "@/components/ui/slider";

type SelectionMode = "subject" | "single" | "multiple";

type DifficultyFilter = "all" | Difficulty;

interface QuizMetadata {
  id: string;
  name: string;
  topics: { id: string; name: string }[];
}

const TIMER_DURATION = 20;

export default function QuizPage() {
  const [metadata, setMetadata] = useState<QuizMetadata[]>([]);
  const [selectionMode, setSelectionMode] = useState<SelectionMode>("single");
  const [selectedSkillId, setSelectedSkillId] = useState<string | null>(null);
  const [selectedTopicIds, setSelectedTopicIds] = useState<string[]>([]);
  const [difficultyFilter, setDifficultyFilter] = useState<DifficultyFilter>("all");
  const [timerEnabled, setTimerEnabled] = useState(true);
  const [questionCount, setQuestionCount] = useState(20);
  const [availableStats, setAvailableStats] = useState({ total: 0, easy: 0, medium: 0, hard: 0 });
  
  const [sessionQuestions, setSessionQuestions] = useState<Question[]>([]);
  const [started, setStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answersByIndex, setAnswersByIndex] = useState<Record<number, string>>({});
  const [timeLeftByIndex, setTimeLeftByIndex] = useState<Record<number, number>>({});
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [attempts, setAttempts] = useState<QuizAttempt[]>([]);
  const [isSavingAttempt, setIsSavingAttempt] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [hasSavedCurrentResult, setHasSavedCurrentResult] = useState(false);
  const [setupError, setSetupError] = useState<string | null>(null);

  const totalQuestions = sessionQuestions.length;
  const currentQuestion = sessionQuestions[currentIndex];
  const isQuizFinished = started && currentIndex >= totalQuestions && totalQuestions > 0;
  const selectedAnswer = answersByIndex[currentIndex] ?? null;
  const isLocked = selectedAnswer !== null;
  const timeLeft = timerEnabled ? (timeLeftByIndex[currentIndex] ?? TIMER_DURATION) : null;
  const isTimedOut = timerEnabled && timeLeft === 0 && !isLocked;

  const correctAnswers = useMemo(() => {
    return sessionQuestions.reduce((acc, question, index) => {
      return answersByIndex[index] === question.correctAnswer ? acc + 1 : acc;
    }, 0);
  }, [sessionQuestions, answersByIndex]);

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
          setSelectedSkillId(data[0].id);
          setSelectedTopicIds([data[0].topics[0].id]);
        }
      }
    }
    fetchMetadata();
  }, []);

  // Fetch available question stats when topics or difficulty changes
  useEffect(() => {
    async function fetchStats() {
      if (selectedTopicIds.length === 0) return;
      const stats = await getQuestionStats(selectedTopicIds, difficultyFilter);
      setAvailableStats(stats);
      // Reset question count to min(20, available) when stats change
      setQuestionCount(Math.min(20, stats.total));
    }
    fetchStats();
  }, [selectedTopicIds, difficultyFilter]);

  useEffect(() => {
    setSetupError(null);
  }, [selectedTopicIds, difficultyFilter, questionCount]);

  useEffect(() => {
    if (!started || isQuizFinished || !timerEnabled || isLocked || timeLeft === null || timeLeft <= 0) {
      return;
    }

    const timer = window.setTimeout(() => {
      setTimeLeftByIndex((prev) => ({
        ...prev,
        [currentIndex]: Math.max(0, (prev[currentIndex] ?? TIMER_DURATION) - 1),
      }));
    }, 1000);

    return () => window.clearTimeout(timer);
  }, [started, isQuizFinished, timerEnabled, isLocked, timeLeft, currentIndex]);

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
            topicIds: selectedTopicIds,
            skillId: selectionMode === "subject" ? selectedSkillId : undefined,
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
  }, [isQuizFinished, totalQuestions, hasSavedCurrentResult, correctAnswers, scorePercent, selectedTopicIds, selectedSkillId, selectionMode]);

  const startQuiz = async () => {
    setSetupError(null);

    if (selectedTopicIds.length === 0) return;
    
    if (questionCount > availableStats.total) {
      setSetupError(`Only ${availableStats.total} questions are available for this selection.`);
      return;
    }
    
    setIsLoading(true);
    const fetchedQuestions = await getQuizQuestions(selectedTopicIds, difficultyFilter, questionCount);
    
    if (fetchedQuestions.length === 0) {
      setSetupError("No questions found for this topic and difficulty combination.");
      setIsLoading(false);
      return;
    }

    setSessionQuestions(fetchedQuestions);
    setCurrentIndex(0);
    const initialTimeLeftByIndex = fetchedQuestions.reduce<Record<number, number>>((acc, _, index) => {
      acc[index] = TIMER_DURATION;
      return acc;
    }, {});
    setAnswersByIndex({});
    setTimeLeftByIndex(initialTimeLeftByIndex);
    setUserEmail(null);
    setAttempts([]);
    setIsSavingAttempt(false);
    setSaveError(null);
    setHasSavedCurrentResult(false);
    setStarted(true);
    setIsLoading(false);
  };

  const handleSelectAnswer = (answer: string) => {
    if (!currentQuestion || isLocked || isTimedOut) return;
    setAnswersByIndex((prev) => ({ ...prev, [currentIndex]: answer }));
  };

  const handleNext = () => {
    if (!isLocked && !isTimedOut) return;
    setCurrentIndex((prev) => prev + 1);
  };

  const handlePrevious = () => {
    if (currentIndex === 0) return;
    setCurrentIndex((prev) => prev - 1);
  };

  const handleRestart = () => {
    setStarted(false);
    setSessionQuestions([]);
    setCurrentIndex(0);
    setAnswersByIndex({});
    setTimeLeftByIndex({});
    setUserEmail(null);
    setAttempts([]);
    setIsSavingAttempt(false);
    setSaveError(null);
    setHasSavedCurrentResult(false);
  };

  if (!started) {
    return (
      <main className="min-h-svh p-4 md:p-8 flex flex-col items-center justify-center">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-full max-w-4xl bg-white border-[4px] border-black shadow-[12px_12px_0px_#1a1a1a]"
        >
          {/* Header & Mission Banner */}
          <div className="border-b-4 border-black">
            <div className="bg-[#f4f4f4] p-6 md:p-10">
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter italic leading-none text-[#1a1a1a]">The Mission.</h1>
              <p className="font-bold text-sm md:text-base leading-relaxed opacity-60 mt-4 max-w-2xl">
                Analyze the material, predict the outputs, and identify logic gaps. Correctness is the only metric.
              </p>
            </div>
          </div>

          {/* Configuration Options */}
          <div className="p-6 md:p-10 space-y-8 text-[#1a1a1a]">
            {/* Selection Mode Toggle */}
            <div className="space-y-3">
              <p className="text-xs font-black uppercase tracking-widest">Selection Mode</p>
              <div className="flex gap-2 border-4 border-black p-2">
                {(["subject", "single", "multiple"] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => {
                      setSelectionMode(mode);
                      const skill = metadata.find(s => s.id === selectedSkillId);
                      if (skill) {
                        if (mode === "subject") {
                          setSelectedTopicIds(skill.topics.map(t => t.id));
                        } else if (mode === "single") {
                          setSelectedTopicIds([skill.topics[0]?.id].filter(Boolean));
                        } else {
                          // Keep current selection for multiple
                          if (selectedTopicIds.length === 0) {
                            setSelectedTopicIds([skill.topics[0]?.id].filter(Boolean));
                          }
                        }
                      }
                    }}
                    className={cn(
                      "flex-1 flex items-center justify-center gap-2 py-2 font-black uppercase text-xs border-2 border-black transition-all",
                      selectionMode === mode
                        ? "bg-[#ffde59] shadow-[2px_2px_0px_#000]"
                        : "bg-white hover:bg-zinc-50"
                    )}
                  >
                    {mode === "subject" && <Layers className="size-3" />}
                    {mode === "single" && <Circle className="size-3" />}
                    {mode === "multiple" && <CheckSquare className="size-3" />}
                    {mode === "subject" ? "Entire Subject" : mode === "single" ? "Single Topic" : "Multiple Topics"}
                  </button>
                ))}
              </div>
            </div>

            {/* Subject & Topic Selection Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Subject Selection */}
              <div className="space-y-3">
                <label htmlFor="quiz-subject" className="text-xs font-black uppercase tracking-widest block">Subject</label>
                <div className="relative group">
                  <select 
                    id="quiz-subject"
                    value={selectedSkillId || ""}
                    onChange={(e) => {
                      const skillId = e.target.value;
                      setSelectedSkillId(skillId);
                      const skill = metadata.find(s => s.id === skillId);
                      if (skill) {
                        if (selectionMode === "subject") {
                          setSelectedTopicIds(skill.topics.map(t => t.id));
                        } else if (selectionMode === "single") {
                          setSelectedTopicIds([skill.topics[0]?.id].filter(Boolean));
                        } else {
                          // For multiple, start with first topic selected
                          setSelectedTopicIds([skill.topics[0]?.id].filter(Boolean));
                        }
                      }
                    }}
                    className="w-full appearance-none border-4 border-black p-3 pr-10 font-black text-sm outline-none focus:bg-[#ffde59] transition-colors bg-white"
                  >
                    {metadata.map((skill) => (
                      <option key={skill.id} value={skill.id}>{skill.name}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 size-5 pointer-events-none" />
                </div>
              </div>

              {/* Topic Selection - Single Mode */}
              {selectionMode === "single" && (
                <div className="space-y-3">
                  <label htmlFor="quiz-topic" className="text-xs font-black uppercase tracking-widest block">
                    Topic
                  </label>
                  <div className="relative group">
                    <select 
                      id="quiz-topic"
                      value={selectedTopicIds[0] || ""}
                      onChange={(e) => setSelectedTopicIds([e.target.value])}
                      className="w-full appearance-none border-4 border-black p-3 pr-10 font-black text-sm outline-none focus:bg-[#ffde59] transition-colors bg-white"
                    >
                      {metadata
                        .find(s => s.id === selectedSkillId)
                        ?.topics.map((topic) => (
                          <option key={topic.id} value={topic.id}>{topic.name}</option>
                        ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 size-5 pointer-events-none" />
                  </div>
                </div>
              )}

              {/* Difficulty Selection */}
              <div className="space-y-3">
                <label className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
                  <span>Difficulty Level</span>
                  <span className="text-[10px] bg-black text-white px-1.5 py-0.5">
                    {availableStats.total} Qs
                  </span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {(["all", "easy", "medium", "hard"] as const).map((diff) => (
                    <button
                      key={diff}
                      onClick={() => setDifficultyFilter(diff)}
                      className={cn(
                        "px-4 py-2 border-4 border-black font-black uppercase text-xs transition-all",
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
            </div>

            {/* Multiple Topics Selection */}
            {selectionMode === "multiple" && (
              <div className="space-y-3">
                <label className="text-xs font-black uppercase tracking-widest block flex items-center justify-between">
                  <span>Select Topics ({selectedTopicIds.length} selected)</span>
                  <button
                    onClick={() => {
                      const skill = metadata.find(s => s.id === selectedSkillId);
                      if (skill) {
                        const allIds = skill.topics.map(t => t.id);
                        if (selectedTopicIds.length === allIds.length) {
                          setSelectedTopicIds([]);
                        } else {
                          setSelectedTopicIds(allIds);
                        }
                      }
                    }}
                    className="text-[10px] bg-black text-white px-2 py-1 font-bold hover:bg-[#ff4d4d] transition-colors"
                  >
                    {selectedTopicIds.length === metadata.find(s => s.id === selectedSkillId)?.topics.length ? "Deselect All" : "Select All"}
                  </button>
                </label>
                <div className="border-4 border-black p-4 max-h-40 overflow-y-auto space-y-2 bg-white">
                  {metadata
                    .find(s => s.id === selectedSkillId)
                    ?.topics.map((topic) => (
                      <label 
                        key={topic.id} 
                        className={cn(
                          "flex items-center gap-3 p-2 cursor-pointer border-2 transition-all",
                          selectedTopicIds.includes(topic.id)
                            ? "bg-[#ffde59] border-black"
                            : "bg-white border-transparent hover:bg-zinc-100"
                        )}
                      >
                        <input
                          type="checkbox"
                          checked={selectedTopicIds.includes(topic.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedTopicIds([...selectedTopicIds, topic.id]);
                            } else {
                              setSelectedTopicIds(selectedTopicIds.filter(id => id !== topic.id));
                            }
                          }}
                          className="size-5 border-2 border-black accent-[#ffde59]"
                        />
                        <span className="font-bold text-sm">{topic.name}</span>
                      </label>
                    ))}
                </div>
              </div>
            )}

            {setupError && (
              <div aria-live="polite" className="border-4 border-black bg-[#ff4d4d] p-3 text-sm font-black text-white">
                {setupError}
              </div>
            )}

            {/* Quiz Length & Tempo Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <p id="quiz-length-label" className="text-xs font-black uppercase tracking-widest">
                  Quiz Length: {questionCount} Questions
                </p>
                <div className="bg-white border-4 border-black p-4">
                  <Slider
                    aria-labelledby="quiz-length-label"
                    value={[questionCount]}
                    min={1}
                    max={Math.max(1, availableStats.total)}
                    onValueChange={(value) => {
                      const val = Array.isArray(value) ? value[0] : value;
                      setQuestionCount(Math.min(val, availableStats.total));
                    }}
                    disabled={availableStats.total === 0}
                    className="w-full py-2"
                  />
                  <div className="flex justify-between mt-3 text-[10px] font-bold uppercase tracking-wider">
                    <span>1</span>
                    <span>{Math.ceil(Math.max(1, availableStats.total) / 2)}</span>
                    <span>{Math.max(1, availableStats.total)}</span>
                  </div>
                  {questionCount > availableStats.total && (
                    <p className="text-[#ff4d4d] text-xs font-bold mt-2">
                      Only {availableStats.total} questions available!
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-black uppercase tracking-widest block">Tempo Control</label>
                <button 
                  onClick={() => setTimerEnabled(!timerEnabled)}
                  aria-pressed={timerEnabled}
                  className={cn(
                    "w-full flex items-center justify-between p-3 border-4 border-black transition-all",
                    timerEnabled ? "bg-[#4d79ff] text-white shadow-[4px_4px_0px_#000]" : "bg-white text-black opacity-40"
                  )}
                >
                  <span className="font-black text-sm">20s Speed Run</span>
                  <div className={cn("size-4 border-2 border-black", timerEnabled ? "bg-white" : "bg-zinc-200")} />
                </button>
              </div>
            </div>

            {/* Start Button */}
            <button 
              onClick={startQuiz}
              disabled={isLoading || availableStats.total === 0 || questionCount > availableStats.total}
              className="w-full bg-[#ff4d4d] text-white py-4 text-xl md:text-2xl font-black border-4 border-black shadow-[6px_6px_0px_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all flex items-center justify-center gap-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "WAIT..." : availableStats.total === 0 ? "NO QUESTIONS" : "INITIALIZE"} <ArrowRight className="size-6" />
            </button>
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
        onPrevious={handlePrevious}
        canGoPrevious={currentIndex > 0}
        onNext={handleNext}
        timeLeft={timerEnabled ? timeLeft : null}
        timerDuration={TIMER_DURATION}
      />
    </main>
  );
}
