"use client";
import { CiHome } from "react-icons/ci";
import { FaBowlFood } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";


;
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";


// Map of links to display in the side navigation.
const links = [
  { name: "Home", href: "/users", icon: CiHome },
  {
    name: "Foods",
    href: "/users/admin/foods",
    icon: FaBowlFood ,
  },
  { name: "Customers", href: "/users/admin/customers", icon: FaUsers },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-lg font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
              { "bg-sky-100 text-blue-600": pathname === link.href }
            )}
          >
            <LinkIcon className="w-7" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
