"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { MockupNav } from "@/components/MockupNav";

export default function Hero1() {
  return (
    <main className="min-h-svh bg-[#eeeeee] text-[#1a1a1a] font-sans selection:bg-[#1a1a1a] selection:text-white pb-48">
      <div className="mx-auto flex min-h-svh flex-col px-8 py-12 md:px-16 max-w-[1400px] relative">
        
        <header className="flex justify-between items-center font-bold text-[10px] uppercase tracking-[0.3em] opacity-30">
          <span>Evalio Study Desk</span>
          <Link href="/signin-1">Return to Work</Link>
        </header>

        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="relative w-full max-w-2xl">
            {/* Stacked "Paper" Elements */}
            <div className="absolute inset-0 bg-white shadow-xl rotate-3 translate-x-4 translate-y-4" />
            <div className="absolute inset-0 bg-white shadow-lg -rotate-2 -translate-x-2" />
            
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="relative bg-white p-12 md:p-20 shadow-2xl border border-zinc-100"
            >
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary mb-8 block">Project: Mastery</span>
              
              <h1 className="text-5xl md:text-7xl font-serif font-black leading-tight tracking-tight mb-8">
                Your notes,<br />reimagined.
              </h1>
              
              <p className="text-zinc-500 text-lg leading-relaxed mb-12 max-w-md">
                We turn your handwritten notes, printed PDFs, or book chapters into a digital practice partner. 
                Focus on what matters—understanding.
              </p>

              <div className="flex items-center gap-8">
                <Link href="/signup-1" className="bg-[#1a1a1a] text-white px-10 py-5 text-lg font-bold hover:translate-y-[-2px] transition-all active:translate-y-0">
                  Start New Session
                </Link>
                <div className="h-px w-12 bg-zinc-200" />
                <span className="text-[10px] font-bold uppercase tracking-widest opacity-30">Paperless Study</span>
              </div>
            </motion.div>
          </div>
        </div>

        <footer className="mt-auto flex justify-between items-end opacity-20 text-[9px] font-bold uppercase tracking-widest">
          <div className="space-y-1">
            <p>Texture: Cotton / 80lb</p>
            <p>Ink: Obsidian Black</p>
          </div>
          <p>© 2026 Evalio Studio</p>
        </footer>
      </div>
      <MockupNav />
    </main>
  );
}
