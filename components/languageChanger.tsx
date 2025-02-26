"use client";

import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

import { ChangeEvent } from "react";

export default function LanguageChanger() {
  const router = useRouter();
  const currentPathname = usePathname();

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;

    // set cookie for next-i18n-router
    const days = 30;
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `NEXT_LOCALE=${newLocale};expires=${date.toUTCString()};path=/`;

    // redirect to the new locale path

    router.refresh();
  };

  return (
    <select
      className="bg-gray-300 text-xs font-semibold rounded"
      onChange={handleChange}
    >
      <option className="text-black" value="en">
        EN
      </option>
      <option className="text-black" value="da">
        DA
      </option>
    </select>
  );
}
