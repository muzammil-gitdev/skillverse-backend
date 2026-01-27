require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./Config/db");
const session = require("express-session");
const passport = require("passport");
const freelancerRoutes = require("./Routes/freelancerRoutes");
const signupRoutes = require("./Routes/apiRoutes");
require("./auth/google");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(
  session({
    secret: "mySecret",
    resave: false,
    saveUninitialized: true,
  }),
);

app.use(passport.initialize());
app.use(passport.session());

// Database connect
connectDB();

// Test route
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend connected successfully" });
});

// Signup APIs
app.use("/api", signupRoutes);
app.use("/api/freelancers", freelancerRoutes);
// Google OAuth
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:3000/signup",
  }),
  (req, res) => {
    res.redirect(
      `http://localhost:3000/signup/details?email=${req.user.email}&name=${req.user.name}`,
    );
  },
);

// Server listen
const PORT = process.env.PORT || 1001;
app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`),
);
