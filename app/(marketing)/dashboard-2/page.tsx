"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { MockupNav } from "@/components/MockupNav";
import { Book, Star, Flame, Target, UploadCloud } from "lucide-react";

export default function Dashboard2() {
  return (
    <main className="min-h-svh bg-[#fffdf5] text-[#1a1a1a] font-sans selection:bg-[#ffde59] selection:text-black pb-48">
      <div className="mx-auto flex min-h-svh flex-col px-8 py-12 md:px-16 max-w-[1400px]">
        <header className="flex justify-between items-center mb-16">
          <div className="space-y-1">
            <h1 className="text-5xl font-black tracking-tighter italic leading-none">Ready to Grow?</h1>
            <p className="text-xs font-black uppercase tracking-widest opacity-40">Session Status: Online</p>
          </div>
          <button className="bg-[#ff4d4d] border-[4px] border-black text-white px-8 py-4 font-black text-sm uppercase tracking-widest shadow-[6px_6px_0px_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all flex items-center gap-3">
            <UploadCloud className="size-5" />
            New Material
          </button>
        </header>

        <div className="flex-1 space-y-12">
          {/* Quick Stat Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Day Streak", value: "12", icon: Flame, color: "#ff4d4d" },
              { label: "Accuracy", value: "88%", icon: Target, color: "#4d79ff" },
              { label: "Mastered", value: "24", icon: Star, color: "#ffde59" },
              { label: "Materials", value: "08", icon: Book, color: "#1a1a1a" },
            ].map((stat, i) => (
              <div key={i} className="bg-white border-4 border-black p-6 flex items-center justify-between shadow-[4px_4px_0px_#000]">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-1">{stat.label}</p>
                  <p className="text-3xl font-black">{stat.value}</p>
                </div>
                <stat.icon className="size-8" style={{ color: stat.color }} />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Subject Tiles */}
            <div className="lg:col-span-8">
              <h3 className="text-xl font-black uppercase tracking-widest mb-8 flex items-center gap-4">
                <span className="size-4 bg-black rotate-45" />
                Active Subjects
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { name: "French Vocab", mastery: 92, color: "#4d79ff", count: "120 terms" },
                  { name: "Cell Biology", mastery: 65, color: "#ff4d4d", count: "45 notes" },
                  { name: "Intro to Logic", mastery: 40, color: "#ffde59", count: "12 topics" },
                  { name: "World History", mastery: 80, color: "#1a1a1a", count: "8 PDFs" },
                ].map((subject, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_#000] relative overflow-hidden group cursor-pointer"
                  >
                    <div className="relative z-10">
                      <p className="text-xs font-black uppercase tracking-widest opacity-40 mb-2">{subject.count}</p>
                      <h4 className="text-3xl font-black mb-8">{subject.name}</h4>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between items-end">
                          <span className="text-[10px] font-black uppercase tracking-widest">Mastery</span>
                          <span className="text-xl font-black">{subject.mastery}%</span>
                        </div>
                        <div className="h-4 w-full bg-[#eee] border-2 border-black overflow-hidden">
                          <div className="h-full transition-all duration-1000" style={{ width: `${subject.mastery}%`, backgroundColor: subject.color }} />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Gap Breakdown */}
            <div className="lg:col-span-4">
              <h3 className="text-xl font-black uppercase tracking-widest mb-8 flex items-center gap-4">
                <span className="size-4 bg-[#ffde59] rounded-full" />
                Focus Areas
              </h3>
              <div className="bg-white border-4 border-black p-8 space-y-8 shadow-[8px_8px_0px_#000]">
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-[#ff4d4d] mb-4">Needs Attention</p>
                  <div className="space-y-3">
                    {["Subjunctive Tense", "ATP Cycle", "Fallacies"].map((item, i) => (
                      <div key={item} className="flex items-center gap-4 p-3 bg-[#fffdf5] border-2 border-black font-bold text-sm">
                        <span className="size-2 bg-[#ff4d4d]" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="pt-8 border-t-4 border-black border-dashed">
                  <p className="text-xs font-black uppercase tracking-widest text-[#4d79ff] mb-4">Mastered</p>
                  <div className="space-y-3">
                    {["Basic Greetings", "Cell Wall", "Symbolic Math"].map((item, i) => (
                      <div key={item} className="flex items-center gap-4 p-3 opacity-40 font-bold text-sm">
                        <span className="size-2 bg-[#4d79ff] rounded-full" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                <Link href="/quiz-2" className="block w-full bg-black text-white py-4 font-black text-center uppercase tracking-widest hover:bg-[#4d79ff] transition-colors">
                  Start Mastery Run
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MockupNav />
    </main>
  );
}
