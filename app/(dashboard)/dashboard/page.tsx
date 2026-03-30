import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getAttemptsForUser, getAttemptSummaryForUser } from "@/lib/quiz-attempts";
import { prisma } from "@/lib/prisma";
import { Book, Star, Flame, Target, UploadCloud, Briefcase, Award } from "lucide-react";
import { cn } from "@/lib/utils";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id || !session.user.email) {
    redirect("/signin");
  }

  const [summary, attempts, user, topicMasteries] = await Promise.all([
    getAttemptSummaryForUser(session.user.id),
    getAttemptsForUser(session.user.id),
    prisma.user.findUnique({
      where: { id: session.user.id },
      select: { firstName: true, email: true, hireabilityScore: true, overallRank: true, educationStatus: true },
    }),
    prisma.userTopicMastery.findMany({
      where: { userId: session.user.id },
      include: { topic: true },
      orderBy: { averageScore: "desc" }
    })
  ]);

  const displayName = user?.firstName || user?.email || "Learner";

  return (
    <div className="mx-auto flex flex-col px-4 py-6 md:px-8 md:py-12 max-w-[1600px] w-full">
      <header className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 mb-16 shrink-0">
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter italic border-b-[4px] md:border-b-[6px] border-[#ffde59] leading-none inline-block">
            Hello, {displayName}!
          </h1>
          <div className="flex flex-wrap items-center gap-4 mt-2 md:mt-4">
            <p className="text-[10px] md:text-xs font-black uppercase tracking-widest opacity-40">{user?.educationStatus}</p>
            <div className="flex items-center gap-2 px-3 py-1 md:px-4 md:py-1.5 bg-black text-white rounded-full">
               <Award className="size-3 text-[#ffde59]" />
               <span className="text-[10px] font-black uppercase tracking-widest">Global Rank: #{user?.overallRank ?? "N/A"}</span>
            </div>
          </div>
        </div>
        <Link 
          href="/quiz" 
          className="bg-[#ff4d4d] border-[4px] border-black text-white px-8 py-4 font-black text-sm uppercase tracking-widest shadow-[6px_6px_0px_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all flex items-center justify-center gap-3 w-full md:w-auto"
        >
          <UploadCloud className="size-5" />
          Initialize Session
        </Link>
      </header>

      <div className="flex-1 space-y-10 md:space-y-12">
        {/* Hireability & Ranking Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <div className="bg-[#ffde59] border-4 border-black p-6 flex items-center justify-between shadow-[6px_6px_0px_#000]">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">Hireability Score</p>
              <p className="text-4xl font-black">{user?.hireabilityScore ?? 0}%</p>
            </div>
            <Briefcase className="size-10" />
          </div>
          
          {[
            { label: "Accuracy", value: `${summary.averageScorePercent}%`, icon: Target, color: "#4d79ff" },
            { label: "Total Runs", value: summary.attemptsCount.toString(), icon: Flame, color: "#ff4d4d" },
            { label: "Domain Mastery", value: topicMasteries.length.toString(), icon: Star, color: "#1a1a1a" },
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

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 md:gap-12">
          {/* Subject/Topic Ranking List */}
          <div className="xl:col-span-8">
            <h3 className="text-xl font-black uppercase tracking-widest mb-8 flex items-center gap-4">
              <span className="size-4 bg-black rotate-45" />
              Domain Rankings
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {topicMasteries.length === 0 ? (
                <div className="col-span-full bg-white border-4 border-black p-12 text-center shadow-[8px_8px_0px_#000]">
                  <p className="text-xl font-black italic">No domain rankings calculated.</p>
                  <Link href="/quiz" className="inline-block mt-4 text-[#4d79ff] underline font-bold uppercase tracking-widest">Complete your first session</Link>
                </div>
              ) : (
                topicMasteries.map((mastery, i) => (
                  <div 
                    key={mastery.id}
                    className="bg-white border-4 border-black p-8 shadow-[6px_6px_0px_#000] relative overflow-hidden group transition-transform hover:scale-[1.02]"
                  >
                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-4">
                        <span className="text-[10px] font-black uppercase tracking-widest opacity-40">Topic Ranking</span>
                        <span className="text-2xl font-black text-[#4d79ff]">#{mastery.rank ?? "N/A"}</span>
                      </div>
                      <h4 className="text-3xl font-black mb-6">{mastery.topic.name}</h4>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between items-end">
                          <span className="text-[10px] font-black uppercase tracking-widest">Mastery</span>
                          <span className="text-xl font-black">{Math.round(mastery.averageScore)}%</span>
                        </div>
                        <div className="h-4 w-full bg-[#eee] border-2 border-black overflow-hidden">
                          <div className="h-full bg-black" style={{ width: `${mastery.averageScore}%` }} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Hireability Breakdown */}
          <div className="xl:col-span-4">
            <h3 className="text-xl font-black uppercase tracking-widest mb-8 flex items-center gap-4">
              <span className="size-4 bg-[#ff4d4d] rounded-full" />
              Profile Status
            </h3>
            <div className="bg-white border-4 border-black p-8 space-y-8 shadow-[8px_8px_0px_#000]">
              <div>
                <p className="text-xs font-black uppercase tracking-widest opacity-40 mb-4">Career Indicator</p>
                <div className="space-y-4">
                  <div className="p-4 bg-black text-white border-2 border-black">
                    <p className="text-[10px] font-black uppercase opacity-60">Verdict</p>
                    <p className="text-2xl font-black italic">
                      {user?.hireabilityScore && user.hireabilityScore > 80 ? "Top Talent" : 
                       user?.hireabilityScore && user.hireabilityScore > 50 ? "Solid Candidate" : "Growing Engineer"}
                    </p>
                  </div>
                  <p className="text-xs font-bold leading-tight opacity-60 italic">
                    "Based on your cross-domain performance and consistency in high-difficulty runs."
                  </p>
                </div>
              </div>
              
              <div className="pt-8 border-t-4 border-black border-dashed">
                <p className="text-xs font-black uppercase tracking-widest opacity-40 mb-4">Focus Priorities</p>
                <div className="space-y-3">
                  {["System Design", "Logic Depth"].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 p-3 bg-[#fffdf5] border-2 border-black font-bold text-sm">
                      <span className="size-2 bg-[#ffde59]" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <Link href="/quiz" className="block w-full bg-[#4d79ff] text-white py-4 font-black text-center uppercase tracking-widest hover:bg-black transition-colors mt-8">
                Boost Score →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
