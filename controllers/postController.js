const PostModel = require("../models/postModel");
const PostTransformer = require("../transformers/postTransformer");
const algolia = require("../services/algolia");

class PostController {
	static findAll = async (req, res, next) => {
		try {
			let limit = 10;
			let skip = 0;

			let { page, size } = req.query;

			if (!page) page = 1;

			if (size) limit = size;

			if (page) skip = limit * page - limit;

			const condition = {};
			const posts = await PostModel.findAll(condition, {}, limit, skip);
			const postsTransform = PostTransformer.list(posts);
			res.status(200).json({
				posts: postsTransform,
				page,
				size,
			});
		} catch (error) {
			next(error);
		}
	};

	static findOne = async (req, res, next) => {
		try {
			const { slug } = req.params;
			const post = await PostModel.findOne({ slug: slug });
			if (!post)
				throw {
					name: "NotFound",
					message: "Post not found",
					code: 404,
				};
			const postTransform = PostTransformer.detail(post);
			res.status(200).json(postTransform);
		} catch (error) {
			next(error);
		}
	};

	static search = async (req, res, next) => {
		try {
			const { q } = req.query;
			const index = algolia.initIndex("posts");
			const { hits } = await index.search(q);
			const posts = hits.map((hit) => {
				const { _highlightResult, objectID, ...rest } = hit;
				return rest;
			});
			res.status(200).json(posts);
		} catch (error) {
			console.log(
				"🚀 ~ file: postController.js ~ line 57 ~ PostController ~ search= ~ error",
				error
			);
			next(error);
		}
	};
}

module.exports = PostController;
