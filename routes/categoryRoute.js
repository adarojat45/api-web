const router = require("express").Router();
const CategoryController = require("../controllers/categoryController");

router.get("/", CategoryController.findAll);
router.get("/:slug", CategoryController.findOne);

module.exports = router;
