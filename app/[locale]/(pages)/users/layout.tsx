"use client";

import { useSession } from "next-auth/react";

import Sidebar from "../../../components/Sidebar";
import Loading from "@/app/components/loading";
import SearchFilterSort from "@/app/components/SearchFilterSort";
import { usePathname, useRouter } from "@/i18n/navigation";

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
    <div className="flex flex-col min-h-screen sm:flex-row sm:overflow-hidden bg-emerald-900 text-orange-500 ">
      {/* static part of the layout */}
      <div className="flex-none w-full sm:w-64 ">
        <Sidebar />
      </div>
      <div className="flex-grow p-2 sm:overflow-y-auto sm:p-12 mt-1 sm:mt-14 mb-7">
        {(pathname === "/users" ||
          pathname === "/users/customers/orders" ||
          pathname === "/users/admin/orders") && <SearchFilterSort />}
        {children}
      </div>
    </div>
  );
}
