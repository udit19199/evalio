"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const ROUTES = ["hero-page", "quiz", "dashboard", "signup", "signin"];
const VERSIONS = ["1", "2"];

export function MockupNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed left-1/2 z-50 flex -translate-x-1/2 flex-col items-center gap-4"
      style={{ bottom: "max(2rem, env(safe-area-inset-bottom))" }}
    >
      <div className="flex items-center gap-1 rounded-full border border-white/10 bg-black/80 p-1 backdrop-blur-md shadow-2xl">
        {VERSIONS.map((v) => (
          <Link
            key={v}
            href={`/hero-page-${v}`}
            className={cn(
              "flex size-10 items-center justify-center rounded-full text-xs font-bold transition-all",
              pathname.endsWith(`-${v}`)
                ? "bg-white text-black scale-110"
                : "text-zinc-500 hover:text-white hover:bg-white/10"
            )}
          >
            0{v}
          </Link>
        ))}
      </div>
      
      <div className="flex items-center gap-4 rounded-full border border-white/10 bg-black/80 px-6 py-2 backdrop-blur-md shadow-2xl">
        {ROUTES.map((route) => {
          const version = pathname.split("-").pop();
          const targetPath = route === "hero-page" ? `/${route}-${version}` : `/${route}-${version}`;
          
          return (
            <Link
              key={route}
              href={targetPath}
              className={cn(
                "text-[10px] font-bold uppercase tracking-widest transition-all",
                pathname.includes(route)
                  ? "text-white"
                  : "text-zinc-500 hover:text-zinc-300"
              )}
            >
              {route.replace("hero-page", "Hero")}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
