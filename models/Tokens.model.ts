import mongoose from "mongoose";

const TokenSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  googleTokens: [
    {
      scope: { type: String, required: true },
      accessToken: { type: String, required: true },
      refreshToken: { type: String },
      tokenType: { type: String },
      expiryDate: { type: Date },
    },
  ],
});

const Tokens = mongoose.models.Tokens || mongoose.model("Tokens", TokenSchema);
export default Tokens;
