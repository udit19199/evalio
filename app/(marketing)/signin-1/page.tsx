"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { MockupNav } from "@/components/MockupNav";

export default function Signin1() {
  return (
    <main className="min-h-svh bg-[#eeeeee] text-[#1a1a1a] font-sans selection:bg-[#1a1a1a] selection:text-white pb-48">
      <div className="mx-auto flex min-h-svh flex-col px-8 py-12 md:px-16 max-w-[1400px] relative">
        <header className="flex justify-between items-center font-bold text-[10px] uppercase tracking-[0.3em] opacity-30">
          <span>Evalio / Authentication</span>
          <Link href="/hero-page-1">Back to Desk</Link>
        </header>

        <div className="flex-1 flex flex-col items-center justify-center">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="relative bg-white p-12 md:p-16 shadow-2xl border border-zinc-100 w-full max-w-lg"
          >
            <h1 className="text-4xl font-serif font-black mb-8">Access Studio.</h1>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest opacity-40">Email Address</label>
                <input type="email" className="w-full border-b-2 border-zinc-100 py-3 outline-none focus:border-black transition-colors bg-transparent" placeholder="you@example.com" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest opacity-40">Password</label>
                <input type="password" className="w-full border-b-2 border-zinc-100 py-3 outline-none focus:border-black transition-colors bg-transparent" placeholder="••••••••" />
              </div>
              <button className="w-full bg-[#1a1a1a] text-white py-5 font-bold text-lg mt-8 hover:translate-y-[-2px] transition-all">
                Login
              </button>
              <p className="text-center text-xs text-zinc-400 mt-6">
                New to the studio? <Link href="/signup-1" className="text-black font-bold underline">Create Account</Link>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
      <MockupNav />
    </main>
  );
}
