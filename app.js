const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/users.js");

const app = express();
const PORT = 3001;

app.use(express.json());

// next calls the next middleware in the chain
app.use((req, res, next) => {
  req.user = {
    _id: "6893776e2abcc4a55ced18f4",

  };
  next();
});

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

  const routes = require('./routes');
const e = require("express");

app.use(express.json());
app.use('/', routes);




app.get("/", (req, res) => {
  res.send({message:"Sending response: Server is running on port 3001!"});
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
