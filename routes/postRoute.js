const router = require("express").Router();
const PostController = require("../controllers/postController");

router.get("/", PostController.findAll);
router.get("/search", PostController.search);
router.get("/:slug", PostController.findOne);

module.exports = router;
