import { ObjectId, Types } from "mongoose";

export interface PostInterface {
  _id: ObjectId;
  name: string;
  slug: string;
  excerpt: string;
  description: string;
  tags: string[];
  isMarkdown: boolean;
  isActive: boolean;
  isDeleted: boolean;
  views: number;
  createdAt: Date;
  updatedAt: Date;
  _categories: [{ type: Types.ObjectId; ref: "Category" }];
}

export interface PostListOutputInterface {
  id: ObjectId;
  name: string;
  slug: string;
  excerpt: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}
