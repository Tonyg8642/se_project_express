// routes/index.js
const router = require("express").Router();
const { login, createUser } = require("../controllers/user");
const clothingItemRoutes = require("./clothingItem");
const userRoutes = require("./users");
const auth = require("../middlewares/auth");

// Public routes
router.post("/signin", login);
router.post("/signup", createUser);
router.get("/items", clothingItemRoutes); // only GET is public

// Protected routes
router.use(auth);

router.use("/users", userRoutes);
router.use("/items", clothingItemRoutes);

// Handle unknown routes
router.use((req, res) => {
  res.status(404).send({ message: "Not Found" });
});

module.exports = router;
