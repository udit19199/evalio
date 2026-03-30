"use client";

import Link from "next/link";
import { motion } from "motion/react";

export default function Home() {
  return (
    <main className="min-h-svh flex flex-col px-6 py-8 md:px-12 md:py-16 max-w-[1400px] mx-auto">
      <header className="flex justify-between items-center mb-12 md:mb-20">
        <div className="flex gap-2">
          <div className="size-3 md:size-4 bg-[#ff4d4d]" />
          <div className="size-3 md:size-4 bg-[#4d79ff]" />
          <div className="size-3 md:size-4 rounded-full bg-[#ffde59]" />
        </div>
        <Link href="/signin" className="text-[10px] md:text-xs font-black uppercase tracking-widest border-2 border-black px-3 py-1.5 md:px-4 md:py-1.5 hover:bg-black hover:text-white transition-all">Log In</Link>
      </header>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8 md:space-y-12">
          <motion.h1 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="text-5xl sm:text-6xl md:text-[7rem] lg:text-[8rem] font-black leading-[0.85] tracking-tighter"
          >
            Learning<br />ain't boring.
          </motion.h1>
          
          <p className="max-w-md text-lg md:text-xl lg:text-2xl font-bold leading-tight">
            Turn any topic into a fun, interactive quiz in seconds.
          </p>

          <Link href="/signup" className="inline-block w-full sm:w-auto bg-[#4d79ff] text-white px-8 py-5 md:px-12 md:py-6 text-xl md:text-2xl font-black rounded-none shadow-[6px_6px_0px_#1a1a1a] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[10px_10px_0px_#1a1a1a] active:translate-x-0 active:translate-y-0 active:shadow-none transition-all text-center">
            LET'S START!
          </Link>
        </div>

        <div className="hidden lg:flex justify-center relative">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="relative size-[400px] xl:size-[500px]"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 size-24 xl:size-32 bg-[#ff4d4d]" />
              <div className="absolute bottom-0 right-0 size-32 xl:size-48 bg-[#4d79ff] rounded-full" />
              <div className="absolute bottom-12 left-0 size-28 xl:size-40 border-[8px] xl:border-[12px] border-[#ffde59] rotate-45" />
            </motion.div>
        </div>
      </div>

      <footer className="mt-12 md:mt-20 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] md:text-xs font-black uppercase tracking-widest border-t-2 border-black/5 pt-8">
        <p>Evalio</p>
        <div className="hidden sm:block h-1 flex-1 mx-8 md:mx-12 bg-black/5" />
        <p>EST. 2026</p>
      </footer>
    </main>
  );
}
