const mongoose = require("../config/mongoose");
const PostSchema = require("../schemas/postSchema");

const Post = mongoose.model("Post", PostSchema);

class PostModel {
	static findAll = async (condition = {}, filter = {}, limit = 10, skip = 0) => {
		try {
			return await Post.find({
				...condition,
				isDeleted: false,
				isActive: true,
			})
				.populate("_categories")
				.limit(+limit)
				.skip(skip);
		} catch (error) {
			throw error;
		}
	};

	static findOne = async (condition = {}) => {
		try {
			return await Post.findOne({
				...condition,
				isDeleted: false,
				isActive: true,
			}).populate("_categories");
		} catch (error) {
			throw error;
		}
	};
}

module.exports = PostModel;
