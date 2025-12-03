// 📁 app.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// ⭐ Import loggers
const { requestLogger, errorLogger } = require("./middlewares/logger");

// Import your routes
const routes = require("./routes");

// Import centralized error handler
const errorHandler = require("./middlewares/error-handler");

// ⭐ Celebrate validation errors middleware
const { errors } = require("celebrate");

const app = express();
const PORT = 3001;

// ---------------------------
// 🔧 MIDDLEWARE
// ---------------------------
app.use(cors());
app.use(express.json());

// ⭐ Log all incoming requests BEFORE routes
app.use(requestLogger);

// ---------------------------
// 🗄 DATABASE CONNECTION
// ---------------------------
mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db").catch(() => {});

// ---------------------------
// 🚦 ROUTES
// ---------------------------
app.use("/", routes);

// ---------------------------
// ⭐ Log errors AFTER routes
// ---------------------------
app.use(errorLogger);

// ---------------------------
// ⚠️ CELEBRATE ERROR HANDLER
// ---------------------------
app.use(errors());

// ---------------------------
// 🛑 CENTRALIZED ERROR HANDLER
// ---------------------------
app.use(errorHandler);

// ---------------------------
// 🖥 SERVER LISTEN
// ---------------------------
app.listen(PORT, () => {});
