import { morphism, createSchema } from "morphism";
import {
  CategoryListInputInterface,
  CategoryListOutputInterface,
  CategoryDetailInputInterface,
  CategoryDetailOutputInterface,
} from "../interfaces/categoryInterface";

class CategoryTransformer {
  static list(
    payload: CategoryListInputInterface[]
  ): CategoryListOutputInterface[] {
    const schema = createSchema<
      CategoryListOutputInterface,
      CategoryListInputInterface
    >({
      id: "_id",
      name: "name",
      slug: "slug",
      isActive: "isActive",
      isDeleted: "isDeleted",
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    });
    return morphism(schema, payload);
  }

  static detail(
    payload: CategoryDetailInputInterface
  ): CategoryDetailOutputInterface {
    const schema = createSchema<
      CategoryDetailOutputInterface,
      CategoryDetailInputInterface
    >({
      id: "_id",
      name: "name",
      slug: "slug",
      isActive: "isActive",
      isDeleted: "isDeleted",
      createdAt: "createdAt",
      updatedAt: "updatedAt",
      posts: ({ _posts }) => {
        return _posts.map((post) => {
          return {
            id: post._id,
            name: post.name,
            slug: post.slug,
            excerpt: post.excerpt,
            tags: post.tags,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
          };
        });
      },
    });

    return morphism(schema, payload);
  }
}

export default CategoryTransformer;
