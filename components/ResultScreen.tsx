"use client";

import { motion } from "motion/react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import type { QuizAttempt } from "@/types/quiz-attempt";
import { Trophy, History, RefreshCcw, User, CheckCircle2, BarChart3, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

type ResultScreenProps = {
  correctAnswers: number;
  totalQuestions: number;
  onRestart: () => void;
  username: string | null;
  attempts: QuizAttempt[];
  isSaving: boolean;
  saveError: string | null;
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
  const percentage = Number(((correctAnswers / totalQuestions) * 100).toFixed(1));

  return (
    <div className="mx-auto w-full max-w-5xl space-y-10 md:space-y-12 pb-24">
      <header className="text-center space-y-4">
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          className="mx-auto flex h-20 w-20 md:h-24 md:w-24 items-center justify-center bg-[#ffde59] border-[3px] md:border-4 border-black shadow-[6px_6px_0px_#000] md:shadow-[8px_8px_0px_#000] mb-6 md:mb-8"
        >
          <Trophy className="size-10 md:size-12" />
        </motion.div>
        <h2 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter italic uppercase leading-none">Run Complete.</h2>
        <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] opacity-40">System Evaluation Summary</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {[
          { label: "Accuracy", value: `${percentage}%`, icon: BarChart3, color: "#4d79ff" },
          { label: "Correct", value: correctAnswers, icon: CheckCircle2, color: "#ff4d4d" },
          { label: "Analyzed", value: totalQuestions, icon: History, color: "#1a1a1a" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 + i * 0.1 }}
            className="bg-white border-[3px] md:border-4 border-black p-6 md:p-8 shadow-[6px_6px_0px_#000] md:shadow-[8px_8px_0px_#000] flex flex-col justify-between"
          >
            <div className="flex justify-between items-start mb-6 md:mb-8">
              <stat.icon className="size-6 md:size-8" style={{ color: stat.color }} />
              <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest opacity-40">{stat.label}</span>
            </div>
            <h4 className="text-4xl md:text-5xl font-black tracking-tighter">{stat.value}</h4>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
        <div className="lg:col-span-5 space-y-6 md:space-y-8">
          <div className="bg-white border-[3px] md:border-4 border-black p-6 md:p-8 shadow-[6px_6px_0px_#000] md:shadow-[8px_8px_0px_#000]">
            <p className="text-[9px] md:text-[10px] font-black uppercase tracking-widest opacity-40 mb-3 md:mb-4">Entity Identity</p>
            <p className="text-2xl md:text-3xl font-black italic mb-4 md:mb-6 truncate">{username ?? "Learner_Alpha"}</p>
            
            {isSaving ? (
              <div className="flex items-center gap-3 text-[10px] md:text-xs font-black text-[#4d79ff] animate-pulse uppercase tracking-widest">
                <RefreshCcw className="size-3.5 md:size-4 animate-spin" />
                Archiving Results...
              </div>
            ) : saveError ? (
              <div className="bg-[#ff4d4d] text-white p-3 md:p-4 border-[2px] md:border-4 border-black font-black text-[10px] md:text-xs uppercase text-center">Persistence Error</div>
            ) : (
              <div className="flex items-center gap-3 text-[10px] md:text-xs font-black text-green-600 uppercase tracking-widest">
                <CheckCircle2 className="size-3.5 md:size-4" />
                Log Persistent
              </div>
            )}
          </div>

          <button 
            onClick={onRestart} 
            className="w-full bg-[#ff4d4d] text-white py-6 md:py-8 text-2xl md:text-3xl font-black border-[3px] md:border-4 border-black shadow-[8px_8px_0px_#000] md:shadow-[10px_10px_0px_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all flex items-center justify-center gap-4"
          >
            RESTART <ArrowRight className="size-6 md:size-8" />
          </button>
        </div>

        <div className="lg:col-span-7">
          <div className="bg-white border-[3px] md:border-4 border-black p-6 md:p-8 shadow-[6px_6px_0px_#000] md:shadow-[8px_8px_0px_#000] h-full">
            <h3 className="text-lg md:text-xl font-black uppercase tracking-widest mb-6 md:mb-8 border-b-[3px] md:border-b-4 border-black pb-3 md:pb-4">Recent Log History</h3>
            <div className="space-y-3 md:space-y-4">
              {attempts.length === 0 ? (
                <p className="italic opacity-40 text-sm">No prior logs found.</p>
              ) : (
                attempts.slice(0, 5).map((attempt, i) => (
                  <div key={attempt.id} className="flex items-center justify-between p-3 md:p-4 border-2 border-black bg-[#fafafa]">
                    <div className="space-y-0.5 md:space-y-1">
                      <span className="font-black text-lg md:text-xl">{attempt.scorePercent}%</span>
                      <p className="text-[8px] md:text-[9px] font-bold uppercase opacity-40">{new Date(attempt.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="flex items-center gap-3 md:gap-4">
                      <span className="text-[9px] md:text-[10px] font-black opacity-40">{attempt.correctAnswers}/{attempt.totalQuestions}</span>
                      <div className={cn(
                        "size-2.5 md:size-3 rotate-45 border-2 border-black",
                        attempt.scorePercent >= 70 ? "bg-[#22c55e]" : attempt.scorePercent >= 40 ? "bg-[#ffde59]" : "bg-[#ff4d4d]"
                      )} />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
