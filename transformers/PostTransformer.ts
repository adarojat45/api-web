import {
  PostListInputInterface,
  PostListOutputInterface,
} from "../interfaces/postInterfaces";
import { createSchema, morphism } from "morphism";

class PostTransformer {
  static list(payload: PostListInputInterface[]): PostListOutputInterface[] {
    const schema = createSchema<
      PostListOutputInterface,
      PostListInputInterface
    >({
      id: "_id",
      name: "name",
      slug: "slug",
      excerpt: "excerpt",
      tags: "tags",
      categories: ({ _categories }) => {
        return _categories.map((category) => {
          return {
            id: category._id,
            name: category.name,
            slug: category.slug,
            isActive: category.isActive,
            isDeleted: category.isDeleted,
            createdAt: category.createdAt,
            updatedAt: category.updatedAt,
          };
        });
      },
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    });

    return morphism(schema, payload);
  }
}

export default PostTransformer;
