// 📁 routes/index.js

const router = require("express").Router();

// Controllers
const { login, createUser } = require("../controllers/user");
const { getItems } = require("../controllers/clothingItem");

// Routes
const clothingItemRoutes = require("./clothingItem");
const userRoutes = require("./users");

// Middlewares
const auth = require("../middlewares/auth");
const { NotFoundError } = require("../utils/errors");

// ---------- PUBLIC ROUTES (NO TOKEN) ----------
router.post("/signin", login); // Login
router.post("/signup", createUser); // Register
router.get("/items", getItems);

// ---------- PROTECTED ROUTES (TOKEN REQUIRED) ----------
router.use(auth); // Everything below this line requires JWT

router.use("/users", userRoutes); // /users/me, PATCH /users/me
router.use("/items", clothingItemRoutes); // POST, DELETE, LIKE, UNLIKE

// ---------- 404 HANDLER ----------
router.use((req, res, next) => {
  next(new NotFoundError("Requested resource not found"));
});

module.exports = router;
