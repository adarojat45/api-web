const PostModel = require("../models/postModel");
const PostTransformer = require("../transformers/postTransformer");
const algolia = require("../services/algolia");

class PostController {
	static findAll = async (req, res, next) => {
		try {
			let skip = 0;
			let { page, limit = 10, tags } = req.query;

			let query = {};
			let option = {
				page,
				limit: 10,
				skip,
			};

			if (!page) option = { ...option, page: 1 };

			if (limit) option = { ...option, limit: limit };

			if (page) option = { ...option, skip: limit * page - limit };

			if (tags) query = { ...query, tags };

			const post = await PostModel.paginate(query, option);
			const { docs, ...metaData } = post;
			const postsTransform = PostTransformer.list(docs);
			res.status(200).json({
				metaData,
				posts: postsTransform,
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
			await PostModel.update({ _id: post._id }, { views: post.views + 1 });
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
			next(error);
		}
	};
}

module.exports = PostController;
