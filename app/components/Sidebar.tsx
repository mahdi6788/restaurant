import Link from "next/link";
import NavLinks from "@/app/components/admin/NavLinks";
import Logo from "./Logo";
import { FaSignOutAlt } from "react-icons/fa";
import { signOut } from "@/app/lib/auth";

export default function Sidebar() {
  return (
    <div className="flex flex-col h-full px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-20 rounded-md bg-blue-600 p-4 md:h-40"
        href="/"
      >
        <div className=" text-white md:w-40">
          <Logo />
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/" });
          }}
        >
          <button className="flex w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-lg font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <FaSignOutAlt className="w-7" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}
