require("dotenv").config();
const express = require("express");
const cors = require("cors");
const pool = require("./db"); // Import database connection

const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON requests

const PORT = process.env.PORT || 5000;

const userRoutes = require("./routes/users"); //add routes here

app.use("/users", userRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});
