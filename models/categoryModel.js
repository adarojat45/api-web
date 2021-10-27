const mongoose = require("../config/mongoose");
const CategorySchema = require("../schemas/categorySchema");

const Category = mongoose.model("Category", CategorySchema);

class CategoryModel {
	static findAll = async (condition = {}, filter = {}) => {
		try {
			return await Category.find({
				...condition,
				isDeleted: false,
				isActive: true,
			});
		} catch (error) {
			throw error;
		}
	};

	static findOne = async (condition = {}) => {
		try {
			return await Category.findOne({
				...condition,
				isDeleted: false,
				isActive: true,
			}).populate("_posts");
		} catch (error) {
			throw error;
		}
	};
}

module.exports = CategoryModel;
