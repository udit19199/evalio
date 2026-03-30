"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { motion } from "motion/react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const normalizeRedirectPath = (url: string | null | undefined, fallback: string) => {
  if (!url) return fallback;
  if (url.startsWith("/")) return url;
  try {
    const parsed = new URL(url, window.location.origin);
    return `${parsed.pathname}${parsed.search}${parsed.hash}` || fallback;
  } catch {
    return fallback;
  }
};

export function SignInForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const callbackUrl =
      typeof window === "undefined"
        ? "/dashboard"
        : (() => {
            const value = new URLSearchParams(window.location.search).get("callbackUrl");
            if (!value || !value.startsWith("/")) {
              return "/dashboard";
            }
            return value;
          })();

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl,
    });

    setIsSubmitting(false);

    if (!result || result.error) {
      setError("Invalid email or password.");
      return;
    }

    router.push(normalizeRedirectPath(result.url, callbackUrl));
    router.refresh();
  };

  return (
    <motion.div 
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-white border-[3px] md:border-[4px] border-black p-6 md:p-12 shadow-[8px_8px_0px_#1a1a1a] md:shadow-[12px_12px_0px_#1a1a1a] w-full"
    >
      <h1 className="text-3xl md:text-5xl font-black mb-6 md:mb-8 italic">Welcome Back.</h1>
      <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
        {error && (
          <Alert variant="destructive" className="border-2 md:border-4 border-black rounded-none shadow-[4px_4px_0px_#1a1a1a]">
            <AlertTitle className="font-black text-sm md:text-base">Error</AlertTitle>
            <AlertDescription className="font-bold text-xs md:text-sm">{error}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-1.5 md:space-y-2">
          <label className="text-[10px] md:text-xs font-black uppercase tracking-widest block">Email</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border-2 md:border-4 border-black p-3 md:p-4 outline-none focus:bg-[#4d79ff] focus:text-white transition-colors font-bold text-sm md:text-base" 
          />
        </div>
        <div className="space-y-1.5 md:space-y-2">
          <label className="text-[10px] md:text-xs font-black uppercase tracking-widest block">Password</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="w-full border-2 md:border-4 border-black p-3 md:p-4 outline-none focus:bg-[#4d79ff] focus:text-white transition-colors font-bold text-sm md:text-base" 
          />
        </div>
        
        <button 
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#ffde59] text-black py-4 md:py-6 font-black text-xl md:text-2xl border-2 md:border-4 border-black shadow-[4px_4px_0px_#1a1a1a] md:shadow-[6px_6px_0px_#1a1a1a] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[10px_10px_0px_#1a1a1a] active:translate-x-0 active:translate-y-0 active:shadow-none transition-all disabled:opacity-50"
        >
          {isSubmitting ? "WAIT..." : "ACCESS CORE"}
        </button>

        <p className="text-center font-bold text-xs md:text-sm">
          New here? <Link href="/signup" className="text-[#ff4d4d] underline underline-offset-4 hover:text-black">Join the fun.</Link>
        </p>
      </form>
    </motion.div>
  );
}
