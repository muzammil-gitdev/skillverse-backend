const express = require("express");
const cors = require("cors");
const connectDB = require("./Config/db");
const app = express();
const freelancerRoutes = require("./Routes/freelancerRoutes");

// integration
app.use(cors());
app.use(express.json());

//connection
connectDB();
app.use("/api/freelancers", freelancerRoutes);

app.get("/api/test", (req, res) => {
  res.json({ message: "Hello world backend" });
});

app.listen(1001, () => {
  console.log("Server running at http://localhost:1001");
});
