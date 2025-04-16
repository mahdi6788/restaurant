/*
  Using nested layouts to handle conditional rendering (e.g., header/footer)
*/

import Header from "../components/Header";
import Footer from "../components/Footer";

export default function WithHeaderFooter({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
