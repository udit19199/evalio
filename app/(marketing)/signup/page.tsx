import Link from "next/link";
import { SignUpForm } from "@/components/auth/signup-form";

export default function SignupPage() {
  return (
    <main className="min-h-svh flex flex-col px-6 py-8 md:px-12 md:py-16 max-w-[1400px] mx-auto">
      <header className="flex justify-between items-center mb-8 md:mb-12">
        <div className="flex gap-2">
          <div className="size-3 md:size-4 bg-[#ff4d4d]" />
          <div className="size-3 md:size-4 bg-[#4d79ff]" />
          <div className="size-3 md:size-4 rounded-full bg-[#ffde59]" />
        </div>
        <Link href="/" className="text-[10px] md:text-xs font-black uppercase tracking-widest border-2 border-black px-3 py-1.5 md:px-4 md:py-1.5 hover:bg-black hover:text-white transition-all">Back</Link>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center py-8 md:py-12">
        <div className="w-full max-w-lg">
          <SignUpForm />
        </div>
      </div>
    </main>
  );
}
