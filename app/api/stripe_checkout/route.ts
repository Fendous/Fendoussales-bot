import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User.model";
import { connect } from "@/db/mongoose";
import Stripe from "stripe";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";

let STRIPE_KEY: string;
if (process.env.ENVIRONMENT === "local") {
  STRIPE_KEY = process.env.STRIPE_TEST_SECRET_KEY! as string;
} else {
  STRIPE_KEY = process.env.STRIPE_LIVE_SECRET_KEY! as string;
}
const stripe = new Stripe(STRIPE_KEY);

let event: Stripe.Event;

const BASE_URL = process.env.NEXTAUTH_URL as string;
const TEST_PRICE_ID = "price_1PkjhCIwHQVDmdpl9tgcSHnt";
const STARTER_PRICE_ID: string = "price_1Owj8NJ5TBstiEXyh37PuRzs";
const ADVANCED_PRICE_ID: string = "price_1Po0I5J5TBstiEXyX9eeU4Ap";

export async function POST(request: NextRequest) {
  await connect();
  const session = await getServerSession(authOptions);
  const user_email = session?.user?.email;
  const user = await User.findOne({ email: user_email });

  const { plan } = await request.json();
  let PRICE_ID;

  if (process.env.ENVIRONMENT === "local") {
    PRICE_ID = TEST_PRICE_ID;
  } else {
    PRICE_ID =
      plan === "starter"
        ? STARTER_PRICE_ID
        : plan === "advanced"
        ? ADVANCED_PRICE_ID
        : null; // Add CUSTOM_PRICE_ID
  }

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [{ price: PRICE_ID || STARTER_PRICE_ID, quantity: 1 }],
      mode: "subscription",
      metadata: {
        fendous_user_email: user_email as string,
        plan: plan,
        app: "FENDOUS_AI",
      },
      success_url: `${BASE_URL}/aichat`,
      cancel_url: `${BASE_URL}/pricing`,
    });

    return NextResponse.json(
      {
        checkout_url: session?.url,
        error: null,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.log("STRIPE ERROR:", error.message);
    return NextResponse.json(
      {
        checkout_url: null,
        error: error.message,
      },
      { status: error.status }
    );
  }
}
