"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("encodedCallbackUrl") || "/";
  const message = searchParams.get("message") || "";

  const { data: session } = useSession();

  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked" || "Configuration"
      ? "Email already is in use with different provider"
      : "";

  //// Google SignIn
  const handleGoogleSignIn = async () => {
    try {
      const result = await signIn("google", {
        callbackUrl,
        redirect: false,
      });
      if (result?.error) {
        toast.error(result.error + urlError);
      }
    } catch (error) {
      console.error("Sign-in error:", error);
      toast.error("Unexpected error during Google sign-in");
    }
  };

  //// Credential SignIn
  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    const existingUser = await fetch("/api/users/single-user", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: { "Content-Type": "application/json" },
    });

    const existingUserResponse = await existingUser.json();

    if (!existingUserResponse) {
      toast.error("No user found with this email");
      return null;
    }
    if (!existingUserResponse?.emailVerified) {
      const verificationToken = await fetch("/api/auth/verificationToken", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const verificationTokenResponse = await verificationToken.json();

      switch (verificationToken.status) {
        case 201:
          toast.success(verificationTokenResponse.message);
          break;
        case 500:
          toast.error("Something went wrong");
          break;
        default:
          break;
      }
    } else {
      /// check 2FA:
      if (
        existingUserResponse.email &&
        existingUserResponse.isTwoFactorEnabled
      ) {
        if (twoFactorCode) {
          await fetch("/api/auth/getTwoFactorToken", {
            method: "POST",
            body: JSON.stringify({ email: existingUserResponse.email }),
            headers: { "Content-Type": "application/json" },
          });


          await fetch('/api/auth/twoFactorConfirmation',{
            method: "POST",
            body: JSON.stringify({userId: existingUserResponse.id}),
            headers:{"Content-Type" : "application/json"}
          })

        }
        const twoFactorToken = await fetch("/api/auth/generateTwoFactorToken", {
          method: "POST",
          body: JSON.stringify({ email: existingUserResponse.email }),
          headers: { "Content-Type": "application/json" },
        });
        const twoFactorTokenResponse = await twoFactorToken.json();
        switch (twoFactorToken.status) {
          case 201:
            toast.success(twoFactorTokenResponse.message);
            setShowTwoFactor(true);
          case 500:
            toast.error("Something went wrong");
            break;
          default:
            break;
        }
      }
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
        callbackUrl,
      });

      if (res?.error) {
        console.error(res?.error);
        toast.error("Failed to sign in");
      } else {
        toast.success("Signed in successfully");
        router.push(callbackUrl);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      {session ? (
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center">
            You are logged in
          </h1>
        </div>
      ) : (
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center">
            Login to Your Account
          </h1>
          {message && (
            <p className="text-blue-500 mb-4 text-center">{message}</p>
          )}
          <button
            onClick={handleGoogleSignIn}
            className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 mb-4"
          >
            Sign in with Google
          </button>
          <form onSubmit={handleEmailSignIn} className="space-y-4">
            {!showTwoFactor ? (
              <>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <Link
                  href="/reset"
                  className="text-blue-950 text-sm w-32 hover:text-blue-600 hover:border-b-2 hover:border-b-blue-800 hover:cursor-pointer pt-2"
                >
                  Forgot password?
                </Link>
              </>
            ) : (
              <input
                value={twoFactorCode}
                onChange={(e) => setTwoFactorCode(e.target.value)}
                placeholder="Two Factor Token"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            )}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
            >
              {showTwoFactor ? "Confirm" : "Sign in"}
            </button>
          </form>
          <div className="text-center mt-4">
            Do not have an account?{" "}
            <Link href="/register" className="text-blue-500 hover:underline">
              Register here
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
