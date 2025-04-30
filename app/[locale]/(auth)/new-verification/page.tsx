"use client";

import { newVerification } from "@/app/lib/new-verification";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";

export default function NewVerification() {
  const [error, setError] = useState<string | null>("");
  const [success, setSuccess] = useState<string | null>("");

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit = useCallback(async () => {
    if (!token) {
      setError("Missing token");
      return;
    }

    const res = await newVerification(token);
    setError(res?.error as string);
    setSuccess(res?.success as string);
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-emerald-900">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold mb-6 text-center">
            Confirming your verification
          </h1>
          {!error && !success && <BeatLoader color="green" />}
          {error 
          ? <div className="p-2 rounded-sm text-red-500">{error}</div>
          : <div className="p-2 rounded-sm text-green-500">{success}</div>}
          <div className="text-center mt-4">
            <a href="/login" className="text-blue-900 hover:underline">
              Back to login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
