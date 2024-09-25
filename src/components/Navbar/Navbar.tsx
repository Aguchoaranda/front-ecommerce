"use client";
import { IUserSession } from "@/interfaces/Card.types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const Navbar = () => {
  const pathname = usePathname();
  const [userData, setUserData] = useState<IUserSession>();

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) { // controlando que no es undifined y tambien que existe window local storage
      const userData = JSON.parse(localStorage.getItem("userSession")!); // no sera null
      setUserData(userData);
    }
  }, [pathname]);

  return (
    <header className="mt-4 mx-auto w-full max-w-screen-md border border-gray-100 bg-white/80 py-3 shadow backdrop-blur-lg md:rounded-3xl lg:max-w-screen-lg">
      <div className="px-4">
        <div className="flex items-center justify-between">
          <div className="flex shrink-0 sm:w-1/3">
            <Link aria-current="page" className="flex items-center" href="/">
              <img
                className="h-6 sm:h-7"
                src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
                alt=""
              />
              <p className="sr-only">Website Title</p>
            </Link>
          </div>

          <div className="flex items-center justify-center sm:gap-5 sm:w-1/3">
            <Link
              aria-current="page"
              className="inline-block rounded-lg px-2 py-1 text-xs sm:text-sm font-medium text-gray-900 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900"
              href="#"
            >
              Iphone
            </Link>
            <Link
              className="inline-block rounded-lg px-2 py-1 text-xs sm:text-sm font-medium text-gray-900 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900"
              href="/dashboard/orders"
            >
              Orders
            </Link>
            <Link
              className="inline-block rounded-lg px-2 py-1 text-xs sm:text-sm font-medium text-gray-900 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900"
              href="#"
            >
              Laptop
            </Link>
            <Link
              className="inline-block rounded-lg px-2 py-1 text-xs sm:text-sm font-medium text-gray-900 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900"
              href="#"
            >
              Phones
            </Link>
          </div>
          {userData?.user.email ? (
            <div className="flex items-center justify-end gap-1 sm:gap-3 sm:w-1/3">
              <Link
                className="inline-flex items-center justify-center rounded-xl bg-white px-3 py-2 text-xs sm:text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition-all duration-150 hover:bg-gray-50"
                href="/dashboard"
              >
                Profile
              </Link>
              <Link
                className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-3 py-2 text-xs sm:text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-500"
                href="/cart"
              >
                Cart
              </Link>
            </div>
          ) : (
            <div className="flex items-center justify-end gap-1 sm:gap-3 sm:w-1/3">
              <Link
                className="inline-flex items-center justify-center rounded-xl bg-white px-3 py-2 text-xs sm:text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition-all duration-150 hover:bg-gray-50"
                href="/register"
              >
                Register
              </Link>
              <Link
                className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-3 py-2 text-xs sm:text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-500"
                href="/login"
              >
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;


