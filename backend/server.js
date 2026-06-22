require("dotenv").config();

const express = require("express");
const cors = require("cors");

const dashboardRoutes = require("./routes/dashboard");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", dashboardRoutes);

app.get("/", (req, res) => {
  res.send("Restaurant Analytics API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});