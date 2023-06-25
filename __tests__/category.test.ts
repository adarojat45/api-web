import request from "supertest";
import dotenv from "dotenv";
dotenv.config();
import app from "../app";
import CategoryModel, { Category } from "../models/CategoryModel";
import { mongoConnect, mongoDisconnect } from "../config/mongoose";
import { CategoryInterface } from "../interfaces/categoryInterface";

let categories: CategoryInterface[];

beforeAll(async () => {
  await mongoConnect();

  let categoriesPayload = [];
  for (let i = 0; i < 20; i++) {
    const payload = {
      name: `Category name ${i}`,
      slug: `category-name-${i}`,
      isActive: true,
    };
    categoriesPayload.push(payload);
  }
  const newCategories = await Category.create(categoriesPayload);
  categories = newCategories;
});

beforeEach(() => {
  jest.restoreAllMocks();
});

afterAll(async () => {
  await Category.deleteMany();
  mongoDisconnect();
});

describe("category test cases", () => {
  describe("GET /categories", () => {
    test("[success - 200] GET /categories should be return an array of object with with status code 200", (done) => {
      request(app)
        .get("/categories")
        .then(({ body, status }) => {
          expect(status).toBe(200);
          expect(body).toEqual(expect.any(Array));
          expect(body.length).toBe(20);
          expect(body[0]).toHaveProperty("id");
          expect(body[0]).toHaveProperty("name");
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    test("[failed - 500] GET /categories should be return error", (done) => {
      jest.spyOn(CategoryModel, "findAll").mockRejectedValue("Error");

      request(app)
        .get("/categories")
        .then(({ body, status }) => {
          expect(status).toBe(500);
          expect(body).toEqual(expect.any(Object));
          expect(body).toHaveProperty("name", "InternalServerError");
          expect(body).toHaveProperty("messages");
          expect(body.messages).toEqual(expect.any(Array));
          done();
        });
    });
  });

  describe("GET /categories/:id", () => {
    test("[success - 200] GET /categories/:slug should be return an object and status code 200", (done) => {
      request(app)
        .get(`/categories/${categories[0].slug}`)
        .then(({ status, body }) => {
          expect(status).toBe(200);
          expect(body).toEqual(expect.any(Object));
          expect(body).toHaveProperty("id");
          expect(body).toHaveProperty("name");
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    test("[failed - 404] GET /categories/:slug without valid id should be return error", (done) => {
      request(app)
        .get(`/categories/6169cff54ef04d6caef22038`)
        .then(({ status, body }) => {
          expect(status).toBe(404);
          expect(body).toEqual(expect.any(Object));
          expect(body).toHaveProperty("name", "NotFound");
          expect(body).toHaveProperty("messages");
          expect(body.messages).toEqual(expect.any(Array));
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });
});
