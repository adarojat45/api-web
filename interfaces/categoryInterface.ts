import { PostListOutputInterface } from "./postInterfaces";
import { Types } from "mongoose";

export interface CategoryInterface {
  name: string;
  slug: string;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  _posts: [{ type: Types.ObjectId; ref: "Post" }];
}

export interface CategoryListInputInterface {
  _id: string;
  name: string;
  slug: string;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CategoyListOutputInterface {
  id: string;
  name: string;
  slug: string;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CategoryDetailInputInterface {
  _id: string;
  name: string;
  slug: string;
  _posts: PostListOutputInterface[];
  isActive: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CategoryDetailOutputInterface {
  id: string;
  name: string;
  slug: string;
  posts: PostListOutputInterface[];
  isActive: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
