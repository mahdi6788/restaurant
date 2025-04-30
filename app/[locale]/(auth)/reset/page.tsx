"use client";

import { Link } from "@/i18n/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");


  const handleEmail = async (e: React.FormEvent) => {
    e.preventDefault();

    const query = new URLSearchParams({
      email
    }).toString()

    const res = await fetch(`/api/users/single-user?${query}`,{
      method: "GET",
      headers:{"Content-Type" : "application/json"}
    })
    const existingUser = await res.json()
    if(!existingUser) {
      toast.error("There is not user with this email!")
      return null
    }

    const response = await fetch("/api/auth/passResetToken",{
      method: "POST",
      body: JSON.stringify({email}),
      headers: {"Content-Type" : "application/json"}
    })

    const passResetResponse = await response.json()

    switch (response.status) {
      case 200:
        toast.success(passResetResponse.message)
        break;
      case 500:
        toast.error(passResetResponse.error)
        break
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-emerald-900">
      <div className="bg-white dark:dark-mode p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Reset Password</h1>
        <form onSubmit={handleEmail}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              value={email}
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@example.com"
              className="w-full px-4 py-2 border rounded-md"
              required
            />
          <div className="flex flex-col items-center">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 mt-3 rounded-md"
            >
              Send email
            </button>
            <Link
              href="/login"
              className="text-sm hover:text-blue-700 hover:cursor-pointer mt-5"
            >
              Back to login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
