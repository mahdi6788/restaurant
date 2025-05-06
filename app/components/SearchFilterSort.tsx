"use client";
import { useTranslations } from "next-intl";
import { useOrders } from "../store/orderStore";

export default function SearchFilterSort() {
  const translate = useTranslations("SearchFilterSort")
  const { search, setSearch, sortby, setSortby } = useOrders();

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      {/* Search */}
      <input
        type="text"
        placeholder={translate("Search by name or order ID")}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full sm:w-1/2 p-2 rounded-lg "
      />
      {/* Sort */}
      <div>
        {translate("Sort by")}
        <select
          className="rounded-lg p-2 w-full sm:w-fit"
          name="sortby"
          id="sortby"
          value={sortby}
          onChange={(e) => setSortby(e.target.value)}
        >
          <option value="createdAt-desc">{translate("Order Date: Newest First")}</option>
          <option value="createdAt-asc">{translate("Order Date: Oldest First")}</option>
        </select>
      </div>
    </div>
  );
}
