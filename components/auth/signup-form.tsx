"use client";

import { useActionState, useEffect, useRef } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { motion } from "motion/react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { signup } from "@/lib/actions/auth";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

const EDUCATION_OPTIONS = [
  "1st Year Undergraduate",
  "2nd Year Undergraduate",
  "3rd Year Undergraduate",
  "4th Year Undergraduate",
  "Postgraduate",
  "Graduate",
  "Professional",
];

const COURSE_OPTIONS = [
  "B.Tech (Computer Science)",
  "B.Tech (Information Technology)",
  "B.Tech (Electronics & Comm.)",
  "B.Tech (Mechanical)",
  "BCA (Bachelor of Computer App.)",
  "BBA (Finance)",
  "BBA (Marketing)",
  "BBA (HR)",
  "B.Sc (Physics/Chemistry/Math)",
  "B.Sc (Biology/Biotech)",
  "M.Tech (Specialized)",
  "MCA (Master of Computer App.)",
  "MBA (Global/Specialized)",
  "Other / Non-Traditional",
];

export function SignUpForm() {
  const [state, action, isPending] = useActionState(signup, undefined);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.success) {
      const timer = setTimeout(() => {
        if (!formRef.current) return;
        const formData = new FormData(formRef.current);
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
  }, [state]);

  return (
    <motion.div 
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-white border-[3px] md:border-[4px] border-black p-6 md:p-12 shadow-[8px_8px_0px_#1a1a1a] md:shadow-[12px_12px_0px_#1a1a1a] w-full"
    >
      <h1 className="text-3xl md:text-5xl font-black mb-6 md:mb-8 italic leading-none text-[#1a1a1a]">Join the Fun.</h1>
      <form ref={formRef} action={action} className="space-y-4 md:space-y-6">
        {state?.message && (
          <Alert variant={state.success ? "default" : "destructive"} className="border-2 md:border-4 border-black rounded-none shadow-[4px_4px_0px_#1a1a1a]">
            <AlertTitle className="font-black text-sm md:text-base">{state.success ? "Success" : "Error"}</AlertTitle>
            <AlertDescription className="font-bold text-xs md:text-sm">{state.message}</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
          <div className="space-y-1.5 md:space-y-2">
            <label htmlFor="signup-first-name" className="text-[10px] md:text-xs font-black uppercase tracking-widest block text-[#1a1a1a]">First Name</label>
            <input 
              id="signup-first-name"
              name="firstName"
              type="text" 
              autoComplete="given-name"
              required
              placeholder="e.g. Jane"
              className="w-full border-2 md:border-4 border-black p-3 md:p-4 outline-none focus:bg-[#ffde59] transition-colors font-bold text-sm md:text-base text-[#1a1a1a]" 
            />
          </div>
          <div className="space-y-1.5 md:space-y-2">
            <label htmlFor="signup-last-name" className="text-[10px] md:text-xs font-black uppercase tracking-widest block text-[#1a1a1a]">Last Name</label>
            <input 
              id="signup-last-name"
              name="lastName"
              type="text" 
              autoComplete="family-name"
              required
              placeholder="e.g. Doe"
              className="w-full border-2 md:border-4 border-black p-3 md:p-4 outline-none focus:bg-[#ffde59] transition-colors font-bold text-sm md:text-base text-[#1a1a1a]" 
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
          <div className="space-y-1.5 md:space-y-2">
            <label className="text-[10px] md:text-xs font-black uppercase tracking-widest block text-[#1a1a1a]">Status</label>
            <Select name="educationStatus">
              <SelectTrigger className="w-full border-2 md:border-4 border-black p-3 md:p-4 h-auto outline-none focus:bg-[#4d79ff] focus:text-white transition-colors font-bold text-xs md:text-sm bg-white text-[#1a1a1a] data-[state=open]:bg-[#4d79ff] data-[state=open]:text-white">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent className="border-4 border-black rounded-none bg-white p-0 shadow-[8px_8px_0px_#1a1a1a] max-h-[300px]">
                {EDUCATION_OPTIONS.map((opt) => (
                  <SelectItem key={opt} value={opt} className="p-4 font-bold focus:bg-[#ffde59] focus:text-black rounded-none border-b-2 border-black last:border-b-0">
                    {opt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5 md:space-y-2">
            <label className="text-[10px] md:text-xs font-black uppercase tracking-widest block text-[#1a1a1a]">Course</label>
            <Select name="course">
              <SelectTrigger className="w-full border-2 md:border-4 border-black p-3 md:p-4 h-auto outline-none focus:bg-[#4d79ff] focus:text-white transition-colors font-bold text-xs md:text-sm bg-white text-[#1a1a1a] data-[state=open]:bg-[#4d79ff] data-[state=open]:text-white">
                <SelectValue placeholder="Select Course" />
              </SelectTrigger>
              <SelectContent className="border-4 border-black rounded-none bg-white p-0 shadow-[8px_8px_0px_#1a1a1a] max-h-[300px]">
                {COURSE_OPTIONS.map((opt) => (
                  <SelectItem key={opt} value={opt} className="p-4 font-bold focus:bg-[#ffde59] focus:text-black rounded-none border-b-2 border-black last:border-b-0">
                    {opt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-1.5 md:space-y-2">
          <label htmlFor="signup-email" className="text-[10px] md:text-xs font-black uppercase tracking-widest block text-[#1a1a1a]">Email</label>
          <input 
            id="signup-email"
            name="email"
            type="email" 
            autoComplete="email"
            required
            placeholder="you@example.com"
            className="w-full border-2 md:border-4 border-black p-3 md:p-4 outline-none focus:bg-[#ffde59] transition-colors font-bold text-sm md:text-base text-[#1a1a1a]" 
          />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
          <div className="space-y-1.5 md:space-y-2">
            <label htmlFor="signup-password" className="text-[10px] md:text-xs font-black uppercase tracking-widest block text-[#1a1a1a]">Password</label>
            <input 
              id="signup-password"
              name="password"
              type="password" 
              autoComplete="new-password"
              required
              minLength={6}
              placeholder="••••••••"
              className="w-full border-2 md:border-4 border-black p-3 md:p-4 outline-none focus:bg-[#ffde59] transition-colors font-bold text-sm md:text-base text-[#1a1a1a]" 
            />
          </div>
          <div className="space-y-1.5 md:space-y-2">
            <label htmlFor="signup-confirm-password" className="text-[10px] md:text-xs font-black uppercase tracking-widest block text-[#1a1a1a]">Confirm Password</label>
            <input 
              id="signup-confirm-password"
              name="confirmPassword"
              type="password" 
              autoComplete="new-password"
              required
              minLength={6}
              placeholder="••••••••"
              className="w-full border-2 md:border-4 border-black p-3 md:p-4 outline-none focus:bg-[#ffde59] transition-colors font-bold text-sm md:text-base text-[#1a1a1a]" 
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

        <p className="text-center font-bold text-xs md:text-sm text-[#1a1a1a]">
          Already a player? <Link href="/signin" className="text-[#ff4d4d] underline underline-offset-4 hover:text-black">Log in here.</Link>
        </p>
      </form>
    </motion.div>
  );
}
