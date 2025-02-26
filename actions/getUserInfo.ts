"use server";
import User from "@/models/User.model";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import { connect } from "@/db/mongoose";

// TODO: Refactor this action with the checkSubscription action since they are very similar
export async function getUserInfo() {
  await connect();
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return { user: null, error: "User not logged in" };
    }
    const user_email = session?.user?.email;
    const user = await User.findOne({ email: user_email });

    return {
      user: { name: user.name, email: user.email },
      error: null,
    };
  } catch (error: any) {
    return { user: null, error };
  }
}
