"use server";

import User from "@/models/User.model";
import Subscriptions from "@/models/Subscrpitions.model";
import { connect } from "@/db/mongoose";

import Stripe from "stripe";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";

export async function cancelSubscription() {
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

    const subscription_cancel = await stripe.subscriptions.cancel(
      subscription_info.subscription_id
    );

    const update_sub = await Subscriptions.updateOne(
      { user: user._id },
      {
        $set: {
          status: "Inactive",
          next_billing_date: "-",
        },
      }
    );

    return { status: subscription_cancel.status, error: null };
  } catch (error: any) {
    console.log("ERROR CANCELLING SUBSCRIPTION:", error.message);
    return { status: null, error: error.message };
  }
}
