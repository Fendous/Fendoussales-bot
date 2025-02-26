import { CircleDollarSign, Blocks, UserRound } from "lucide-react";
import Link from "next/link";
import React from "react";

const Sidenav = () => {
  return (
    <div className="fixed flex flex-col gap-6 text-white left-6 top-1/2 transform -translate-y-1/2 z-50">
      <Link
        href="/integrations"
        className="group flex items-center hover:text-[#CB6CE6] ease-in-out"
      >
        <Blocks size={32} color="#CB6CE6" />
        <span className="ml-2 hidden group-hover:inline-block">
          Integrations
        </span>
      </Link>
      <Link
        href="/billing"
        className="group flex items-center hover:text-[#CB6CE6] ease-in-out"
      >
        <CircleDollarSign size={32} color="#CB6CE6" />
        <span className="ml-2 hidden group-hover:inline-block">Billing</span>
      </Link>
      <Link
        href="/account"
        className="group flex items-center hover:text-[#CB6CE6] ease-in-out"
      >
        <UserRound size={32} color="#CB6CE6" />
        <span className="ml-2 hidden group-hover:inline-block">Account</span>
      </Link>
    </div>
  );
};

export default Sidenav;
