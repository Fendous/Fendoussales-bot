import { connect } from "@/db/mongoose";
import User from "@/models/User.model";
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/services/email";

const jwt = require("jsonwebtoken");

export async function POST(request: NextRequest) {
  await connect();

  try {
    const { name, email, password } = await request.json();

    const user = await User.findOne({ email });

    if (user) {
      console.log("User exists");
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      plan: "starter",
      verificationToken,
      verificationTokenExpires: Date.now() + 3600000, // 1 hour
    });

    const verificationLink = `${process.env.NEXTAUTH_URL}/email-verification/?token=${verificationToken}`;

    const savedUser = await newUser.save();
    const emailParams = {
      from: { email: "support@fendousai.com", name: "FendousAI" },
      to: [email],
      replyTo: { email: "support@fendousai.com", name: "FendousAI" },
      subject: "FendousAI Registration",
      html: `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Welcome to FendousAI</title>
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
            background-color: #cd0ab0;
            color: #fff;
            text-decoration: none;
            border-radius: 5px;
            transition: background-color 0.3s ease;
          }
          .button:hover {
            background-color: #d009f3;
          }
          .footer {
            text-align: center;
            margin-top: 20px;
            font-size: 0.9em;
            color: #888;
          }
          .download-button {
            display: inline-block;
            border-radius: 0.375rem; /* 6px */
            border: 1px solid #4f46e5; /* indigo-600 */
            background-color: #4f46e5; /* indigo-600 */
            padding: 0.75rem 3rem; /* px-12 py-3 */
            font-size: 0.875rem; /* text-sm */
            font-weight: 500; /* font-medium */
            color: white;
            text-align: center;
            text-decoration: none;
            cursor: pointer;
            outline: none;
          }
    
          .download-button:focus {
            outline: 2px solid #4f46e5; /* indigo-600 */
            outline-offset: 2px;
          }
    
          .download-button:active {
            color: #4338ca; /* indigo-500 */
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <img src="cid:0123456789" alt="FendousAI logo" />
            <h1>Welcome to FendousAI!</h1>
          </div>
          <div class="content">
            <p>Hi ${name},</p>
            <p>
              Thank you for registering with FendousAI! We're thrilled to have you
              on board.
            </p>
            <p>You have a 7 day free trial on the starter plan.</p>
            <p>To get started, verify your email here, the verification link expires in 1 hour.</p>
            <a class="download-button" href="${verificationLink}">Verify email</a>
            <p>
              If you have any questions or need assistance, feel free to reach out
              to our support team.
            </p>
            <p>Thanks,<br />The FendousAI Team</p>
          </div>
          <div class="footer">
            <p>&copy; 2024 Fendous Sustainable Solutions. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
    `,
      text: "FendousAI account registration",
    };

    await sendEmail(emailParams);
    return NextResponse.json({
      message: "User created successfully",
      success: true,
      savedUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
