// 📁 app.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes"); // imports index.js inside /routes
const { INTERNAL_SERVER_ERROR_CODE } = require("./utils/errors");

const app = express();
const PORT = 3001;

// ---------- MIDDLEWARE ----------
app.use(cors());
app.use(express.json());

// ---------- DATABASE CONNECTION ----------
mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .catch(() => {}); // removed console logs to satisfy no-console

// ---------- ROUTES ----------
app.use("/", routes);

// ---------- DEFAULT TEST ROUTE ----------
app.get("/", (req, res) => res.send({ message: "Server running on port 3001" }));

// ---------- GLOBAL ERROR HANDLER ----------
app.use((err, req, res, _next) => {
  // removed console.error for ESLint
  res
    .status(INTERNAL_SERVER_ERROR_CODE)
    .send({ message: "An error occurred on the server" });
});

// ---------- SERVER LISTEN ----------
app.listen(PORT, () => {});
