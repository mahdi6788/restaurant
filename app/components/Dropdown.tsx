"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { FaSignOutAlt } from "react-icons/fa";
import { MdDashboardCustomize } from "react-icons/md";
import LogoutModal from "./LogoutModal";
import { useState } from "react";
import { IoBagCheckOutline } from "react-icons/io5";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

export default function Dropdown({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const translate = useTranslations("Dropdown");
  const { data: session } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pathname = usePathname()
  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <span className="flex items-center justify-center gap-1 text-xl font-bold hover:text-stone-100 text-yellow-300">
        <Image
          alt=""
          src={session?.user.image ?? "/images/elements/user.png"}
          width={30}
          height={30}
          className="rounded-full"
        />
        {translate("Welcome")}, {session?.user.name || session?.user.email}
      </span>
      {isOpen && (
        <div
          className="absolute left-0 w-full shadow-lg text-md text-black bg-emerald-300 opacity-90 z-40"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          <ul className="py-1">
            <li>
              <Link
                href="/users"
                className={`flex items-center w-full gap-2 px-4 py-2 hover:bg-emerald-50 ${pathname.includes("/users") && "bg-sky-200 text-blue-600"}`}
              >
                <MdDashboardCustomize />
                {translate("Dashboard")}
              </Link>
            </li>
            <li>
              <Link
                href="/checkout"
                className={`flex items-center w-full gap-2 px-4 py-2 hover:bg-emerald-50 ${pathname.includes("/checkout") && "bg-sky-200 text-blue-600"}`}
              >
                <IoBagCheckOutline />
                {translate("Checkout")}
              </Link>
            </li>
            <li>
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center w-full gap-2 px-4 py-2 hover:bg-emerald-50"
              >
                <FaSignOutAlt />
                {translate("Logout")}
              </button>
            </li>
          </ul>
        </div>
      )}
      <LogoutModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
