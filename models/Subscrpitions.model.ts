import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  subscription_id: {
    type: String,
    required: [true, "Subscription id required"],
  },
  next_billing_date: {
    type: Date,
    default: null,
  },
  status: {
    type: String,
    required: [true, "Status is required"],
    default: null,
  },
});

const Subscriptions =
  mongoose.models.Subscriptions ||
  mongoose.model("Subscriptions", subscriptionSchema);

export default Subscriptions;
