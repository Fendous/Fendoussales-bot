import User from "@/models/User.model";
import Subscriptions from "@/models/Subscrpitions.model";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/db/mongoose";
import Stripe from "stripe";

import { sendEmail } from "@/lib/services/email";

let STRIPE_KEY: string;
let ENDPOINT_SECRET: string;

if (process.env.ENVIRONMENT === "local") {
  STRIPE_KEY = process.env.STRIPE_TEST_SECRET_KEY! as string;
  ENDPOINT_SECRET = process.env.TEST_ENDPOINT_SECRET! as string;
} else {
  STRIPE_KEY = process.env.STRIPE_LIVE_SECRET_KEY! as string;
  ENDPOINT_SECRET = process.env.LIVE_ENDPOINT_SECRET! as string;
}

const stripe = new Stripe(STRIPE_KEY);
let event: Stripe.Event;

export async function POST(request: NextRequest): Promise<NextResponse> {
  // Check event type
  // Get user and update plan
  // Send email
  await connect();
  // const session = await getServerSession(authOptions);
  // const user_email = session?.user?.email as string;

  try {
    const payload = await request.text();

    const sig = request.headers.get("Stripe-Signature") as string;
    event = stripe.webhooks.constructEvent(payload, sig, ENDPOINT_SECRET);

    console.log("EVENT TYPE:", event.type);

    if (event.type === "invoice.payment_succeeded") {
      const data = JSON.parse(JSON.stringify(event.data.object));
      console.log("INVOICE URL:", data.hosted_invoice_url);
    }

    if (event.type === "checkout.session.completed") {
      const data = JSON.parse(JSON.stringify(event.data.object));
      const metadata = data.metadata;

      const user = await User.findOne({ email: metadata.fendous_user_email });

      // const invoice = await stripe.invoices.retrieve(data.invoice);
      // console.log("DATA:", data);
      const new_plan =
        metadata.plan.trim().toLowerCase() === "advanced"
          ? "advanced"
          : "starter";

      //     await sendEmail({
      //       from: { email: "support@fendousai.com", name: "FendousAI" },
      //       to: [user.email],
      //       replyTo: { email: "support@fendousai.com", name: "FendousAI" },
      //       subject: "FENDOUS PLAN UPGRADE",
      //       html: `<!DOCTYPE html>
      //     <html lang="en">
      // <head>
      //   <meta charset="UTF-8" />
      //   <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      //   <title>Payment Upgrade Confirmation</title>
      //   <style>
      //     body {
      //       font-family: Arial, sans-serif;
      //       background-color: #f4f4f4;
      //       margin: 0;
      //       padding: 0;
      //     }
      //     .container {
      //       width: 80%;
      //       margin: 0 auto;
      //       background-color: #ffffff;
      //       padding: 20px;
      //       border-radius: 8px;
      //       box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      //       text-align: center;
      //     }
      //     .logo {
      //       width: 150px;
      //       margin: 0 auto 20px;
      //     }
      //     h1 {
      //       color: #333333;
      //     }
      //     p {
      //       font-size: 16px;
      //       color: #666666;
      //       line-height: 1.5;
      //     }
      //     .button {
      //       display: inline-block;
      //       padding: 10px 20px;
      //       font-size: 16px;
      //       color: #ffffff;
      //       background-color: #007bff;
      //       border-radius: 5px;
      //       text-decoration: none;
      //       margin-top: 20px;
      //     }
      //     .button:hover {
      //       background-color: #0056b3;
      //     }
      //   </style>
      // </head>
      // <body>
      //   <div class="container">
      //     <img
      //       src="cid:0123456789"
      //       alt="Company Logo"
      //       class="logo"
      //     />
      //     <h1>FendousAI Plan Upgrade</h1>
      //     <p>Dear ${user.name},</p>
      //     <p>
      //       Thank you for upgrading your plan to <span style="font-weight: bold;">${new_plan}</span> We have successfully processed your
      //       payment and updated your subscription.
      //     </p>

      //     <p>
      //       If you have any questions or need further assistance, feel free to
      //       contact our support team.
      //     </p>
      //     <p>Best regards,<br />FendousAI Team</p>
      //   </div>
      // </body>
      //         </html>`,
      //       text: "Successfully upgraded fendousAI plan",
      //     });

      const res = await User.findOneAndUpdate(
        { email: metadata.fendous_user_email },
        { plan: new_plan },
        { new: true }
      );

      const sub_res = await Subscriptions.findOneAndUpdate(
        { user: user._id },
        {
          $set: {
            subscription_id: data.subscription,
            plan: new_plan,
            status: "active",
          },
        },
        { new: true, upsert: true }
      );
    }
  } catch (error: any) {
    console.log("ERROR GETTING PAYLOAD:", error.message);
  }

  return NextResponse.json({ data: "success" });
}
