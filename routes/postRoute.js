const router = require("express").Router();
const PostController = require("../controllers/postController");

router.get("/", PostController.findAll);
router.get("/:slug", PostController.findOne);

module.exports = router;
