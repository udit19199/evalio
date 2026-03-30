"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  FileQuestion,
  LibraryBig,
  User,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface DashboardSidebarProps {
  userEmail: string;
}

export function DashboardSidebar({ userEmail }: DashboardSidebarProps) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleSignOut = () => {
    signOut({ callbackUrl: "/signin" });
  };

  const navItems = [
    { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard", color: "#4d79ff" },
    { href: "/quiz", icon: FileQuestion, label: "Quiz", color: "#ff4d4d" },
    { href: "/questions", icon: LibraryBig, label: "Questions", color: "#ffde59" },
    { href: "/settings", icon: User, label: "Settings", color: "#ffde59" },
  ];

  return (
    <>
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b-[4px] border-black flex items-center justify-between px-6 z-[60]">
        <span className="font-black text-xl tracking-tighter italic">Evalio.</span>
        <button 
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label={isMobileOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMobileOpen}
          aria-controls="dashboard-mobile-sidebar"
          className="size-10 border-2 border-black flex items-center justify-center bg-[#ffde59] shadow-[4px_4px_0px_#000]"
        >
          {isMobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </header>

      {/* Sidebar / Mobile Overlay */}
      <aside 
        id="dashboard-mobile-sidebar"
        className={cn(
          "fixed inset-y-0 left-0 lg:sticky lg:top-0 h-screen border-r-[4px] border-black bg-white transition-all duration-300 flex flex-col z-50",
          isCollapsed ? "lg:w-[80px]" : "lg:w-[280px]",
          isMobileOpen ? "translate-x-0 w-full md:w-[320px]" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Desktop Brand Header / Toggle */}
        <div className={cn("hidden lg:flex p-6 border-b-[4px] border-black items-center", isCollapsed ? "justify-center" : "justify-between")}>
          {!isCollapsed && <span className="font-black text-xl tracking-tighter italic">Evalio.</span>}
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={cn(
              "flex items-center justify-center border-[3px] border-black transition-all hover:bg-[#ffde59] hover:shadow-[4px_4px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px]",
              isCollapsed ? "size-12" : "size-8"
            )}
          >
            {isCollapsed ? <ChevronRight className="size-6" /> : <ChevronLeft className="size-4" />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 pt-20 lg:pt-4 space-y-4 overflow-y-auto">
          <ul className="space-y-3">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href} className="flex justify-center">
                  <Link 
                    href={item.href}
                    onClick={() => setIsMobileOpen(false)}
                    className={cn(
                      "flex items-center border-[3px] border-black transition-all group relative",
                      isCollapsed ? "lg:justify-center lg:w-12 lg:h-12" : "gap-4 p-4 w-full",
                      isActive 
                        ? "shadow-[4px_4px_0px_#000] translate-x-[-2px] translate-y-[-2px]" 
                        : "bg-transparent hover:bg-zinc-50 hover:shadow-[2px_2px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px]",
                      !isCollapsed && isMobileOpen && "justify-start w-full"
                    )}
                    style={{ backgroundColor: isActive ? item.color : undefined }}
                  >
                    <item.icon 
                      className="size-6 shrink-0 transition-colors" 
                      style={{ color: isActive ? "black" : "black" }} 
                    />
                    {(!isCollapsed || isMobileOpen) && (
                      <span className={cn("font-black tracking-tight", isActive ? "text-black" : "opacity-60")}>
                        {item.label}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer / Auth */}
        <div className="p-4 border-t-[4px] border-black space-y-4 bg-white">
          {(!isCollapsed || isMobileOpen) && (
            <div className="px-2 space-y-1 mb-4">
              <p className="text-[10px] font-black uppercase opacity-30">Account</p>
              <p className="text-xs font-bold truncate">{userEmail}</p>
            </div>
          )}
          <button 
            onClick={handleSignOut}
            className={cn(
              "w-full flex items-center border-[3px] border-black bg-[#fffdf5] hover:bg-[#ff4d4d] hover:text-white transition-all group shadow-[4px_4px_0px_#000]",
              isCollapsed && !isMobileOpen ? "justify-center w-12 h-12" : "gap-4 p-4"
            )}
          >
            <LogOut className="size-6 shrink-0" />
            {(!isCollapsed || isMobileOpen) && <span className="font-black">Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* Mobile Background Blur Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  );
}
