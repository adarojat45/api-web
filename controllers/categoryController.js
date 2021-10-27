const CategoryModel = require("../models/categoryModel");
const CategoryTransformer = require("../transformers/categoryTransformer");

class CategoryController {
	static findAll = async (req, res, next) => {
		try {
			const condition = {};
			const categories = await CategoryModel.findAll(condition);
			const categoriesTransform = CategoryTransformer.list(categories);
			res.status(200).json(categoriesTransform);
		} catch (error) {
			next(error);
		}
	};

	static findOne = async (req, res, next) => {
		try {
			const { slug } = req.params;
			const condition = { slug: slug };
			const category = await CategoryModel.findOne(condition);
			if (!category)
				throw {
					name: "NotFound",
					message: "Category not found",
					code: 404,
				};
			const categoryTransform = CategoryTransformer.detail(category);
			res.status(200).json(categoryTransform);
		} catch (error) {
			next(error);
		}
	};
}

module.exports = CategoryController;
