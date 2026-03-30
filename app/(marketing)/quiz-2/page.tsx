"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { MockupNav } from "@/components/MockupNav";

export default function Quiz2() {
  return (
    <main className="min-h-svh bg-[#fffdf5] text-[#1a1a1a] font-sans selection:bg-[#ffde59] selection:text-black pb-48">
      <div className="mx-auto flex min-h-svh flex-col px-8 py-12 md:px-16 max-w-[1400px]">
        <header className="flex justify-between items-center border-b-4 border-black pb-6">
          <div className="px-4 py-1 bg-[#ff4d4d] text-white font-black text-xs uppercase tracking-widest">Biology_Run</div>
          <div className="font-black text-2xl tracking-tighter">04 / 20</div>
        </header>

        <div className="flex-1 flex flex-col items-center justify-center">
          <motion.div 
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="w-full max-w-4xl"
          >
            <div className="bg-[#ffde59] border-4 border-black p-8 md:p-12 mb-8">
              <h2 className="text-3xl md:text-5xl font-black leading-tight tracking-tight">
                Which organelle is primarily responsible for the production of ATP within a eukaryotic cell?
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {["Mitochondria", "Ribosome", "Golgi Apparatus", "Endoplasmic Reticulum"].map((option, i) => {
                const colors = ["#ff4d4d", "#4d79ff", "#ffde59", "#1a1a1a"];
                const textColors = ["white", "white", "black", "white"];
                return (
                  <button 
                    key={i} 
                    className="flex items-center gap-6 p-8 border-4 border-black font-black text-2xl hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_#1a1a1a] transition-all text-left"
                    style={{ backgroundColor: "white" }}
                  >
                    <span className="size-10 flex items-center justify-center rounded-full border-4 border-black text-sm" style={{ backgroundColor: colors[i % 4], color: textColors[i % 4] }}>
                      {String.fromCharCode(65 + i)}
                    </span>
                    {option}
                  </button>
                );
              })}
            </div>

            <div className="mt-12 flex justify-end">
              <button className="bg-black text-white px-16 py-6 text-2xl font-black hover:bg-[#4d79ff] transition-colors">
                NEXT →
              </button>
            </div>
          </motion.div>
        </div>
      </div>
      <MockupNav />
    </main>
  );
}
