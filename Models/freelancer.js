const mongoose = require("mongoose");

const FreelancerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  userAvatar: { type: String, required: true },
  thumbnail: { type: String, required: true },
  password: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  skills: { type: [String], required: true },
  rating: { type: Number, default: 5 },
  prices: { type: Number, required: true },
  about: { type: String, required: true },
});
// exsisting model ||new model
module.exports =
  mongoose.models.Freelancer || mongoose.model("Freelancer", FreelancerSchema);
