"use server";

import { connect } from "@/db/mongoose";
import User from "@/models/User.model";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import Tokens from "@/models/Tokens.model";

export async function getActiveScopes() {
  await connect();

  const session = await getServerSession(authOptions);
  if (!session) {
    return { user: null, error: "User not logged in" };
  }
  const user_email = session?.user?.email;
  const allTokens = await Tokens.find({ email: user_email });

  let scopes = [];
  if (allTokens.length > 0) {
    scopes = allTokens[0].googleTokens.map((token: any) => token.scope);
  }

  return { scopes: scopes };
}
