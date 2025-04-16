"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Sidebar from "../../components/Sidebar";
import Loading from "@/app/components/loading";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { data: session, status } = useSession();
  
  if (!session) {
    router.push("/login");
    return null;
  }
  
  if (status !== "authenticated") return <Loading/>;

  return (
    <div className="flex flex-col min-h-screen md:flex-row md:overflow-hidden bg-emerald-500 text-orange-900">
      {/* static part of the layout */}
      <div className="flex-none w-full md:w-64">
        <Sidebar />
      </div>
      {/* dynamic part of the layout 
      children are all the pages inside all folders into users directory */}

      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}
