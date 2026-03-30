import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import {
  SidebarProvider,
} from "@/components/ui/sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id || !session.user.email) {
    redirect("/signin");
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-[#fffdf5] text-[#1a1a1a] selection:bg-[#ffde59] selection:text-black font-sans relative">
        <DashboardSidebar userEmail={session.user.email} />
        <main className="flex-1 overflow-auto pt-16 lg:pt-0">
          <div className="relative z-10 min-h-[calc(100vh-4rem)]">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
