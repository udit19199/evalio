"use client";

import { MockupNav } from "@/components/MockupNav";
import { FileText, AlertCircle, CheckCircle2, Clock, Plus } from "lucide-react";

export default function Dashboard1() {
  return (
    <main className="min-h-svh bg-[#eeeeee] text-[#1a1a1a] font-sans selection:bg-[#1a1a1a] selection:text-white pb-48">
      <div className="mx-auto flex min-h-svh flex-col px-8 py-12 md:px-16 max-w-[1400px] relative">
        <header className="flex justify-between items-end border-b-2 border-black pb-8">
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-30 mb-2 block">Student_Reference_ID: 884-01</span>
            <h1 className="text-4xl font-serif font-black tracking-tight">Academic Ledger.</h1>
          </div>
          <button className="bg-[#1a1a1a] text-white px-8 py-4 font-bold text-sm flex items-center gap-3 hover:translate-y-[-2px] transition-all">
            <Plus className="size-4" />
            Upload New Material
          </button>
        </header>

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-12 py-12">
          {/* Main Content: The Ledger */}
          <div className="lg:col-span-8 space-y-12">
            <section>
              <div className="flex items-center justify-between mb-6 border-b border-zinc-300 pb-2">
                <h3 className="text-sm font-black uppercase tracking-widest">Mastery Inventory</h3>
                <span className="text-[10px] font-bold opacity-30">Sorted by: Recent Activity</span>
              </div>
              
              <div className="bg-white shadow-2xl border border-zinc-100 overflow-hidden text-black">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-zinc-50 border-b border-zinc-100 text-[10px] font-black uppercase tracking-widest opacity-40">
                      <th className="px-8 py-4 text-black">Material Name</th>
                      <th className="px-8 py-4 text-black">Mastery</th>
                      <th className="px-8 py-4 text-black">Last Score</th>
                      <th className="px-8 py-4 text-right text-black">Review Due</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {[
                      { name: "Cellular Biology (Finals Notes)", mastery: 82, last: "18/20", due: "Tomorrow" },
                      { name: "French Irregular Verbs", mastery: 95, last: "25/25", due: "In 4 Days" },
                      { name: "Organic Chemistry Ch. 4", mastery: 42, last: "8/20", due: "Immediate" },
                      { name: "Microeconomics - Markets", mastery: 68, last: "14/20", due: "In 2 Days" },
                    ].map((row, i) => (
                      <tr key={i} className="border-b border-zinc-50 hover:bg-zinc-50/50 transition-colors group">
                        <td className="px-8 py-6 flex items-center gap-4">
                          <FileText className="size-4 opacity-20 group-hover:text-primary group-hover:opacity-100 transition-all" />
                          <span className="font-bold">{row.name}</span>
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-3">
                            <div className="h-1.5 w-24 bg-zinc-100 rounded-full overflow-hidden">
                              <div className="h-full bg-black transition-all" style={{ width: `${row.mastery}%` }} />
                            </div>
                            <span className="font-mono text-[10px] font-bold">{row.mastery}%</span>
                          </div>
                        </td>
                        <td className="px-8 py-6 font-mono font-bold">{row.last}</td>
                        <td className="px-8 py-6 text-right">
                          <span className={`text-[10px] font-black uppercase px-2 py-1 ${row.due === "Immediate" ? "bg-red-100 text-red-600" : "bg-zinc-100 opacity-40"}`}>
                            {row.due}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8">
              <div>
                <h3 className="text-sm font-black uppercase tracking-widest mb-6 border-b border-zinc-300 pb-2 flex items-center gap-2">
                  <AlertCircle className="size-4 text-red-500" />
                  Knowledge Gaps
                </h3>
                <div className="flex flex-wrap gap-2">
                  {["ATP Cycle", "Mitochondrial DNA", "Verb Conjugation (Subjunctive)", "Supply/Demand Curves", "Macro Patterns"].map((gap, i) => (
                    <span key={i} className="px-4 py-2 bg-white border border-zinc-200 text-xs font-bold rounded-lg shadow-sm hover:border-black transition-all cursor-default">
                      {gap}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-black uppercase tracking-widest mb-6 border-b border-zinc-300 pb-2 flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-green-500" />
                  Mastered Concepts
                </h3>
                <div className="flex flex-wrap gap-2">
                  {["Cell Wall", "Ribosomes", "Basic Greeting", "Market Equilibrium"].map((concept, i) => (
                    <span key={i} className="px-4 py-2 bg-zinc-100 text-zinc-400 text-xs font-bold rounded-lg cursor-default">
                      {concept}
                    </span>
                  ))}
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar: Analytics & Quick Actions */}
          <div className="lg:col-span-4 space-y-12">
            <div className="bg-white p-10 border border-zinc-100 shadow-xl">
              <h3 className="text-[10px] font-black uppercase tracking-widest opacity-30 mb-8 text-black">Performance Metrics</h3>
              <div className="space-y-10">
                <div>
                  <p className="text-4xl font-serif font-black leading-none text-black">88.4%</p>
                  <p className="text-[10px] font-bold uppercase opacity-40 mt-2 tracking-tighter text-black">Avg. Accuracy (Global)</p>
                </div>
                <div>
                  <p className="text-4xl font-serif font-black leading-none text-black">14.2h</p>
                  <p className="text-[10px] font-bold uppercase opacity-40 mt-2 tracking-tighter text-black">Study Time (This Week)</p>
                </div>
                <div className="pt-6 border-t border-zinc-100">
                  <span className="text-[10px] font-black uppercase tracking-widest block mb-4 text-black">Retention Status</span>
                  <div className="flex gap-1 h-8 items-end">
                    {[40, 70, 45, 90, 65, 80, 100].map((h, i) => (
                      <div key={i} className="flex-1 bg-zinc-100 relative group">
                        <div className="absolute bottom-0 inset-x-0 bg-black transition-all group-hover:bg-primary" style={{ height: `${h}%` }} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-[10px] font-black uppercase tracking-widest opacity-30 px-2 text-black">Next Priority</h3>
              <div className="bg-black text-white p-8 group cursor-pointer hover:bg-zinc-800 transition-all">
                <div className="flex justify-between items-start mb-4">
                  <Clock className="size-5 opacity-40" />
                  <span className="text-[10px] font-bold opacity-40">Due Now</span>
                </div>
                <p className="text-xl font-serif font-bold italic mb-2">Organic Chemistry</p>
                <p className="text-xs opacity-60 leading-relaxed mb-6">Review Chapter 4 errors. Last score (8/20) indicates high logical deviation.</p>
                <button className="text-[10px] font-black uppercase tracking-[0.2em] group-hover:translate-x-2 transition-transform">Initialize Review →</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MockupNav />
    </main>
  );
}
