const router = require("express").Router();
const PostController = require("../controllers/postController");

router.get("/", PostController.findAll);
router.get("/:id", PostController.findOne);

module.exports = router;
