import { connect } from "@/db/mongoose";
import crypto from "crypto";
import User from "@/models/User.model";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/services/email";

import PasswordResetTemplate from "@/components/templates/passwordRestTemplate";

export async function POST(request: NextRequest, res: NextResponse) {
  await connect();
  const CURRENT_URL = request.nextUrl.origin;

  try {
    const { email } = await request.json();

    const user = await User.findOne({ email: email });

    if (!user) {
      return NextResponse.json(
        { message: null, error: "User email not found" },
        { status: 404 }
      );
    }

    const token = crypto.randomBytes(32).toString("hex");
    const expireDate = new Date(Date.now() + 3600000); // 1 hour

    user.resetToken = token;
    user.resetTokenExpire = expireDate;
    await user.save();

    const resetLink = `${CURRENT_URL}/password-reset?token=${token}&email=${email}`;

    const emailParams = {
      from: { email: "support@fendousai.com", name: "FendousAI" },
      to: [email],
      replyTo: { email: "support@fendousai.com", name: "FendousAI" },
      subject: "FendousAI Password Reset",
      html: `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Password Reset</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    color: #333;
                    margin: 0;
                    padding: 0;
                }
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    background-color: #fff;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                .header {
                    text-align: center;
                }
                .header img {
                    max-width: 150px;
                    height: auto;
                }
                .content {
                    padding: 20px;
                }
                .button {
                  display: inline-block;
                  padding: 10px 20px;
                  margin-top: 20px;
                  background-color: #007BFF;
                  color: #fff;
                  text-decoration: none;
                  border-radius: 5px;
                  transition: background-color 0.3s ease;
                }
                .footer {
                    text-align: center;
                    margin-top: 20px;
                    font-size: 0.9em;
                    color: #888;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <img src="cid:0123456789" alt="FendousAI logo"/>
                    <h1>Password Reset Request</h1>
                </div>
                <div class="content">
                    <p>Hi ${user.name},</p>
                    <p>We received a request to reset your password for your FendousAI account. Click the link below to reset it:</p>
                    <a href=${resetLink} class="button">Reset Password</a>
                    <p>If you did not request a password reset, please ignore this email or contact our support team if you have any questions.</p>
                    <p>Thanks,<br>The FendousAI Team</p>
                </div>
                <div class="footer">
                    <p>&copy; 2024 Fendous Sustainable Solutions. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>`,
      text: "FendousAI password reset",
    };

    await sendEmail(emailParams);

    return NextResponse.json(
      {
        message: "Please check your email for the password reset link.",
        error: null,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.log("ERROR SENDING EMAIL:", error);

    return NextResponse.json(
      {
        message: null,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
