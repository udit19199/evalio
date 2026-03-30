"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { MockupNav } from "@/components/MockupNav";

export default function Signup2() {
  return (
    <main className="min-h-svh bg-[#fffdf5] text-[#1a1a1a] font-sans selection:bg-[#ffde59] selection:text-black pb-48">
      <div className="mx-auto flex min-h-svh flex-col px-8 py-12 md:px-16 max-w-[1400px]">
        <header className="flex justify-between items-center">
          <div className="flex gap-2">
            <div className="size-4 bg-[#ff4d4d]" />
            <div className="size-4 bg-[#4d79ff]" />
            <div className="size-4 rounded-full bg-[#ffde59]" />
          </div>
          <Link href="/hero-page-2" className="text-xs font-black uppercase tracking-widest border-2 border-black px-4 py-1.5 hover:bg-black hover:text-white transition-all">Back</Link>
        </header>

        <div className="flex-1 flex flex-col items-center justify-center">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white border-[4px] border-black p-12 shadow-[12px_12px_0px_#1a1a1a] w-full max-w-lg"
          >
            <h1 className="text-5xl font-black mb-8 italic">Join the Fun.</h1>
            <form className="space-y-8">
              <div className="space-y-2">
                <label htmlFor="signup-2-email" className="text-xs font-black uppercase tracking-widest">Email</label>
                <input id="signup-2-email" name="email" autoComplete="email" type="email" className="w-full border-4 border-black p-4 outline-none focus:bg-[#ffde59] transition-colors font-bold" />
              </div>
              <div className="space-y-2">
                <label htmlFor="signup-2-password" className="text-xs font-black uppercase tracking-widest">Secret Word</label>
                <input id="signup-2-password" name="password" autoComplete="new-password" type="password" className="w-full border-4 border-black p-4 outline-none focus:bg-[#ffde59] transition-colors font-bold" />
              </div>
              <button type="submit" className="w-full bg-[#4d79ff] text-white py-6 font-black text-2xl border-4 border-black shadow-[6px_6px_0px_#1a1a1a] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[10px_10px_0px_#1a1a1a] active:translate-x-0 active:translate-y-0 active:shadow-none transition-all">
                Let&apos;s Go!
              </button>
            </form>
          </motion.div>
        </div>
      </div>
      <MockupNav />
    </main>
  );
}
