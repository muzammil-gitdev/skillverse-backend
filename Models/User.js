const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    username: String,
    dob: String,
    country: String,
    city: String,
    niche: String,
    software: [String],
    customSoftware: String,
    authProvider: { type: String, enum: ["local", "google"], default: "local" },
    profileCompleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", UserSchema);
