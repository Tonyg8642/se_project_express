// 📁 routes/index.js

const { login, createUser } = require("../controllers/user"); // ✅ corrected filename
const clothingItemRoutes = require("./clothingItem"); // ✅ plural route file
const userRoutes = require("./users");
const auth = require("../middlewares/auth");
const { NOT_FOUND_ERROR_CODE } = require("../utils/errors");
const router = require("express").Router();



// ---------- PUBLIC ROUTES ----------
// No token required
router.post("/signin", login); // Log in → returns JWT
router.post("/signup", createUser); // Register → creates new user
router.use("/items", clothingItemRoutes); // Allow public GET /items

// ---------- PROTECTED ROUTES ----------
// Everything below this requires valid JWT
router.use(auth);

router.use("/users", userRoutes); // GET /users/me, PATCH /users/me
router.use("/items", clothingItemRoutes); // POST /items, DELETE, like/unlike

// ---------- 404 HANDLER ----------
router.use((req, res) => {
  res
    .status(NOT_FOUND_ERROR_CODE)
    .send({ message: "Requested resource not found" });
});

module.exports = router;
