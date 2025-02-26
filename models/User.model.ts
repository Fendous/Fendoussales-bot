import mongoose from "mongoose";
import { boolean } from "zod";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please write your fullname"],
  },
  email: {
    type: String,
    required: [true, "please provide a valid email"],
    unique: true,
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },
  verificationToken: { type: String },
  verificationTokenExpires: { type: Date },
  password: {
    type: String,
  },
  resetToken: {
    type: String,
    required: false,
    default: null,
  },
  resetTokenExpire: {
    type: Date,
    required: false,
    default: null,
  },
  plan: {
    type: String,
    enum: ["no_plan", "starter", "advanced", "custom"],
    default: "no_plan",
  },
  trialStartDate: {
    type: Date,
    default: Date.now,
  },
  trialEndDate: {
    type: Date,
    required: false,
    default: function () {
      const trialPeriodDays = 7;
      return new Date(Date.now() + trialPeriodDays * 24 * 60 * 60 * 1000);
    },
  },
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
