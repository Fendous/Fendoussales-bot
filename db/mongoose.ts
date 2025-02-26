import mongoose from "mongoose";

let isConnected: number = 0;

export async function connect() {
  try {
    if (isConnected === 1) {
      console.log("Using existing database connection");
      return;
    }
    await mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("MongoDB connected");
      isConnected = connection.readyState;
    });

    connection.on("error", (err) => {
      console.log("MongoDB error" + err);
      process.exit();
    });

    connection.on("close", () => {
      connection.removeAllListeners();
    });

    connection.removeListener("error", () => {
      console.log("Error listener removed");
    });
    connection.removeListener("connected", () => {
      console.log("Connected listener removed");
    });
  } catch (error: any) {
    console.log(error);
  }
}
