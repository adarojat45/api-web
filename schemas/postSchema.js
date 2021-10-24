const mongoose = require("mongoose");
// const mongoosePaginate = require("mongoose-paginate-v2");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const { Schema } = mongoose;

const postSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	slug: {
		type: String,
		required: true,
		unique: true,
	},
	excerpt: {
		type: String,
	},
	description: {
		type: String,
	},
	tags: [String],
	_categories: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Category",
		},
	],
	isMarkdown: {
		type: Boolean,
		default: true,
	},
	views: {
		type: Number,
		default: 0,
	},
	isActive: {
		type: Boolean,
		default: false,
	},
	isDeleted: {
		type: Boolean,
		default: false,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	updatedAt: {
		type: Date,
		default: Date.now,
	},
});

postSchema.plugin(aggregatePaginate);

module.exports = postSchema;
