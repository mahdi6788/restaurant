"use client";

import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import Sidebar from "../../components/Sidebar";
import Loading from "@/app/components/loading";
import SearchFilterSort from "@/app/components/SearchFilterSort";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const pathname = usePathname();

  if (!session) {
    router.push("/login");
    return null;
  }

  if (status !== "authenticated") return <Loading />;

  return (
    <div className="flex flex-col min-h-screen sm:flex-row sm:overflow-hidden bg-emerald-500 text-orange-900 ">
      {/* static part of the layout */}
      <div className="flex-none w-full sm:w-64">
        <Sidebar />
      </div>
      {/* dynamic part of the layout 
      children are all the pages inside all folders into users directory */}

      <div className="flex-grow p-6 sm:overflow-y-auto sm:p-12 mt-1 sm:mt-14 mb-7">
        {(pathname === "/users" ||
          pathname === "/users/customers/orders" ||
          pathname === "/users/admin/orders") && <SearchFilterSort />}
        {children}
      </div>
    </div>
  );
}
