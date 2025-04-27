import { FaInstagram } from "react-icons/fa";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className=" hidden sm:flex p-1 text-black bg-gray-200 bg-opacity-10 w-full bg-transparent backdrop-blur-md z-50 ">
      <div className="container mx-auto px-4">
        <div className="grid sm:grid-cols-3 gap-8">
          <div className="space-y-1">
            <h4 className="text-lg font-bold">About Us</h4>
            <p>
              We are a team of food lovers who are passionate about providing
              the best food to our customers.
            </p>
          </div>
          <div className="space-y-1">
            <h4 className="text-lg font-bold">Contact Us</h4>
            <p>Email: contact@zeyton.com</p>
          </div>
          <div className="space-y-1">
            <h4 className="text-lg font-bold">Follow Us</h4>
            <div className="flex">
              <Link href="/">
                <FaInstagram />
              </Link>
            </div>
            <p className="text-sm">&copy; {new Date().getFullYear()} ZEYTON</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
