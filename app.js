const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes");
const { INTERNAL_SERVER_ERROR_CODE } = require("./utils/errors"); // ✅ import constant

const app = express();
const PORT = 3001;

// Enable CORS
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    // eslint-disable-next-line no-console
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error("Error connecting to MongoDB:", err);
  });

// Mount centralized routes
app.use("/", routes);

// Health check endpoint
app.get("/", (req, res) =>
  res.send({ message: "Server is running on port 3001!" })
);

// Global error handler (good practice)
app.use((err, req, res,) => {
  // eslint-disable-next-line no-console
  console.error(err.stack);
  res
    .status(INTERNAL_SERVER_ERROR_CODE) // ✅ use constant instead of 500
    .send({ message: "An error has occurred on the server" });
});

// Start server
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is listening on port ${PORT}`);
});
