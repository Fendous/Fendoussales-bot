import { connect } from "@/db/mongoose";
import bcryptjs from "bcryptjs";
import User from "@/models/User.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  await connect();
  let tryError = null;
  try {
    const { token, email, password } = await request.json();

    const normalizedEmail = email.toLowerCase();

    const user = await User.findOne({
      email: normalizedEmail,
      resetToken: token,
      resetTokenExpire: { $gt: new Date() },
    });

    if (!user) {
      return NextResponse.json(
        { message: null, error: "Invalid or expired token" },
        { status: 400 }
      );
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    user.password = hashedPassword;
    user.resetToken = "";
    user.resetTokenExpire = "";

    await user.save();

    return NextResponse.json(
      {
        message: "Password reset successful, please go to login.",
        error: null,
      },
      { status: 200 }
    );
  } catch (error: any) {
    tryError = error.message;
  }

  if (tryError) {
    return NextResponse.json(
      { message: null, error: tryError },
      { status: 500 }
    );
  }
}
