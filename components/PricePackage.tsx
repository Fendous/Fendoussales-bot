"use client";

import { pricingLists } from "@/constant";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { useSession } from "next-auth/react";
import { entreprisePlanRequest } from "@/actions/enterprisePlanRequest";

const PricePackage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [loadingPlan, setLoadingPlan] = useState<String | null>(null);

  async function handlePayment(plan: string) {
    setLoadingPlan(plan);

    if (status !== "authenticated") {
      toast.info("Please login to make a subscription.");
      setLoadingPlan(null);
      return;
    }

    try {
      const res = await fetch("/api/stripe_checkout", {
        method: "POST",
        body: JSON.stringify({
          plan: plan,
        }),
      });

      const { checkout_url, error } = await res.json();
      if (error) {
        // Alert error to user
        toast.error("Payment attempt failed.");
      }
      if (checkout_url) {
        router.push(checkout_url);
      }
    } catch (error: any) {
      console.log("Error making subscription");
      toast.error("Error making subscription.");
    } finally {
      setLoadingPlan(null);
    }
  }

  async function handleEntreprise(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);
    e.currentTarget.reset();
    await entreprisePlanRequest(form);
    toast.success(
      "Thank your for your interest in entreprise plan, we will reach out to you to discuss your requirements"
    );
  }

  return (
    <section>
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-md text-center mb-10 lg:mb-12 ">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-200">
            Get access to exclusive features and benefits with our subscription
            plans.
          </h2>
          <p className="mb-5 font-light text-gray-400 sm:text-xl ">
            Unlock exclusive features and content, backed by priority support
            from our expert team. Streamline your experience, save time, and cut
            costs through task automation. Elevate your interaction with our
            chatbot – your gateway to efficiency and personalized assistance.
          </p>
        </div>

        <div
          id="pricing-tiers"
          className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6  xl:gap-10 lg:space-y-0"
        >
          {pricingLists.map((list, index) => {
            const Icon = list.icon;
            const MoneyIcon = list.moneyIcon;
            return (
              <div
                key={index}
                className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-300 rounded-lg border border-gray-100 hover:bg-[#0f026e] shadow hover:border-indigo-400 transition hover:shadow-indigo-400/30 hover:shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px] dark:border-gray-600 xl:p-8 dark:text-white"
              >
                <h3 className="mb-4 text-2xl font-extrabold">{list.heading}</h3>
                <p className="font-light text-gray-200 sm:text-lg ">
                  {list.explain}
                </p>
                <div className="flex justify-center items-baseline my-8">
                  <span className="mr-2 text-5xl flex font-extrabold text-rose-600">
                    <div className="text-yellow-300">
                      <MoneyIcon />
                    </div>
                    {list.price}
                  </span>
                  <span className="text-gray-200 ">/month</span>
                </div>

                <ul role="list" className="mb-8 space-y-4 text-left">
                  {[
                    list.firstList,
                    list.secondList,
                    list.thirdList,
                    list.fourthList,
                    list.fifthList,
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center space-x-3">
                      <div className="text-green-300">
                        <Icon size={25} />
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                  <button
                    onClick={() => handlePayment(list.plan)}
                    className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    disabled={loadingPlan === list.plan} // Disable button during loading
                  >
                    {loadingPlan === list.plan ? (
                      <div className="w-5 h-5 rounded-full animate-spin border-2 border-solid border-gray border-t-transparent"></div>
                    ) : (
                      "Getting started"
                    )}
                  </button>
                </div>
              </div>
            );
          })}

          <div className="flex flex-col p-2 mx-auto max-w-lg text-center  text-gray-300 hover:bg-[#0f026e]  rounded-lg border border-gray-100 shadow hover:border-indigo-400 transition  hover:shadow-indigo-400/30 hover:shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px] dark:border-gray-600 xl:p-8  dark:text-white">
              <h3 className="text-2xl font-extrabold">Enterprise</h3>
            <h3 className="text-xl font-medium mt-3">Contact Us</h3>
            <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">

              <form
                onSubmit={handleEntreprise}
                className="mx-auto mb-0 max-w-md space-y-4 text-left"
              >
                <div>
                  <label htmlFor="contact_name" className="text-white">
                    Contact name <span className="text-red-500">*</span>
                  </label>

                  <div className="relative">
                    <input
                      required
                      type="text"
                      name="contact_name"
                      className="w-full text-black rounded-lg border-gray-200 p-2 pe-12 text-sm shadow-sm"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="business_name" className="text-white">
                    Business name <span className="text-red-500">*</span>
                  </label>

                  <div className="relative">
                    <input
                      required
                      type="text"
                      name="business_name"
                      className="w-full text-black rounded-lg border-gray-200 p-2 pe-12 text-sm shadow-sm"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="text-white">
                    Business Email <span className="text-red-500">*</span>
                  </label>

                  <div className="relative">
                    <input
                      required
                      type="email"
                      name="email"
                      className="w-full text-black rounded-lg border-gray-200 p-2 pe-12 text-sm shadow-sm"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="phone" className="text-white">
                    Phone number <span className="text-red-500">*</span>
                  </label>

                  <div className="relative">
                    <input
                      required
                      type="text"
                      name="phone"
                      className="w-full text-black rounded-lg border-gray-200 p-2 pe-12 text-sm shadow-sm"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="title" className="text-white">
                    Title <span className="text-red-500">*</span>
                  </label>

                  <div className="relative">
                    <input
                      required
                      type="text"
                      name="title"
                      className="w-full text-black rounded-lg border-gray-200 p-2 pe-12 text-sm shadow-sm"
                    />
                  </div>
                </div>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                  <button className="rounded-md w-ful bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricePackage;
