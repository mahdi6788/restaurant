import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <header className="fixed top-1.5 -left-2.5 z-50 ">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link href="/">
            <Image
              src="/images/logo/LOGO.jpg"
              width={85.6}
              height={80}
              alt="Zeyton"
              className=" opacity-80 rounded-full "
              priority // Add this to prioritize loading
            />
          </Link>
        </div>
      </div>
    </header>
  );
}
