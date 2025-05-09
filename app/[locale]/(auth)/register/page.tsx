import RegisterForm from "@/app/components/auth/RegisterForm";
import { Suspense } from "react";

export default function RegisterPage() {
  return (
    <main className="flex items-center justify-center md:h-screen text-orange-500 bg-emerald-900">
      <div className="relative mx-auto ">
        <Suspense>
          <RegisterForm />
        </Suspense>
      </div>
    </main>
  );
}
