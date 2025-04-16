"use client";

import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MobileBottomNav from "./components/MobileBottomNav";
import { useState } from "react";
import MobileNavbar from "./components/MobileNavbar";

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
      <MobileNavbar isOpen={isOpen} setIsOpen={setIsOpen} />
      {children}
      <MobileBottomNav />
    </QueryClientProvider>
  );
}
