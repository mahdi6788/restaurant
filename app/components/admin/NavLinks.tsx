"use client";
import { CiHome } from "react-icons/ci";
import { FaBowlFood } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";
import { FaOpencart } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { Link, usePathname } from "@/i18n/navigation";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";

export default function NavLinks() {
  const translate = useTranslations("NavLinks")
  const { data: session } = useSession();
  const userRole = session?.user.role;
  // Map of links to display in the side navigation.
  const links =
    userRole === "ADMIN"
      ? [
          { name: translate("Home"), href: "/users", icon: CiHome },
          {
            name: translate("Orders History"),
            href: "/users/admin/orders",
            icon: FaOpencart,
          },
          { name: translate("Customers"), href: "/users/admin/customers", icon: FaUsers },
          {
            name: translate("Menu"),
            href: "/users/admin/foods",
            icon: FaBowlFood,
          },
          { name: translate("Profile"), href: "/users/admin/profile", icon: CgProfile },
        ]
      : [
          { name: translate("Home"), href: "/users", icon: CiHome },
          {
            name: translate("Orders History"),
            href: "/users/customers/orders",
            icon: FaOpencart,
          },
          {
            name: translate("Profile"),
            href: "/users/customers/profile",
            icon: CgProfile,
          },
        ];

  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={`flex grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-lg font-medium hover:bg-sky-100 hover:text-blue-600 sm:flex-none sm:justify-start sm:p-2 sm:px-3",
             ${pathname === link.href && "bg-sky-100 text-blue-600"}`}
          >
            <LinkIcon className="w-7" />
            <p className="hidden sm:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
