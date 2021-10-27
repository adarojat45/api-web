const router = require("express").Router();

const errorHandler = require("../middlewares/errorHandler");
const category = require("./categoryRoute");
const post = require("./postRoute");

router.use("/categories", category);
router.use("/posts", post);

router.use(errorHandler);

module.exports = router;
