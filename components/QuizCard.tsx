"use client";

import { motion, AnimatePresence } from "motion/react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import type { Question } from "@/data/questions";
import { cn } from "@/lib/utils";
import { Timer, ArrowRight, CheckCircle2, XCircle } from "lucide-react";

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
  timerDuration: number;
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
    <motion.div
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="w-full max-w-5xl mx-auto pb-24 md:pb-32"
    >
      {/* Header Info */}
      <header className="flex justify-between items-center border-b-[3px] md:border-b-4 border-black pb-4 md:pb-6 mb-6 md:mb-8">
        <div className="flex items-center gap-3 md:gap-4">
          <div className="px-3 py-1 md:px-4 md:py-1 bg-[#ff4d4d] text-white font-black text-[10px] md:text-xs uppercase tracking-widest border-2 border-black shadow-[3px_3px_0px_#000] md:shadow-[4px_4px_0px_#000]">
            Study_Run
          </div>
          <div className="font-black text-xl md:text-2xl tracking-tighter">
            {questionNumber.toString().padStart(2, '0')} / {totalQuestions.toString().padStart(2, '0')}
          </div>
        </div>
        {timeLeft !== null && (
          <div className={cn(
            "flex items-center gap-2 px-3 py-1 md:px-4 md:py-1 border-2 border-black font-black text-xs md:text-sm tabular-nums",
            timeLeft < 5 ? "bg-[#ff4d4d] text-white animate-pulse" : "bg-white"
          )}>
            <Timer className="size-3.5 md:size-4" />
            {timeLeft}s
          </div>
        )}
      </header>

      {/* Question Box */}
      <div className="bg-[#ffde59] border-[3px] md:border-[4px] border-black p-6 md:p-12 mb-6 md:mb-8 shadow-[6px_6px_0px_#000] md:shadow-[8px_8px_0px_#000]">
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-black leading-tight tracking-tight">
          {question.code}
        </h2>
      </div>
      
      {/* Options Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {question.options.map((option, i) => {
          const isSelected = selectedAnswer === option;
          const isAnswer = option === question.correctAnswer;
          const showSuccess = isLocked && isAnswer;
          const showError = isLocked && isSelected && !isAnswer;
          
          const colors = ["#ff4d4d", "#4d79ff", "#ffde59", "#1a1a1a"];
          const bgColor = showSuccess ? "#22c55e" : showError ? "#ff4d4d" : isSelected ? "#ffde59" : "white";

          return (
            <button 
              key={i} 
              disabled={isLocked}
              onClick={() => onSelectAnswer(option)}
              className={cn(
                "flex items-center gap-4 md:gap-6 p-6 md:p-8 border-[3px] md:border-[4px] border-black font-black text-xl md:text-2xl transition-all text-left group relative overflow-hidden",
                !isLocked && "hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[6px_6px_0px_#1a1a1a] md:hover:shadow-[8px_8px_0px_#1a1a1a]",
                isLocked && !isSelected && !isAnswer && "opacity-40 grayscale-[0.5]"
              )}
              style={{ backgroundColor: bgColor }}
            >
              <span className={cn(
                "size-8 md:size-10 flex items-center justify-center rounded-full border-2 md:border-4 border-black text-xs md:text-sm shrink-0",
                showSuccess ? "bg-white" : showError ? "bg-white" : ""
              )} style={{ backgroundColor: (!showSuccess && !showError) ? colors[i % 4] : undefined, color: (!showSuccess && !showError) ? "white" : "black" }}>
                {String.fromCharCode(65 + i)}
              </span>
              <span className="relative z-10 break-words">{option}</span>
              
              {showSuccess && (
                <div className="absolute inset-0 bg-green-500/10 animate-pulse pointer-events-none" />
              )}
            </button>
          );
        })}
      </div>

      {/* Action / Explanation Area */}
      <div className="mt-8 md:mt-12 flex flex-col md:flex-row gap-6 md:gap-8 items-start">
        <div className="flex-1 w-full">
          <AnimatePresence>
            {(isLocked || isTimedOut) && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border-[3px] md:border-4 border-black p-5 md:p-6 shadow-[4px_4px_0px_#000] md:shadow-[6px_6px_0px_#000]"
              >
                <div className="flex items-center gap-2 mb-2">
                  {isCorrect ? <CheckCircle2 className="size-4 text-green-600" /> : <XCircle className="size-4 text-red-600" />}
                  <p className="text-[9px] md:text-[10px] font-black uppercase tracking-widest opacity-40">
                    {isCorrect ? "Analysis Validated" : "Correction Required"}
                  </p>
                </div>
                <p className="font-bold text-base md:text-lg leading-snug">{question.explanation}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <button 
          onClick={onNext}
          disabled={!isLocked && !isTimedOut}
          className="bg-black text-white px-10 py-5 md:px-16 md:py-6 text-xl md:text-2xl font-black hover:bg-[#4d79ff] transition-colors disabled:opacity-30 disabled:cursor-not-allowed shrink-0 w-full md:w-auto flex items-center justify-center gap-3"
        >
          {questionNumber === totalQuestions ? "FINISH" : "NEXT"} <ArrowRight className="size-5 md:size-6" />
        </button>
      </div>
    </motion.div>
  );
}
