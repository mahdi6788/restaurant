import Link from "next/link";
import Logo from "../components/Logo";
import { Suspense } from "react";
import LoginForm from "../components/LoginForm";

export default function page() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-36">
          <div className="w-32 text-white md:w-36">
          <Link
        className="mb-2 flex h-20 rounded-md bg-blue-600 p-4 md:h-40"
        href="/"
      >
        <div className=" text-white md:w-40">
          <Logo />
        </div>
      </Link>
          </div>
        </div>
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </main>
 )
}
