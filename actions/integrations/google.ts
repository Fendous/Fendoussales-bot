"use server";

import {
  getAuthUrl,
  exchangeCodeForToken,
  GoogleTokenProps,
  saveTokens,
  googleDriveUpload,
} from "@/lib/integrations/google";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import User from "@/models/User.model";
import { connect } from "@/db/mongoose";

export async function generateAuthUrl(scope: string | null) {
  if (!scope) {
    return { url: null, error: "Scope is required" };
  }

  const url = await getAuthUrl(scope);
  return { url: url, error: null };
}

export async function saveAuthToken(code: string) {
  await connect();
  const session = await getServerSession(authOptions);
  const user_email = session?.user?.email;
  const user = await User.findOne({ email: user_email });

  try {
    const tokens = (await exchangeCodeForToken(code)) as GoogleTokenProps;
    //Save tokens to dbs (Token's model)
    const dbTokens = {
      scope: tokens.scope,
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
      tokenType: tokens.token_type,
      expiryDate: tokens.expiry_date,
    };
    const savedTokens = await saveTokens(user._id, dbTokens);

    return { data: savedTokens, error: null };
  } catch (error: any) {
    console.log("ERROR SAVING TOKENS:", error);
    return { data: null, error: error.message };
  }
}

export async function googleDrive(form: FormData) {
  await connect();
  const session = await getServerSession(authOptions);
  const user_email = session?.user?.email;
  const user = await User.findOne({ email: user_email });
  const file = form.get("file") as File;

  const options = {
    name: file.name,
    mimeType: file.type,
    body: file.stream(),
  };
  await googleDriveUpload(user._id, options);
}
