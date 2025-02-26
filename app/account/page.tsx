"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getUserInfo } from "@/actions/getUserInfo";

const Account = () => {
  const [user, setUser] = useState<any>({
    name: "-",
    email: "-",
  });

  useEffect(() => {
    async function getData() {
      const { user, error } = await getUserInfo();
      if (!error) {
        setUser(user);
      }
    }
    getData();
  }, []);

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-xl mt-52 mb-52 min-w-[400px]">
      <h2 className="text-2xl font-semibold mb-4">My account</h2>

      <div key={user._id} className="mb-6">
        <div className="mb-4">
          <p className="text-lg font-medium">Name:</p>
          <p className="text-gray-700">{user.name}</p>
        </div>
        <div className="mb-4">
          <p className="text-lg font-medium">Email:</p>
          <p className="text-gray-700">{user.email}</p>
        </div>
      </div>

      <Button
        asChild
        className="w-full bg-[#CB6CE6] text-white py-2 px-4 mb-2 rounded-lg hover:bg-[#CB6CE6] focus:outline-none focus:ring-2"
      >
        <Link href="/forgot-password">Update password</Link>
      </Button>
    </div>
  );
};

export default Account;
