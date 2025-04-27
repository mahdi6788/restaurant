import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import { IoIosCloseCircle } from "react-icons/io";
import Button from "./ui/Button";
import { useTranslations } from "next-intl";

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LogoutModal({ isOpen, onClose }: CartModalProps) {
  const translate = useTranslations("LogoutModal");

  if (!isOpen) return null;

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    redirect("/");
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-emerald-500 p-6 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">
          {translate("Are you sure you want to sign out?")}
          </h2>
          <button onClick={onClose}>
            <IoIosCloseCircle size={30} color="red" />
          </button>
        </div>
        <form action={handleSignOut}>
          <Button type="submit">
          {translate("Sign Out")}
          </Button>
        </form>
      </div>
    </div>
  );
}
