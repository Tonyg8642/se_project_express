// 📁 routes/index.js
const router = require("express").Router();
const { login, createUser } = require("../controllers/user");
const clothingItemRoutes = require("./clothingItem");
const userRoutes = require("./users");
const auth = require("../middlewares/auth");
const { NOT_FOUND_ERROR_CODE } = require("../utils/errors");
const { getItems } = require("../controllers/clothingItem");

// ---------- PUBLIC ROUTES ----------
// These can be accessed without a token
router.post("/signin", login);       // Login → returns JWT token
router.post("/signup", createUser);  // Register → creates new user
router.get("/items", getItems);      // View all clothing items (no auth required)

// ---------- PROTECTED ROUTES ----------
// All routes below this middleware require a valid JWT
router.use(auth);

router.use("/users", userRoutes);    // GET /users/me, PATCH /users/me, etc.
router.use("/items", clothingItemRoutes); // POST /items, DELETE, like/unlike

// ---------- 404 HANDLER ----------
router.use((req, res) => {
  res.status(NOT_FOUND_ERROR_CODE).send({ message: "Not Found" });
});

module.exports = router;
