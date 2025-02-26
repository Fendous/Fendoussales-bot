import FormSection from "@/components/FormSection";
import Hero from "@/components/Hero";
import Featured from "@/components/Featured";
import { cookies } from "next/headers";
import Script from "next/script";

export default async function Home({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const cookieStore = cookies();
  const theme = (await cookieStore).get("theme");
  const i18nNamespaces = ["home"];

  return (
    <div className="">
      <Script
        src={"//cdn.cookie-script.com/s/6acf3e14ec60b0517b534b83ae5e6c39.js"}
      ></Script>

      <Hero />
      <FormSection />
      <Featured />
    </div>
  );
}
