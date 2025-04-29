"use client";

import { ProfileSkeleton } from "@/app/components/skeleton";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function Profile() {
  const translate = useTranslations("Profile")
  const { data: session, status, update } = useSession();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const callback = searchParams.get("callback") ?? "/checkout";
  const message = searchParams.get("message") ?? "";

  const router = useRouter();

  useEffect(() => {
    setName(session?.user?.name ?? "");
    setAddress(session?.user?.address ?? "");
    setPhone(session?.user?.phone ?? "");
    setLoading(status === "authenticated" ? false : true);
  }, [session, status]);

  if (loading) return <ProfileSkeleton />;

  if (!session) {
    router.push("/login");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userId = session?.user?.id;
    try {
      const res = await fetch("/api/users", {
        method: "PATCH",
        body: JSON.stringify({ userId, name, address, phone }),
        headers: { "Content-Type": "application/json" },
      });
      const response = await res.json();
      /// object (res) contains the HTTP status code
      /// response variable contains parsed JSON body error or message
      switch (res.status) {
        case 404:
          toast.error(response.error);
          break;
        case 200:
          toast.success(response.message);
          /// Only trigger on a successful update to avoid redirecting on errors.
          update(session);
          router.refresh();
          if (message) {
            router.push(callback);
          } else {
            router.push("/");
          }
          break;
        case 500:
          toast.error(response.error);
          break;
        default:
          break;
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile");
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md ">
        <h1 className="text-2xl font-bold mb-6 text-center">{translate("Your Profile")}</h1>
        {message && (
          <p className="text-red-500 mb-4 text-center font-extrabold animate-bounce">
            {message}
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {translate("Name")}
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {translate("Delivery Address")}
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {translate("Phone Number")}
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            {translate("Save Profile")}
          </button>
        </form>
      </div>
    </div>
  );
}
