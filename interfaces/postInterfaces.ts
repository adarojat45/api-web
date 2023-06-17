import { ObjectId } from "mongoose";
import {
  CategoryInterface,
  CategoryListOutputInterface,
} from "./categoryInterface";

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
  _categories: CategoryInterface[];
}

export interface PostListInputInterface {
  _id: ObjectId;
  name: string;
  slug: string;
  excerpt: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  _categories: CategoryInterface[];
}

export interface PostListOutputInterface {
  id: ObjectId;
  name: string;
  slug: string;
  excerpt: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  categories?: CategoryListOutputInterface[];
}
