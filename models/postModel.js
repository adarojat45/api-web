const mongoose = require("../config/mongoose");
const PostSchema = require("../schemas/postSchema");

const Post = mongoose.model("Post", PostSchema);

class PostModel {
	static paginate = async (query = {}, option = {}) => {
		try {
			const postAggregate = Post.aggregate([
				{ $match: { ...query, isDeleted: false, isActive: true } },
				{
					$lookup: {
						from: "categories",
						localField: "_categories",
						foreignField: "_id",
						as: "_categories",
					},
				},
			]);
			return await Post.aggregatePaginate(postAggregate, {
				...option,
				sort: { createdAt: -1 },
			});
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
