"use client";

import { useActionState, useEffect, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { User, ShieldCheck, Mail, Calendar, Save, Key } from "lucide-react";
import { updateProfile, changePassword } from "@/lib/actions/profile";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  educationStatus: string;
  course: string;
  createdAt: string;
}

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

export default function SettingsPage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);

  const [updateState, updateAction, isUpdating] = useActionState(updateProfile, undefined);
  const [passwordState, passwordAction, isChangingPassword] = useActionState(changePassword, undefined);

  useEffect(() => {
    async function fetchProfile() {
      const response = await fetch("/api/profile");
      if (response.ok) {
        const data = await response.json();
        setProfile(data);
      }
      setIsLoadingProfile(false);
    }
    fetchProfile();
  }, [updateState]);

  if (isLoadingProfile) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="size-10 md:size-12 border-4 border-black border-t-transparent animate-spin rounded-full" />
      </div>
    );
  }

  return (
    <div className="mx-auto flex flex-col px-4 py-6 md:px-8 md:py-12 max-w-[1200px] w-full gap-8 md:gap-12 text-[#1a1a1a]">
      <header className="shrink-0">
        <h1 className="text-4xl md:text-5xl font-black tracking-tighter italic border-b-[4px] md:border-b-[6px] border-[#ffde59] leading-none inline-block">Settings.</h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
        <div className="lg:col-span-7 space-y-10 md:space-y-12">
          <section className="bg-white border-[3px] md:border-4 border-black p-6 md:p-12 shadow-[8px_8px_0px_#1a1a1a] md:shadow-[12px_12px_0px_#1a1a1a] relative overflow-hidden">
            <div className="relative z-10 space-y-6 md:space-y-8">
              <div className="flex items-center gap-4">
                <div className="size-10 md:size-12 bg-[#ffde59] border-2 md:border-4 border-black flex items-center justify-center shadow-[3px_3px_0px_#000] md:shadow-[4px_4px_0px_#000]">
                  <User className="size-5 md:size-6" />
                </div>
                <h3 className="text-xl md:text-2xl font-black italic">Identity</h3>
              </div>

              <form action={updateAction} className="space-y-5 md:space-y-6">
                {updateState?.message && (
                  <Alert variant={updateState.success ? "default" : "destructive"} className="border-2 md:border-4 border-black rounded-none shadow-[3px_3px_0px_#000] md:shadow-[4px_4px_0px_#000]">
                    <AlertTitle className="font-black text-sm">{updateState.success ? "Success" : "Error"}</AlertTitle>
                    <AlertDescription className="font-bold text-xs">{updateState.message}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-1.5 md:space-y-2">
                  <label htmlFor="profile-email" className="text-[9px] md:text-[10px] font-black uppercase tracking-widest block opacity-40">Email Address (Locked)</label>
                  <div className="flex items-center gap-3 md:gap-4 p-3 md:p-4 border-[3px] md:border-4 border-black bg-zinc-50 font-bold opacity-60 text-xs md:text-sm truncate">
                    <Mail className="size-3.5 md:size-4 shrink-0" />
                    <span id="profile-email">{profile?.email}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                  <div className="space-y-1.5 md:space-y-2">
                    <label htmlFor="settings-first-name" className="text-[9px] md:text-[10px] font-black uppercase tracking-widest block">First Name</label>
                    <input 
                      id="settings-first-name"
                      name="firstName"
                      autoComplete="given-name"
                      defaultValue={profile?.firstName}
                      required
                      className="w-full border-[3px] md:border-4 border-black p-3 md:p-4 outline-none focus:bg-[#4d79ff] focus:text-white transition-colors font-black text-lg md:text-xl" 
                    />
                  </div>
                  <div className="space-y-1.5 md:space-y-2">
                    <label htmlFor="settings-last-name" className="text-[9px] md:text-[10px] font-black uppercase tracking-widest block">Last Name</label>
                    <input 
                      id="settings-last-name"
                      name="lastName"
                      autoComplete="family-name"
                      defaultValue={profile?.lastName}
                      required
                      className="w-full border-[3px] md:border-4 border-black p-3 md:p-4 outline-none focus:bg-[#4d79ff] focus:text-white transition-colors font-black text-lg md:text-xl" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                  <div className="space-y-1.5 md:space-y-2">
                    <label className="text-[9px] md:text-[10px] font-black uppercase tracking-widest block">Status</label>
                    <Select name="educationStatus" defaultValue={profile?.educationStatus}>
                      <SelectTrigger className="w-full border-[3px] md:border-4 border-black p-3 md:p-4 h-auto outline-none focus:bg-[#4d79ff] focus:text-white transition-colors font-black text-xs md:text-sm bg-white data-[state=open]:bg-[#4d79ff] data-[state=open]:text-white">
                        <SelectValue placeholder="Select Status" />
                      </SelectTrigger>
                      <SelectContent className="border-4 border-black rounded-none bg-white p-0 shadow-[8px_8px_0px_#1a1a1a] max-h-[300px]">
                        {EDUCATION_OPTIONS.map((opt) => (
                          <SelectItem key={opt} value={opt} className="p-4 font-black focus:bg-[#ffde59] focus:text-black rounded-none border-b-2 border-black last:border-b-0">
                            {opt}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5 md:space-y-2">
                    <label className="text-[9px] md:text-[10px] font-black uppercase tracking-widest block">Course</label>
                    <Select name="course" defaultValue={profile?.course}>
                      <SelectTrigger className="w-full border-[3px] md:border-4 border-black p-3 md:p-4 h-auto outline-none focus:bg-[#4d79ff] focus:text-white transition-colors font-black text-xs md:text-sm bg-white data-[state=open]:bg-[#4d79ff] data-[state=open]:text-white">
                        <SelectValue placeholder="Select Course" />
                      </SelectTrigger>
                      <SelectContent className="border-4 border-black rounded-none bg-white p-0 shadow-[8px_8px_0px_#1a1a1a] max-h-[300px]">
                        {COURSE_OPTIONS.map((opt) => (
                          <SelectItem key={opt} value={opt} className="p-4 font-black focus:bg-[#ffde59] focus:text-black rounded-none border-b-2 border-black last:border-b-0">
                            {opt}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={isUpdating}
                  className="bg-black text-white px-6 py-3.5 md:px-8 md:py-4 font-black text-xs md:text-sm uppercase tracking-widest hover:bg-[#ff4d4d] transition-all flex items-center justify-center gap-3 disabled:opacity-50 w-full sm:w-auto"
                >
                  <Save className="size-4" />
                  {isUpdating ? "Saving..." : "Update"}
                </button>
              </form>
            </div>
            <div className="absolute -top-16 -right-16 opacity-5 pointer-events-none hidden md:block">
               <User className="size-64 font-black" />
            </div>
          </section>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            <div className="bg-[#4d79ff] border-[3px] md:border-4 border-black p-6 md:p-8 text-white shadow-[6px_6px_0px_#000] md:shadow-[8px_8px_0px_#000]">
              <Calendar className="size-6 md:size-8 mb-3 md:mb-4" />
              <p className="text-[9px] md:text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">Joined System</p>
              <p className="text-xl md:text-2xl font-black italic">
                {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString() : "N/A"}
              </p>
            </div>
            <div className="bg-[#ff4d4d] border-[3px] md:border-4 border-black p-6 md:p-8 text-white shadow-[6px_6px_0px_#000] md:shadow-[8px_8px_0px_#000]">
              <ShieldCheck className="size-6 md:size-8 mb-3 md:mb-4" />
              <p className="text-[9px] md:text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">System Status</p>
              <p className="text-xl md:text-2xl font-black italic">Verified Entity</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5">
          <section className="bg-white border-[3px] md:border-4 border-black p-6 md:p-12 shadow-[8px_8px_0px_#1a1a1a] relative">
            <div className="space-y-6 md:space-y-8">
              <div className="flex items-center gap-4">
                <div className="size-10 md:size-12 bg-black border-2 md:border-4 border-black flex items-center justify-center shadow-[3px_3px_0px_#ff4d4d] md:shadow-[4px_4px_0px_#ff4d4d]">
                  <Key className="size-5 md:size-6 text-white" />
                </div>
                <h3 className="text-xl md:text-2xl font-black italic">Security</h3>
              </div>

              <form action={passwordAction} className="space-y-5 md:space-y-6">
                {passwordState?.message && (
                  <Alert variant={passwordState.success ? "default" : "destructive"} className="border-2 md:border-4 border-black rounded-none shadow-[3px_3px_0px_#000] md:shadow-[4px_4px_0px_#000]">
                    <AlertTitle className="font-black text-sm">{passwordState.success ? "Success" : "Error"}</AlertTitle>
                    <AlertDescription className="font-bold text-xs">{passwordState.message}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-1.5 md:space-y-2">
                  <label htmlFor="current-password" className="text-[9px] md:text-[10px] font-black uppercase tracking-widest block">Current Password</label>
                  <input 
                    id="current-password"
                    name="currentPassword"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="w-full border-[3px] md:border-4 border-black p-3 md:p-4 outline-none focus:bg-[#ffde59] transition-colors font-bold text-sm md:text-base" 
                  />
                </div>

                <div className="h-0.5 bg-black/5" />

                <div className="space-y-1.5 md:space-y-2">
                  <label htmlFor="new-password" className="text-[9px] md:text-[10px] font-black uppercase tracking-widest block">New Password</label>
                  <input 
                    id="new-password"
                    name="newPassword"
                    type="password"
                    autoComplete="new-password"
                    required
                    minLength={6}
                    className="w-full border-[3px] md:border-4 border-black p-3 md:p-4 outline-none focus:bg-[#4d79ff] focus:text-white transition-colors font-bold text-sm md:text-base" 
                  />
                </div>

                <div className="space-y-1.5 md:space-y-2">
                  <label htmlFor="confirm-password" className="text-[9px] md:text-[10px] font-black uppercase tracking-widest block">Confirm New Password</label>
                  <input 
                    id="confirm-password"
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    required
                    minLength={6}
                    className="w-full border-[3px] md:border-4 border-black p-3 md:p-4 outline-none focus:bg-[#4d79ff] focus:text-white transition-colors font-bold text-sm md:text-base" 
                  />
                </div>

                <button 
                  type="submit"
                  disabled={isChangingPassword}
                  className="w-full bg-black text-white py-4 md:py-6 font-black text-lg md:text-xl border-2 md:border-4 border-black shadow-[4px_4px_0px_#1a1a1a] md:shadow-[6px_6px_0px_#1a1a1a] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[10px_10px_0px_#1a1a1a] active:translate-x-0 active:translate-y-0 transition-all disabled:opacity-50"
                >
                  {isChangingPassword ? "UPDATING..." : "UPDATE"}
                </button>
              </form>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
