const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes"); // <-- import the centralized router

const app = express();
const PORT = 3001;

app.use(express.json());

// Middleware to add a fake authenticated user
app.use((req, res, next) => {
  req.user = { _id: "6893776e2abcc4a55ced18f4" };
  next();
});

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to MongoDB"); // eslint-disable-line no-console
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err); // eslint-disable-line no-console
  });

// Mount main router
app.use("/", routes);

// Root endpoint for testing
app.get("/", (req, res) =>
  res.send({ message: "Server is running on port 3001!" })
);

// Start the server
app.listen(
  PORT,
  () => console.log(`Server is listening on port ${PORT}`) // eslint-disable-line no-console
);
