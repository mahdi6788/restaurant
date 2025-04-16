import OrderHistory from "@/app/components/customers/OrderHistory";
import { lusitana } from "@/app/lib/fonts";

export default function page() {
  return (
    <div className="w-full mt-44 sm:mt-14">
      <div className="flex items-center justify-between gap-2">
        <h1
          className={`${lusitana.className} text-2xl font-bold text-orange-950`}
        >
          Order History
        </h1>
        {/* TODO: Add Search, Filter and Sort */}
      </div>
        <OrderHistory />
    </div>
  );
}
