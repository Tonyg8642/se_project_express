require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { errors } = require("celebrate"); // ✅ celebrate errors middleware

const routes = require("./routes");
const errorHandler = require("./middlewares/error-handler");
const { requestLogger, errorLogger } = require("./middlewares/logger"); // ✅ winston loggers

const app = express();
const PORT = 3001;

// ---------- MIDDLEWARE ----------
app.use(cors());
app.use(express.json());

// ✅ LOG EVERY REQUEST (must be BEFORE routes)
app.use(requestLogger);

// ---------- DATABASE CONNECTION ----------
mongoose
  .connect(process.env.DB_URI || "mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// ---------- CRASH TEST ROUTE (REMOVE AFTER REVIEW) ----------
app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

// ---------- ROUTES ----------
app.use("/", routes);

// ✅ HANDLE celebrate VALIDATION ERRORS (must be AFTER routes)
app.use(errors());

// ✅ LOG ERRORS (must be BEFORE your custom error handler)
app.use(errorLogger);

// ---------- GLOBAL ERROR HANDLER (MUST BE LAST) ----------
app.use(errorHandler);

// ---------- SERVER LISTEN ----------
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});