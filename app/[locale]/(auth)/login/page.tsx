import LoginForm from "@/app/components/auth/LoginForm";
import { Suspense } from "react";

export default function LogIn() {
  return (
    <main className="flex items-center justify-center md:min-h-screen bg-emerald-900 text-orange-500">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </main>
  );
}
