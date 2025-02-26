"use client";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { authNavigation, navigation } from "@/constant";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import LanguageChanger from "./languageChanger";

export default function Example() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div>
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          className="flex items-center justify-between lg:px-20"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-6 p-1.5">
              <span className="sr-only">Fendous</span>
              <Image
                height={100}
                width={150}
                src="/logo.png"
                alt="logo"
                priority
              />
            </Link>
          </div>

          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">menu</span>
              <Bars3Icon className="h-6 w-6 text-white" aria-hidden="true" />
            </button>
          </div>

          {/* RIGHT NAV LINKS */}
          <div className="flex gap-28 mr-2 mt-2">
            <div className="hidden lg:flex lg:gap-x-12">
              {status === "authenticated"
                ? authNavigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-sm font-semibold leading-6 text-gray-200 hover:text-[#CB6CE6]"
                    >
                      {item.name}
                    </Link>
                  ))
                : navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-sm font-semibold leading-6 text-gray-200 hover:text-[#CB6CE6]"
                    >
                      {item.name}
                    </Link>
                  ))}

              <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                {status === "authenticated" ? (
                  <button
                    onClick={async () => {
                      await signOut();
                      router.push("/");
                      router.refresh();
                    }}
                    className="text-sm font-semibold leading-6 text-gray-200 hover:text-[#CB6CE6]"
                  >
                    Log out
                  </button>
                ) : (
                  <Link
                    href={"/log-in"}
                    className="text-sm font-semibold leading-6 text-gray-200 hover:text-[#CB6CE6]"
                  >
                    Login
                  </Link>
                )}
              </div>
              <LanguageChanger />
            </div>
          </div>
        </nav>
        <Dialog
          as="div"
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 text-white w-full overflow-y-auto bg-[#0d0f50] px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Fendous</span>
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close</span>
                <XMarkIcon
                  className="h-6 w-9 mt-10 text-white"
                  aria-hidden="true"
                />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-200 hover:bg-indigo-600"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div className="py-6">
                  {status === "authenticated" ? (
                    <Link
                      href={status === "authenticated" ? "/log-in" : "/log-in"}
                      onClick={async () => {
                        await signOut();
                        router.push("/");
                      }}
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-200 hover:bg-indigo-600"
                    >
                      Log out
                    </Link>
                  ) : (
                    <Link
                      href={"/log-in"}
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-200 hover:bg-indigo-600"
                    >
                      Log in
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
    </div>
  );
}
