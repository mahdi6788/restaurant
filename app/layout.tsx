import CartProvider from "./context/CartContext";
import { FoodProvider } from "./context/FoodContext";
import FoodsProvider from "./context/FoodsContext";
import "../app/styles/globals.css";
import { Inter } from "next/font/google";
import Navbar from "./components/Header";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <CartProvider>
          <FoodsProvider>
            <Navbar />
            <FoodProvider>{children}</FoodProvider>
            <Footer />
          </FoodsProvider>
        </CartProvider>
      </body>
    </html>
  );
}

/// Readonly: to ensure type safety and immutability.
