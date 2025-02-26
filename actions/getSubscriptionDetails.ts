"use server";

import User from "@/models/User.model";
import Subscriptions from "@/models/Subscrpitions.model";
import { connect } from "@/db/mongoose";

import Stripe from "stripe";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";

export async function getSubscriptionDetails() {
  await connect();
  let STRIPE_KEY: string;
  if (process.env.ENVIRONMENT === "local") {
    STRIPE_KEY = process.env.STRIPE_TEST_SECRET_KEY! as string;
  } else {
    STRIPE_KEY = process.env.STRIPE_LIVE_SECRET_KEY! as string;
  }
  const stripe = new Stripe(STRIPE_KEY);

  const session = await getServerSession(authOptions);
  const user_email = session?.user?.email;
  try {
    const user: any = await User.findOne({ email: user_email });
    if (!user) {
      return { data: null, error: "User not found" };
    }

    const subscription_info = await Subscriptions.findOne({ user: user._id });

    return {
      data: {
        plan: user.plan,
        status: subscription_info?.status,
        next_billing_date: subscription_info?.next_billing_date,
      },
      error: null,
    };
  } catch (error: any) {
    console.log("ERROR GETTING SUBSCRIPTIONS:", error);
    return { status: null, error: error.message };
  }
}
