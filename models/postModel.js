const mongoose = require("../config/mongoose");
const PostSchema = require("../schemas/postSchema");

const Post = mongoose.model("Post", PostSchema);

class PostModel {
	static findAll = async (query = {}, option = {}) => {
		try {
			return await Post.paginate(
				{ ...query, isDeleted: false, isActive: true },
				option
			);
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
