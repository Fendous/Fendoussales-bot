import { NextRequest, NextResponse } from "next/server";
const jwt = require("jsonwebtoken");

import { connect } from "@/db/mongoose";
import User from "@/models/User.model";

export async function POST(req: NextRequest) {
  await connect();

  try {
    const { token } = await req.json();
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({
      email: decoded.email,
      verificationToken: token,
      verificationTokenExpires: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 400 }
      );
    }

    user.emailVerified = true;
    user.verificationToken = null;
    user.verificationTokenExpires = null;
    await user.save();

    return NextResponse.json({ data: "success", error: null }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { data: null, error: error.message },
      { status: error.status }
    );
  }
}
