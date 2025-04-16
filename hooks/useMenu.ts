"use client";

import { useQuery } from "@tanstack/react-query";

export function useMenu() {
  async function fetchFood() {
    const res = await fetch("/api/foods", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) throw new Error("Failed to fetch menu");
    return res.json();
  }

  const {
    data: menu,
    refetch: menuRefetch,
    isLoading: menuLoading,
  } = useQuery({
    queryKey: ["foods"],
    queryFn: fetchFood,
  });

  return {
    menu,
    menuRefetch,
    menuLoading,
  };
}
