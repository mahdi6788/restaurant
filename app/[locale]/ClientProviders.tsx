"use client";

import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import MobileNavbar from "../components/MobileNavbar";
import OrderProvider from "../context/OrderContext";
import MobileBottomNav from "../components/MobileBottomNav";
import { ThemeInitializer } from "../store/themeStore";

const queryClient = new QueryClient();

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <ThemeInitializer />
        <MobileNavbar isOpen={isOpen} setIsOpen={setIsOpen} />
        <OrderProvider>{children}</OrderProvider>
      <MobileBottomNav />
    </QueryClientProvider>
  );
}
