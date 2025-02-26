"use server";
import User from "@/models/User.model";
import { connect } from "@/db/mongoose";

export const updateUserModel = async () => {
  await connect();
  try {
    // const res = await User.updateMany(
    //   { email: "zaakeenock@gmail.com" },
    //   {
    //     $set: {
    //     },
    //   }
    // );
    // const res = await User.deleteMany({
    //   $or: [
    //     { email: "husnukaya41@gmail.com" },
    //     { email: "husnukaya877@gmail.com" },
    //     { email: "husnukaya41@outlook.com" },
    //   ],
    // });
    // console.log("UPDATED USER MODEL:", res);
    // const res = await User.findOne({ email: "husnukaya41@gmail.com" });
    // console.log("UPDATED USER MODEL:", res);
  } catch (error: any) {
    console.log("ERROR UPDATING USER MODEL:", error);
  }
};
