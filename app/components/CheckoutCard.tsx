"use client";
import { useCart } from "@/hooks/useCart";
import { useOrderButton } from "@/hooks/useOrderButton";
import { CartItem, MenuItem } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "@/i18n/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { CiCircleChevDown, CiCircleChevUp } from "react-icons/ci";
import { IoIosCloseCircle } from "react-icons/io";
import { useTranslations } from "next-intl";

export function CheckoutCard({
  item,
  isMobile,
}: {
  item: CartItem & { menuItem: MenuItem };
  isMobile: boolean;
}) {
  const translate = useTranslations("CheckoutCard")
  const router = useRouter();
  const { quantity, handleAdd, handleDec } = useOrderButton(item.menuItem);
  const { removeFromCart, cartItems } = useCart();

  useEffect(() => {
    cartItems.map((item) => {
      if (!item.menuItem.isAvailable) {
        toast.error(`{${item.menuItem.name} is not available now}`);
        fetch("/api/cart", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cartItemId: item.id }),
        });
        router.push("/");
        router.refresh()
        return null;
      }
    });
  }, [cartItems, router]);

  return (
    <>
      <td className="px-1 py-1 border">
        <Image
          src={item.menuItem.imageUrl ?? "/public/images/logo/LOGO.jpg"}
          alt="Product"
          width={200}
          height={200}
          className="w-10 h-10 rounded-md"
        />
      </td>
      <td className="px-1 py-1 border">{item.menuItem.name}</td>
      <td className="px-1 py-1 border text-center">{item.quantity}</td>
      <td className="px-3 py-3 border flex items-center gap-1">
        <span className="text-sm">AED</span> {item.menuItem.price}
      </td>
      <td className="px-5 py-1 border">
        <div className="flex items-center justify-center ">
          <CiCircleChevDown
            onClick={handleDec}
            className="w-6 h-6 hover:cursor-pointer text-orange-700"
          />
          <div className=" px-1">{quantity}</div>
          <CiCircleChevUp
            onClick={handleAdd}
            className="w-6 h-6 hover:cursor-pointer text-emerald-900 "
          />
        </div>
      </td>
      <td className="py-1 pr-4">
        <button
          onClick={() => removeFromCart(item.id)}
          className={`${isMobile ? "" : "font-medium text-white bg-red-600 rounded-lg p-1"}`}
        >
          {isMobile ? <IoIosCloseCircle size={30} color="red" /> : translate("Remove")}
        </button>
      </td>
    </>
  );
}
