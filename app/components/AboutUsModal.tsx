"use client";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { FaInstagram } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";

export default function AboutUsModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean | undefined;
  onClose: () => void;
}) {
  const translate = useTranslations("AboutUsModal");
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-emerald-900 p-6 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{translate("About Us")}</h2>
          <button onClick={onClose}>
            <IoIosCloseCircle size={30} color="red" />
          </button>
        </div>
        <span>
          {translate(
            "We are a team of food lovers who are passionate about providing the best food to our customers"
          )}
        </span>
        <div className="mt-3">
          <h4 className="text-lg font-bold">{translate("Contact Us")}</h4>
          <p>Email: contact@zeyton.com</p>
        </div>
        <div className="mt-3">
          <h4 className="text-lg font-bold">{translate("Follow Us")}</h4>
          <div className="flex space-x-4">
            <Link href="Zeyton-restaraunt-Dubai">
              <FaInstagram />
            </Link>
          </div>
          <p className="text-sm mt-3">
            &copy; {new Date().getFullYear()} ZEYTON
          </p>
        </div>
      </div>
    </div>
  );
}
