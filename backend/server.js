require("dotenv").config();

const express = require("express");
const cors = require("cors");
const db = require("./db");

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
app.get("/debug-db", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM kpi_summary");
    res.json(rows);
  } catch (err) {
    res.json(err);
  }
});

app.get("/dbcheck", async (req, res) => {
  try {
    const [dbName] = await db.query("SELECT DATABASE() AS db");
    const [tables] = await db.query("SHOW FULL TABLES");

    res.json({
      database: dbName,
      tables: tables,
    });
  } catch (err) {
    res.json(err);
  }
});