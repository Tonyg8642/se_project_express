const router = require("express").Router();


const { login, createUser } = require("../controllers/user");
const { getItems } = require("../controllers/clothingItem");


const clothingItemRoutes = require("./clothingItem");
const userRoutes = require("./users");

// Middlewares
const auth = require("../middlewares/auth");
const { NotFoundError } = require("../utils/errors");


const {
  validateSignup,
  validateSignin,
} = require("../middlewares/validation");


router.post("/signin", validateSignin, login);
router.post("/signup", validateSignup, createUser);

// Public items route
router.get("/items", getItems);

router.use(auth);


router.use("/users", userRoutes);
router.use("/items", clothingItemRoutes);


router.use((req, res, next) => {
  next(new NotFoundError("Requested resource not found"));
});

module.exports = router;