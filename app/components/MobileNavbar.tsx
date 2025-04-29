"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { FaSignOutAlt, FaSignInAlt, FaRegistered } from "react-icons/fa";
import {
  MdDarkMode,
  MdDashboardCustomize,
  MdLightMode,
  MdLanguage,
} from "react-icons/md";
import { TiThMenu } from "react-icons/ti";
import { IoBagCheckOutline } from "react-icons/io5";
import { TiInfoLargeOutline } from "react-icons/ti";
import AboutUsModal from "./AboutUsModal";
import { useEffect, useRef, useState } from "react";
import LogoutModal from "./LogoutModal";
import { useTranslations } from "next-intl";
import LocaleSwitcher from "./LocaleSwitcher";
import { useTheme } from "../context/ThemeContext";

export default function MobileNavbar({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const translate = useTranslations("MobileNavbar");
  const { data: session } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const navRef = useRef<HTMLDivElement>(null);

  // Handle clicks outside the navbar to close the menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  return (
    <nav
      ref={navRef}
      className="sm:hidden fixed top-4 right-4 z-50"
      onClick={() => setIsOpen(!isOpen)}
    >
      <TiThMenu size={30} color="white" />
      {isOpen && (
        <div className="absolute top-10 right-0 bg-transparent font-bold text-black z-40">
          <ul className="flex flex-col items-start gap-1 p-4 rounded-lg shadow-lg bg-white">
            {session ? (
              <div className="flex flex-col items-start gap-1">
                <span className="flex items-center gap-1 text-sm font-light text-lime-500 hover:text-stone-100">
                  <Image
                    alt=""
                    src={session?.user.image ?? "/images/elements/user.png"}
                    width={20}
                    height={20}
                    className="rounded-full"
                  />
                  {session?.user.name || session?.user.email}
                </span>

                <li>
                  <button onClick={toggleTheme} className="p-2">
                    {theme === "light" ? (
                      <MdDarkMode size={30} color="gray" />
                    ) : (
                      <MdLightMode size={30} color="yellow" />
                    )}
                  </button>
                </li>
                <li>
                  <LocaleSwitcher />
                </li>
                <li>
                  <Link
                    href="/users"
                    className="flex items-center gap-2 px-4 py-2"
                  >
                    <MdDashboardCustomize />
                    {translate("Dashboard")}
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => setIsLogoutModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2"
                  >
                    <FaSignOutAlt />
                    {translate("Logout")}
                  </button>
                </li>
                <li>
                  <Link
                    href="/checkout"
                    className=" flex items-center gap-2 px-4 py-2"
                  >
                    <IoBagCheckOutline />
                    {translate("Checkout")}
                  </Link>
                </li>
              </div>
            ) : (
              <div className="flex flex-col items-start gap-1">
                <span className="flex items-start gap-1 text-sm font-light text-lime-500 hover:text-stone-100">
                  {translate("Join us for a delicious experience")} 😊
                </span>
                <li>
                  <button onClick={toggleTheme} className="p-2">
                    {theme === "light" ? (
                      <MdDarkMode size={20} color="black" />
                    ) : (
                      <MdLightMode size={20} color="orange" />
                    )}
                  </button>
                </li>
                <li className=" flex items-center gap-2 px-4 py-2">
                  <MdLanguage />
                  <LocaleSwitcher />
                </li>
                <li>
                  <Link
                    href="/login"
                    className=" flex items-center gap-2 px-4 py-2"
                  >
                    <FaSignInAlt />
                    {translate("Login")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/register"
                    className=" flex items-center gap-2 px-4 py-2"
                  >
                    <FaRegistered />
                    {translate("Register")}
                  </Link>
                </li>
              </div>
            )}
            <li className=" flex items-center gap-2 px-2 py-2">
              <TiInfoLargeOutline />
              <button onClick={() => setIsModalOpen(true)}>
                {translate("About Us")}
              </button>
            </li>
          </ul>
        </div>
      )}
      {/* Logout Modal */}
      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
      />

      {/* About Modal */}
      <AboutUsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </nav>
  );
}
