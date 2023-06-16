import { Schema, Types } from "mongoose";

export interface CategoryInterface {
  name: string;
  slug: string;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

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
