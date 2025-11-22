// 📁 routes/index.js

// ⭐ EXPRESS MUST BE FIRST (ESLint: import/order)
const router = require("express").Router();

// ⭐ Controller imports
const { login, createUser } = require("../controllers/user");

// ⭐ Route files
const clothingItemRoutes = require("./clothingItem");
const userRoutes = require("./users");

// ⭐ Middlewares & utilities
const auth = require("../middlewares/auth");
const { NOT_FOUND_ERROR_CODE } = require("../utils/errors");

// ---------- PUBLIC ROUTES ----------
// No token required
router.post("/signin", login);         // Log in → returns JWT
router.post("/signup", createUser);    // Register new user
router.use("/items", clothingItemRoutes); // Public GET /items route

// ---------- PROTECTED ROUTES ----------
// Everything below this requires a valid JWT
router.use(auth);

router.use("/users", userRoutes);      // GET /users/me, PATCH /users/me
router.use("/items", clothingItemRoutes); // POST /items, DELETE, likes

// ---------- 404 HANDLER ----------
router.use((req, res) => {
  res
    .status(NOT_FOUND_ERROR_CODE)
    .send({ message: "Requested resource not found" });
});

module.exports = router;
