"use server";

import User from "@/models/User.model";
import { connect } from "@/db/mongoose";

export async function checkEmailVerifiedOrUserExists(email: string) {
  await connect();
  //@ts-ignore
  const user = await User.findOne({ email });
  if (!user) {
    return { exists: false, verified: null };
  }

  return { exists: true, verified: user.emailVerified };
}
