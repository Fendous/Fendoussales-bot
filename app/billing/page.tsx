"use client";
import React, { useEffect, useState } from "react";
import { cancelSubscription } from "@/actions/cancelSubscription";
import { getSubscriptionDetails } from "@/actions/getSubscriptionDetails";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const SubscriptionCancellation = () => {
  const router = useRouter();
  const [subscription, setSubscription] = useState<{
    plan: string;
    next_billing_date: string;
    status: string;
  }>({
    plan: "",
    next_billing_date: "",
    status: "",
  });
  //Fetch subscription details
  useEffect(() => {
    async function getData() {
      const { data, error } = await getSubscriptionDetails();
      if (error) {
        console.error("Error fetching subscription details:", error);
        // toast.error("Failed to fetch subscription details.");
        return;
      }

      setSubscription({
        plan: data?.plan || "-",
        next_billing_date: data?.next_billing_date || "-",
        status: data?.status || "-",
      });
    }
    getData();
  }, []);

  const handleCancelSubscription = async () => {
    const { status, error } = await cancelSubscription();
    if (!error) {
      toast.info("Subscription cancelled succesfully.");
    } else {
      toast.error("Error cancelling subscription.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-xl mt-52 mb-52">
      <h2 className="text-2xl font-semibold mb-4">Subscription and billing</h2>
      <div className="mb-4">
        <p className="text-lg font-medium">Current plan:</p>
        <p className="text-gray-700">
          {subscription?.plan.charAt(0).toUpperCase() +
            subscription?.plan.slice(1)}
        </p>
      </div>

      <div className="mb-4">
        <p className="text-lg font-medium">Status:</p>
        <p
          className={`text-gray-700 ${
            subscription?.status.toLowerCase() === "active"
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {subscription?.status.charAt(0).toUpperCase() +
            subscription?.status.slice(1)}
        </p>
      </div>
      <button
        onClick={() => router.push("/pricing#pricing-tiers")}
        className={`w-full bg-[#CB6CE6] text-white py-2 px-4 mb-2 rounded-lg hover:bg-[#CB6CE6] focus:outline-none focus:ring-2`}
      >
        Upgrade plan
      </button>
      <button
        onClick={handleCancelSubscription}
        disabled={subscription?.status !== "active"}
        className={`w-full  ${
          subscription?.status !== "active"
            ? "bg-gray-300 hover:bg-gray-400"
            : "bg-red-900 hover:bg-red-700 "
        } text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500`}
      >
        Cancel Subscription
      </button>
    </div>
  );
};

export default SubscriptionCancellation;
