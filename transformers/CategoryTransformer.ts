import { morphism, createSchema } from "morphism";

interface InputListInterface {
  _id: string;
  name: string;
  slug: string;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface OutputListInterface {
  id: string;
  name: string;
  slug: string;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface InputDetailInterface {
  _id: string;
  name: string;
  slug: string;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface OutputDetailInterface {
  id: string;
  name: string;
  slug: string;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

class CategoryTransformer {
  static list(payload: InputListInterface[]) {
    const schema = createSchema<OutputListInterface, InputListInterface>({
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

  static detail(payload: InputDetailInterface) {
    const schema = createSchema<OutputDetailInterface, InputDetailInterface>({
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
}

export default CategoryTransformer;