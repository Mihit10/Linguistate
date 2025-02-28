const express = require("express");
const pool = require("../db"); // Import the database connection

const router = express.Router();

// ✅ **1. GET all users**
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ **2. GET a single user by ID**
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ **3. POST - Create a new user**
router.post("/", async (req, res) => {
  try {
    const { first_name, last_name, dob, gender, email, phone, password } =
      req.body;
    const result = await pool.query(
      "INSERT INTO users (first_name, last_name, dob, gender, email, phone, password) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [first_name, last_name, dob, gender, email, phone, password]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ **4. PUT - Update a user by ID**
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { first_name, last_name, dob, gender, email, phone, password } =
      req.body;
    const result = await pool.query(
      "UPDATE users SET first_name = $1, last_name = $2, dob = $3, gender = $4, email = $5, phone = $6, password = $7 WHERE id = $8 RETURNING *",
      [first_name, last_name, dob, gender, email, phone, password, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ **5. DELETE - Remove a user by ID**
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "DELETE FROM users WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
