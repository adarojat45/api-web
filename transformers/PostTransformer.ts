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
          const {
            _id,
            name,
            slug,
            isActive,
            isDeleted,
            createdAt,
            updatedAt,
          } = category;

          return {
            id: _id,
            name,
            slug,
            isActive,
            isDeleted,
            createdAt,
            updatedAt,
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
