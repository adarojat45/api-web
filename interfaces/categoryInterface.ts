import { PostInterface, PostListOutputInterface } from "./postInterfaces";
import { ObjectId } from "mongoose";

export interface CategoryInterface {
  _id: ObjectId;
  name: string;
  slug: string;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  _posts: PostInterface[];
}

export interface CategoryListInputInterface {
  _id: ObjectId;
  name: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CategoryListOutputInterface {
  id: ObjectId;
  name: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CategoryDetailInputInterface {
  _id: ObjectId;
  name: string;
  slug: string;
  _posts: PostInterface[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CategoryDetailOutputInterface {
  id: ObjectId;
  name: string;
  slug: string;
  posts?: PostListOutputInterface[];
  createdAt: Date;
  updatedAt: Date;
}
