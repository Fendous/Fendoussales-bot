"use server";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import { connect } from "@/db/mongoose";

import User from "@/models/User.model";

export async function checkSubscription() {
  await connect();

  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return { plan: null, trialEnded: null, error: "User not logged in" };
    }
    const user_email = session?.user?.email;
    const user = await User.findOne({ email: user_email });
    const trialEnded = user.trialEndDate <= Date.now();

    return {
      plan: user.plan,
      trialEnded: trialEnded,
      error: null,
    };
  } catch (error: any) {
    return { plan: null, trialEnded: null, error: error.message };
  }
}

// no_plan + trial not ended = starter (At registration)
// no_plan + trial ended = redirect to upgrade plan
