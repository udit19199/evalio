"use client";

import { useActionState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { motion } from "motion/react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { signup } from "@/lib/actions/auth";
import { ChevronDown } from "lucide-react";

const EDUCATION_OPTIONS = [
  "1st Year Undergraduate",
  "2nd Year Undergraduate",
  "3rd Year Undergraduate",
  "4th Year Undergraduate",
  "Postgraduate",
  "Graduate (Seeking Opportunities)",
  "Professional",
];

export function SignUpForm() {
  const router = useRouter();
  const [state, action, isPending] = useActionState(signup, undefined);

  useEffect(() => {
    if (state?.success) {
      const timer = setTimeout(() => {
        const form = document.querySelector("form") as HTMLFormElement;
        const formData = new FormData(form);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        signIn("credentials", {
          email,
          password,
          callbackUrl: "/dashboard",
        });
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [state, router]);

  return (
    <motion.div 
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-white border-[3px] md:border-[4px] border-black p-6 md:p-12 shadow-[8px_8px_0px_#1a1a1a] md:shadow-[12px_12px_0px_#1a1a1a] w-full"
    >
      <h1 className="text-3xl md:text-5xl font-black mb-6 md:mb-8 italic leading-none">Join the Fun.</h1>
      <form action={action} className="space-y-4 md:space-y-6">
        {state?.message && (
          <Alert variant={state.success ? "default" : "destructive"} className="border-2 md:border-4 border-black rounded-none shadow-[4px_4px_0px_#1a1a1a]">
            <AlertTitle className="font-black text-sm md:text-base">{state.success ? "Success" : "Error"}</AlertTitle>
            <AlertDescription className="font-bold text-xs md:text-sm">{state.message}</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
          <div className="space-y-1.5 md:space-y-2">
            <label className="text-[10px] md:text-xs font-black uppercase tracking-widest block">First Name</label>
            <input 
              name="firstName"
              type="text" 
              required
              placeholder="e.g. Jane"
              className="w-full border-2 md:border-4 border-black p-3 md:p-4 outline-none focus:bg-[#ffde59] transition-colors font-bold text-sm md:text-base" 
            />
          </div>
          <div className="space-y-1.5 md:space-y-2">
            <label className="text-[10px] md:text-xs font-black uppercase tracking-widest block">Last Name</label>
            <input 
              name="lastName"
              type="text" 
              required
              placeholder="e.g. Doe"
              className="w-full border-2 md:border-4 border-black p-3 md:p-4 outline-none focus:bg-[#ffde59] transition-colors font-bold text-sm md:text-base" 
            />
          </div>
        </div>

        <div className="space-y-1.5 md:space-y-2">
          <label className="text-[10px] md:text-xs font-black uppercase tracking-widest block">Education Status</label>
          <div className="relative">
            <select 
              name="educationStatus"
              required
              className="w-full appearance-none border-2 md:border-4 border-black p-3 md:p-4 outline-none focus:bg-[#4d79ff] focus:text-white transition-colors font-bold text-sm md:text-base bg-white"
            >
              <option value="" disabled>Select your current status</option>
              {EDUCATION_OPTIONS.map((opt) => (
                <option key={opt} value={opt} className="text-black bg-white">{opt}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 size-4 pointer-events-none" />
          </div>
        </div>

        <div className="space-y-1.5 md:space-y-2">
          <label className="text-[10px] md:text-xs font-black uppercase tracking-widest block">Email</label>
          <input 
            name="email"
            type="email" 
            required
            placeholder="you@example.com"
            className="w-full border-2 md:border-4 border-black p-3 md:p-4 outline-none focus:bg-[#ffde59] transition-colors font-bold text-sm md:text-base" 
          />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
          <div className="space-y-1.5 md:space-y-2">
            <label className="text-[10px] md:text-xs font-black uppercase tracking-widest block">Password</label>
            <input 
              name="password"
              type="password" 
              required
              minLength={6}
              placeholder="••••••••"
              className="w-full border-2 md:border-4 border-black p-3 md:p-4 outline-none focus:bg-[#ffde59] transition-colors font-bold text-sm md:text-base" 
            />
          </div>
          <div className="space-y-1.5 md:space-y-2">
            <label className="text-[10px] md:text-xs font-black uppercase tracking-widest block">Confirm Password</label>
            <input 
              name="confirmPassword"
              type="password" 
              required
              minLength={6}
              placeholder="••••••••"
              className="w-full border-2 md:border-4 border-black p-3 md:p-4 outline-none focus:bg-[#ffde59] transition-colors font-bold text-sm md:text-base" 
            />
          </div>
        </div>
        
        <button 
          type="submit"
          disabled={isPending}
          className="w-full bg-[#4d79ff] text-white py-4 md:py-6 font-black text-xl md:text-2xl border-2 md:border-4 border-black shadow-[4px_4px_0px_#1a1a1a] md:shadow-[6px_6px_0px_#1a1a1a] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[10px_10px_0px_#1a1a1a] active:translate-x-0 active:translate-y-0 active:shadow-none transition-all disabled:opacity-50 mt-4"
        >
          {isPending ? "WAIT..." : "LET'S GO!"}
        </button>

        <p className="text-center font-bold text-xs md:text-sm">
          Already a player? <Link href="/signin" className="text-[#ff4d4d] underline underline-offset-4 hover:text-black">Log in here.</Link>
        </p>
      </form>
    </motion.div>
  );
}
