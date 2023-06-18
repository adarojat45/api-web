import {
  PostDetailInputInterface,
  PostDetailOutputInterface,
  PostInterface,
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
      createdAt: "createdAt",
      updatedAt: "updatedAt",
      categories: ({ _categories }) => {
        return _categories.map((category) => {
          const { _id: id, name, slug, createdAt, updatedAt } = category;

          return {
            id,
            name,
            slug,
            createdAt,
            updatedAt,
          };
        });
      },
    });

    return morphism(schema, payload);
  }

  static detail(payload: PostInterface): PostDetailOutputInterface {
    const schema = createSchema<
      PostDetailOutputInterface,
      PostDetailInputInterface
    >({
      id: "_id",
      name: "name",
      slug: "slug",
      excerpt: "excerpt",
      description: "description",
      tags: "tags",
      isMarkdown: "isMarkdown",
      views: "views",
      createdAt: "createdAt",
      updatedAt: "updatedAt",
      categories: ({ _categories }) => {
        return _categories.map((category) => {
          const { _id: id, name, slug, createdAt, updatedAt } = category;

          return {
            id,
            name,
            slug,
            createdAt,
            updatedAt,
          };
        });
      },
    });

    return morphism(schema, payload);
  }
}

export default PostTransformer;
