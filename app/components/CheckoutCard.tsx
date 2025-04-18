import { useCart } from "@/hooks/useCart";
import { useOrderButton } from "@/hooks/useOrderButton";
import { CartItem, MenuItem } from "@prisma/client";
import Image from "next/image";
import { CiCircleChevDown, CiCircleChevUp } from "react-icons/ci";
import { IoIosCloseCircle } from "react-icons/io";

export function CheckoutCard({
  item,
  isMobile,
}: {
  item: CartItem & { menuItem: MenuItem };
  isMobile: boolean;
}) {
  const { quantity, handleAdd, handleDec } = useOrderButton(item.menuItem);
  const { removeFromCart } = useCart();

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
      <td className="px-3 py-3 border flex items-center gap-1"><span className="text-sm">AED</span> {item.menuItem.price}</td>
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
          {isMobile ? <IoIosCloseCircle size={30} color="red" /> : "Remove"}
        </button>
      </td>
    </>
  );
}
