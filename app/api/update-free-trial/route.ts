import { sendEmail } from "@/lib/services/email";
import User from "@/models/User.model";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/db/mongoose";

export async function POST(req: NextRequest) {
  // Fetch users whose free trial period is expiring the next day and also expired
  // If expiring the next day, send reminder email
  // If expired changed plan status to "no_plan"
  await connect();
  const now = new Date();
  const nextDay = new Date(now);
  nextDay.setDate(now.getDate() + 1);

  // Users whose trial period is expiring the next day
  const expiringSoonUsers = await User.find({
    trialEndDate: {
      $gte: nextDay,
      $lt: new Date(nextDay.getTime() + 24 * 60 * 60 * 1000), // Next day range
    },
  });

  //  Ussers whose trial period has expired
  const expiredUsers = await User.find({
    trialEndDate: { $lt: now, plan: "no_plan" },
  });

  //   expiringSoonUsers.push(
  //     {
  //       name: "ZAAKE ENOCK",
  //       email: "zaakeenock@gmail.com",
  //     },
  //     {
  //       name: "ENOCK ZAAKE",
  //       email: "enockzaake@gmail.com",
  //     }
  //   );
  // Send reminder emails

  for (const user of expiringSoonUsers) {
    try {
      await sendEmail({
        from: "authentication@fendous.eu",
        to: [user.email],
        replyTo: "authentication@fendous.eu", // Optional, set if needed
        subject: "Trial Period Expiring Soon",
        html: `<p>Hi ${user.name},</p>
                   <p>Your trial period is expiring tomorrow. Please consider upgrading to one of our plans to continue using our services.</p>
                   <p>Best regards,<br>FendousAI Team</p>`,
        text: `Hi ${user.name},\n\nYour trial period is expiring tomorrow. Please consider upgrading to one of our plans to continue using our services.\n\nBest regards,\FendousAI Team`,
      });
    } catch (error) {
      console.error(`Failed to send email to ${user.email}:`, error);
      return NextResponse.json(
        { data: `Failed to send email to ${user.email}:`, error },
        { status: 500 }
      );
    }
  }

  // Update plan status for expired users
  for (const user of expiredUsers) {
    user.plan = "no_plan";
    await user.save();
    console.log(`Updated plan status for ${user.email}`);
  }
  return NextResponse.json(
    { data: "Free trial users updated succesfully" },
    { status: 200 }
  );
}
