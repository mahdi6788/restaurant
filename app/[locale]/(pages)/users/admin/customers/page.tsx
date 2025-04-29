"use client";
import { Link } from "@/i18n/navigation";
import { User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import Image from "next/image";


export default function CustomersPage() {
  const translate = useTranslations("CustomersPage")
  const fetchUsersFn = async () => {
    const res = await fetch("/api/users", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!res) return null;
    const users = await res.json();
    return users as User[];
  };
  
  const { data: allUsers = [] } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsersFn,
  });

  return (
    <div className="space-y-4 -ml-2">
      {/* TODO: search(name, id) */}

      {/* Desktop */}
      <table className="hidden sm:table min-w-full text-gray-900">
        <thead className="text-left text-sm">
          <tr>
            <th className="p-1" scope="col"></th>
            <th className="p-1" scope="col">
              {translate("Name")}
            </th>
            <th className="p-1" scope="col">
              {translate("E-mail")}
            </th>
            <th className="p-1" scope="col">
              {translate("Phone")}
            </th>
            <th className="p-1" scope="col">
              {translate("Area")}
            </th>
            <th className="p-1" scope="col">
              {translate("Balance")}
            </th>
          </tr>
        </thead>
        <tbody>
          {allUsers?.map((user: User) => (
            <tr key={user.id ?? ""} className="w-full py-3 text-sm">
              <td className="px-1 py-1 w-12">
                <Image
                  alt={user.name ?? "User picture"}
                  src={user.image ?? "/images/elements/user.png"}
                  width={30}
                  height={30}
                  className="rounded-full"
                />
              </td>
              <td className="px-1 py-1 border">
                <Link
                  href={`/users/admin/customers/${user.id}/details`}
                  className=" p-1 hover:bg-green-100 hover:rounded-md"
                >
                  <span>{user.name ?? ""}</span>
                </Link>
              </td>
              <td className="px-1 py-1 border">{user?.email ?? ""}</td>
              <td className="px-1 py-1 border">{user.phone ?? ""}</td>
              <td className="px-1 py-1 border">{user?.area ?? ""}</td>
              <td className="px-1 py-1 border">{user?.balance ?? 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Mobile */}
      <table className="sm:hidden table min-w-full text-gray-900">
        <thead className="text-left text-sm">
          <tr>
            <th className="p-1" scope="col">
              Name
            </th>
            <th className="p-1" scope="col">
              E-mail
            </th>
            <th className="p-1" scope="col">
              Phone
            </th>
          </tr>
        </thead>
        <tbody>
          {allUsers?.map((user: User) => (
            <tr key={user.id ?? ""} className="w-full py-3 text-sm">
              <td className="px-1 py-1 border">
                <Link
                  href={`/users/admin/customers/${user.id}/details`}
                  className=" p-1 hover:bg-green-100 hover:rounded-md"
                >
                  <span>{user.name ?? ""}</span>
                </Link>
              </td>
              <td className="px-1 py-1 border">{user?.email ?? ""}</td>
              <td className="px-1 py-1 border">{user.phone ?? ""}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
