import PricePackage from "@/components/PricePackage";
import PricingPage from "@/components/PricingPage";
import React from "react";

const Page = () => {
  return (
    <div>
      <div className="">Trial period expired</div>
      <PricePackage />
      <PricingPage />
    </div>
  );
};

export default Page;
