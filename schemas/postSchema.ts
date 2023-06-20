import { Schema, Types } from "mongoose";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";

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
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
  },
  isMarkdown: {
    type: Boolean,
    default: true,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  views: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: () => new Date(Date.now()),
  },
  updatedAt: {
    type: Date,
    default: () => new Date(Date.now()),
  },
  _categories: [{ type: Types.ObjectId, ref: "Category" }],
});

postSchema.plugin(aggregatePaginate);

export default postSchema;
