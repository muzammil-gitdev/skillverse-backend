const express = require("express");
const router = express.Router();
const User = require("../Models/User");

// STEP 1: Save name + email only
router.post("/signup/step1", async (req, res) => {
  try {
    const { name, email, dob } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "Name and Email are required" });
    }

    let user = await User.findOne({ email });

    if (!user) {
      user = new User({ name, email, dob, authProvider: "local" });
      await user.save();
      console.log("User created:", user.email);
    } else {
      console.log("User already exists:", user.email);
    }

    res.status(200).json({ message: "Step 1 completed", userId: user._id });
  } catch (err) {
    console.error("Signup Step 1 Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// STEP 2: Complete profile
router.post("/signup/complete", async (req, res) => {
  try {
    const {
      email,
      username,
      dob,
      country,
      city,
      niche,
      software,
      customSoftware,
    } = req.body;

    if (!email) return res.status(400).json({ message: "Email is required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    user.username = username;
    user.dob = dob;
    user.country = country;
    user.city = city;
    user.niche = niche;
    user.software = software || [];
    user.customSoftware = customSoftware;
    user.profileCompleted = true;

    await user.save();
    console.log("Profile completed:", user.email);

    res.status(200).json({ message: "Profile completed successfully" });
  } catch (err) {
    console.error("Signup Complete Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
