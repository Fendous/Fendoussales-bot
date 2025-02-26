import { exchangeCodeForToken, saveTokens } from "@/lib/integrations/google";
import { NextRequest, NextResponse } from "next/server";

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import { GoogleTokenProps } from "@/lib/integrations/google";

export async function GET(req: NextRequest, res: NextResponse) {
  const session = await getServerSession(authOptions);

  const code = req.nextUrl.searchParams.get("code");
  const error = req.nextUrl.searchParams.get("error");
  console.log("CODE:", code);
  console.log("ERROR:", error);

  if (code) {
    try {
      const tokens = (await exchangeCodeForToken(code)) as GoogleTokenProps; // Exchange code for token
      const dbTokens = {
        scope: tokens.scope,
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
        tokenType: tokens.token_type,
        expiryDate: tokens.expiry_date,
      };
      //Save tokens to dbs (Token's model)
      const savedTokens = await saveTokens("userId", dbTokens);

      return NextResponse.json({ data: "ok" }, { status: 200 });
    } catch (error: any) {
      return NextResponse.json({ error: error.status }, { status: 400 });
    }
  }
  return NextResponse.json({ error: error }, { status: 400 });

  //Return redirect("http://localhost:3000");
}
