"use server";
import { auth } from "@/auth";
import { redirect } from "@/i18n/navigation";


export default async function AdminLayout({children}:{children:React.ReactNode}) {
  const session = await auth();
  if (!session || session?.user.role !== "ADMIN") {
    redirect({href: "/login", locale:"en"});
  }

  return (
    <div>
      {children}
    </div>
  )
}
