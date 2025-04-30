"use client";

import { useState } from "react";
import { useRouter } from "@/i18n/navigation";
import toast from "react-hot-toast";
import { registerFormSchema } from "@/app/lib/zod";
import { Link } from "@/i18n/navigation";
import { useSession } from "next-auth/react";

export default function RegisterForm() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const { data: session } = useSession();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);

    const registerData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      confirmPassword: formData.get("confirmPassword") as string,
      address: formData.get("address") as string,
      phone: formData.get("phone") as string,
    };

    const { success, data, error } = registerFormSchema.safeParse(registerData);

    if (!success) {
      console.error(error?.message);
      toast.error("Invalid form data");
      return null;
    }
    const { name, email, password, confirmPassword, address, phone } = data;

    try {
      setIsPending(true);
      if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }

      /// create user in database
      const response = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          password,
          address,
          phone,
        }),
        headers: { "Content-Type": "application/json" },
      });
      /// check if user was created successfully
      if (!response.ok) {
        toast.error("Something went wrong");
      } else {
        const verificationToken = await fetch("/api/auth/verificationToken", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });

        if (!verificationToken.ok) {
          console.error("Verification was not send");
          toast.error("Something went wrong");
          return null;
        }
        const verificationTokenResponse = await verificationToken.json();

        toast.success(verificationTokenResponse.message);

        router.refresh();
        router.push("/login");
      }

      /// auto-sign-in after registration
      // const signInResult = await signIn("credentials", {
      //   email,
      //   password,
      //   redirect: false,
      // });
      // console.log("SignIn Result:", signInResult);

      // if (signInResult?.error) {
      //   throw new Error("Sign-in failed: " + signInResult?.error);
      // }
      // if (!signInResult?.ok) {
      //   throw new Error("Sign-in did not complete successfully");
      // }

      // router.push("/"); /// redirect to home page
    } catch (error) {
      console.error(error);
      toast.error("Failed to create user" + error);
    } finally {
      setIsPending(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center">
      {session ? (
        <div className="bg-white dark:dark-mode p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center">
            You registered
          </h1>
        </div>
      ) : (
        <div className="bg-white dark:dark-mode p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center">
            Please sign up to continue
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              name="address"
              placeholder="Delivery address"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="phone"
              name="phone"
              placeholder="Phone"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
            >
              {isPending ? "Signing up..." : "Sign up"}
            </button>
          </form>

          <p className="flex items-center justify-center">Or</p>
          <div className="w-full bg-green-500 text-white text-center py-2 rounded-md hover:bg-green-600 mb-4">
            <Link href="/login">Sign in with Google</Link>
          </div>
          <Link
            href="/login"
            className="flex items-center justify-center text-blue-950 hover:text-blue-500 hover:cursor-pointer"
          >
            I already have an account
          </Link>
        </div>
      )}
    </div>
  );
}
