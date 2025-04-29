"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { useRouter } from "@/i18n/navigation";

export default function NewPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const res = await fetch("/api/auth/resetPassword", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });

    const response = await res.json();
    switch (res.status) {
      case 201:
        toast.success(response.message);
        router.push("/login");
        break;
      case 400:
        toast.error(response.error);
        break;
      case 401:
        toast.error(response.error);
        break;
      case 500:
        toast.error(response.error);
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-emerald-500">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="New Password"
            className="w-full px-4 py-2 border rounded-md"
            required
          />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            className="w-full px-4 py-2 border rounded-md"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}
