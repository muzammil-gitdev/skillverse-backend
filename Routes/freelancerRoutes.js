const express = require("express");
const Freelancer = require("../Models/freelancer");

const router = express.Router();

// Add a freelancer(not used yet)
router.post("/add", async (req, res) => {
  try {
    const data = req.body;

    const newFreelancer = new Freelancer(data);
    await newFreelancer.save();

    res.json({
      success: true,
      message: "Freelancer added successfully",
      data: newFreelancer,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
//authentication module
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, error: "Email and password are required" });
    }

    // Find freelancer by email
    const freelancer = await Freelancer.findOne({ email: email });

    if (!freelancer) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    // Simple password check (plaintext for now; later hash in production)
    if (freelancer.password !== password) {
      return res
        .status(401)
        .json({ success: false, error: "Incorrect password" });
    }

    res.json({ success: true, message: "Login successful", data: freelancer });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
// used on gigs page  (fetch all gis)
router.get("/", async (req, res) => {
  try {
    const freelancers = await Freelancer.find();
    res.json({
      success: true,
      data: freelancers,
    });
  } catch (error) {
    console.error("Error fetching freelancers:", error);
    res.status(500).json({
      success: false,
      error: "Server error while fetching freelancers",
    });
  }
});

// searching not integrated yet
router.get("/:id", async (req, res) => {
  try {
    const freelancer = await Freelancer.findById(req.params.id);
    if (!freelancer)
      return res
        .status(404)
        .json({ success: false, error: "Freelancer not found" });
    res.json(freelancer);
  } catch (error) {
    console.error("Error fetching freelancer:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

module.exports = router;
