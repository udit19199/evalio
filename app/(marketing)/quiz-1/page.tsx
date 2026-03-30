"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { MockupNav } from "@/components/MockupNav";

export default function Quiz1() {
  return (
    <main className="min-h-svh bg-[#eeeeee] text-[#1a1a1a] font-sans selection:bg-[#1a1a1a] selection:text-white pb-48">
      <div className="mx-auto flex min-h-svh flex-col px-8 py-12 md:px-16 max-w-[1400px] relative">
        <header className="flex justify-between items-center font-bold text-[10px] uppercase tracking-[0.3em] opacity-30">
          <span>Active Session: Biology_101</span>
          <span>Question 04/20</span>
        </header>

        <div className="flex-1 flex flex-col items-center justify-center">
          <motion.div 
            initial={{ scale: 0.98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative bg-white p-12 md:p-16 shadow-2xl border border-zinc-100 w-full max-w-3xl"
          >
            <div className="absolute top-0 right-0 p-8 text-[10px] font-mono opacity-20">00:18s</div>
            <h2 className="text-3xl font-serif font-black mb-12 leading-tight">
              Which organelle is primarily responsible for the production of ATP within a eukaryotic cell?
            </h2>
            
            <div className="grid gap-4">
              {["Mitochondria", "Ribosome", "Golgi Apparatus", "Endoplasmic Reticulum"].map((option, i) => (
                <button key={i} className="flex items-center gap-6 p-6 border-2 border-zinc-50 hover:border-black transition-all text-left group">
                  <span className="text-xs font-bold opacity-20 group-hover:opacity-100">{String.fromCharCode(65 + i)}.</span>
                  <span className="font-medium">{option}</span>
                </button>
              ))}
            </div>

            <div className="mt-12 flex justify-between items-center border-t border-zinc-100 pt-8">
              <button className="text-xs font-bold uppercase tracking-widest opacity-30 hover:opacity-100 transition-opacity">Skip Question</button>
              <button className="bg-[#1a1a1a] text-white px-12 py-4 font-bold">Next Question →</button>
            </div>
          </motion.div>
        </div>
      </div>
      <MockupNav />
    </main>
  );
}
