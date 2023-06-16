import { Schema, Types } from "mongoose";
import { CategoryInterface } from "../interfaces/categoryInterface";

const categorySchema = new Schema<CategoryInterface>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  _posts: [{ type: Types.ObjectId, ref: "Post" }],
  createdAt: {
    type: Date,
    default: () => new Date(Date.now()),
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  updatedAt: {
    type: Date,
    default: () => new Date(Date.now()),
  },
});

export default categorySchema;
