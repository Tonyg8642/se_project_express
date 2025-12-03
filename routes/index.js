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
const { NotFoundError } = require("../utils/errors");

// ---------- PUBLIC ROUTES ----------
// No token required
router.post("/signin", login);         // Log in → returns JWT
router.post("/signup", createUser);    // Register new user

// Public GET /items route (no auth)
router.use("/items", clothingItemRoutes);

// ---------- PROTECTED ROUTES ----------
// Everything below this requires a valid JWT
router.use(auth);

router.use("/users", userRoutes);      // GET /users/me, PATCH /users/me

// Protected item routes (POST, DELETE, likes)
router.use("/items", clothingItemRoutes);

// ---------- 404 HANDLER ----------
router.use((req, res, next) => {
  next(new NotFoundError("Requested resource not found"));
});

module.exports = router;
