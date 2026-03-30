"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { MockupNav } from "@/components/MockupNav";

export default function Hero2() {
  return (
    <main className="min-h-svh bg-[#fffdf5] text-[#1a1a1a] font-sans selection:bg-[#ffde59] selection:text-black pb-48">
      <div className="mx-auto flex min-h-svh flex-col px-8 py-12 md:px-16 max-w-[1400px]">
        <header className="flex justify-between items-center">
          <div className="flex gap-2">
            <div className="size-4 bg-[#ff4d4d]" />
            <div className="size-4 bg-[#4d79ff]" />
            <div className="size-4 rounded-full bg-[#ffde59]" />
          </div>
          <Link href="/signin-2" className="text-xs font-black uppercase tracking-widest border-2 border-black px-4 py-1.5 hover:bg-black hover:text-white transition-all">Log In</Link>
        </header>

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-12">
            <motion.h1 
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="text-7xl md:text-[10rem] font-black leading-[0.8] tracking-tighter"
            >
              Learn<br />is Play.
            </motion.h1>
            
            <p className="max-w-md text-xl md:text-2xl font-bold leading-tight">
              A vibrant new way to study. Turn any topic into a fun, interactive quiz in seconds.
            </p>

            <Link href="/signup-2" className="inline-block bg-[#4d79ff] text-white px-12 py-6 text-2xl font-black rounded-none shadow-[8px_8px_0px_#1a1a1a] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[10px_10px_0px_#1a1a1a] active:translate-x-0 active:translate-y-0 active:shadow-none transition-all">
              LET'S START!
            </Link>
          </div>

          <div className="hidden lg:flex justify-center relative">
             <motion.div 
               animate={{ rotate: 360 }}
               transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
               className="relative size-[500px]"
             >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 size-32 bg-[#ff4d4d]" />
                <div className="absolute bottom-0 right-0 size-48 bg-[#4d79ff] rounded-full" />
                <div className="absolute bottom-12 left-0 size-40 border-[12px] border-[#ffde59] rotate-45" />
             </motion.div>
          </div>
        </div>

        <footer className="mt-auto flex justify-between items-center text-xs font-black uppercase tracking-widest">
          <p>Evalio / Joy of Learning</p>
          <div className="h-1 flex-1 mx-12 bg-black/5" />
          <p>EST. 2026</p>
        </footer>
      </div>
      <MockupNav />
    </main>
  );
}
