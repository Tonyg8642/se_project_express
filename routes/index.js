const router = require("express").Router();
const clothingItem = require("./clothingItem");
const { INTERNAL_SERVER_ERROR_CODE } = require("../utils/errors");

router.use("/items", clothingItem);

router.use((req, res) => {
  res.status(INTERNAL_SERVER_ERROR_CODE).send({ message: "Not Found" });
});

module.exports = router;
