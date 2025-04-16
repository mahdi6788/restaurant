"use server";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({children}:{children:React.ReactNode}) {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") {
    redirect("/login");
  }

  return (
    <div>
      {children}
    </div>
  )
}
