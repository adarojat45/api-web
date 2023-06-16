import { Types } from "mongoose";

export interface PostInterface {
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
  id: string;
  name: string;
  slug: string;
  excerpt: string;
  tags: string[];
}
