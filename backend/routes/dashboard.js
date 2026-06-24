const express = require("express");
const router = express.Router();
const db = require("../db");

// Restaurants
router.get("/restaurants", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM restaurants LIMIT 20"
    );

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

// KPI Summary
router.get("/kpis", async (req, res) => {
  try {
    const [db] = await db.query("SELECT DATABASE() AS db");
    const [tables] = await db.query("SHOW FULL TABLES");

    res.json({
      database: db,
      tables: tables
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

// Area Performance
router.get("/areas", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM area_performance"
    );

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

// Cuisine Performance
router.get("/cuisines", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM cuisine_performance"
    );

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});
router.get("/topreviews", async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT restaurant_name,
             google_rating,
             total_reviews,
             area
      FROM restaurants
      ORDER BY total_reviews DESC
      LIMIT 20
    `);

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});
router.get("/search/:term", async (req, res) => {
  try {
    const term = req.params.term;

    const [rows] = await db.query(
      `
      SELECT
        restaurant_name,
        area,
        google_rating,
        total_reviews,
        cuisine_type
      FROM restaurants
      WHERE restaurant_name LIKE ?
         OR area LIKE ?
      `,
      [`%${term}%`, `%${term}%`]
    );

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});
router.get("/toprated", async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT *
      FROM restaurants
      ORDER BY google_rating DESC,
               total_reviews DESC
    `);

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});
router.get("/maprestaurants", async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT
        restaurant_name,
        area,
        google_rating,
        latitude,
        longitude
      FROM restaurants
      WHERE latitude IS NOT NULL
      AND longitude IS NOT NULL
    `);

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});
router.get("/topreviews", async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT restaurant_name,
             total_reviews
      FROM restaurants
      ORDER BY total_reviews DESC
      LIMIT 5
    `);

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});
module.exports = router;