const router = require("express").Router();
const clothingItem = require("./clothingItem");
const { INTERNAL_SERVER_ERROR_CODE } = require("../utils/errors");
const user = require("./users");

router.use("/items", clothingItem);
router.use("/users", user);

router.use((req, res) => {
  res.status(INTERNAL_SERVER_ERROR_CODE).send({ message: "Not Found" });
});

module.exports = router;
