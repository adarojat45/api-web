import request from "supertest";
import dotenv from "dotenv";
dotenv.config();
import app from "../app";
import { Post } from "../models/PostModel";
import { mongoConnect, mongoDisconnect } from "../config/mongoose";
import { PostInterface } from "../interfaces/postInterfaces";

let posts: PostInterface[];

beforeAll(async () => {
  await mongoConnect();

  let postsPayload = [];
  for (let i = 0; i < 15; i++) {
    const payload = {
      name: `Post name ${i}`,
      slug: `post-name-${i}`,
      description: `Post description ${i}`,
      excerpt: `Post excerpt ${i}`,
      tags: i % 2 === 0 ? ["tag-0", "tag-00"] : ["tags-1", "tags-11"],
      categories: [],
      isMakrdown: true,
      isActive: true,
    };
    postsPayload.push(payload);
  }
  const newPosts = await Post.create(postsPayload);
  posts = newPosts;
});

afterAll(async () => {
  await Post.deleteMany();
  mongoDisconnect();
});

describe("Post test cases", () => {
  describe("GET /posts", () => {
    test("[success - 200] GET /posts should be return an array of object with some object property", (done) => {
      request(app)
        .get("/posts")
        .then(({ body, status }) => {
          const { posts } = body;
          expect(status).toBe(200);
          expect(posts).toEqual(expect.any(Array));
          expect(posts.length).toBe(10);
          expect(posts[0]).toHaveProperty("id");
          expect(posts[0]).toHaveProperty("name");
          expect(posts[0]).toHaveProperty("excerpt");
          expect(posts[0]).toHaveProperty("tags");
          expect(posts[0].tags).toEqual(expect.any(Array));
          expect(posts[0].tags[0]).toEqual(expect.any(String));
          expect(posts[0]).toHaveProperty("categories");
          expect(posts[0].categories).toEqual(expect.any(Array));
          expect(posts[0]).not.toHaveProperty("description");
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    test("[success - 200] GET /posts?page=2 should be return an array of object with some object property and length equal 5", (done) => {
      request(app)
        .get("/posts?page=2")
        .then(({ body, status }) => {
          const { posts } = body;
          expect(status).toBe(200);
          expect(posts).toEqual(expect.any(Array));
          expect(posts.length).toBe(5);
          expect(posts[0]).toHaveProperty("id");
          expect(posts[0]).toHaveProperty("name");
          expect(posts[0]).toHaveProperty("excerpt");
          expect(posts[0]).toHaveProperty("tags");
          expect(posts[0].tags).toEqual(expect.any(Array));
          expect(posts[0].tags[0]).toEqual(expect.any(String));
          expect(posts[0]).toHaveProperty("categories");
          expect(posts[0].categories).toEqual(expect.any(Array));
          expect(posts[0]).not.toHaveProperty("description");
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    test("[success - 200] GET /posts?size=13 with size should be return an array of object with some object property and length to equal 13", (done) => {
      request(app)
        .get("/posts?limit=13")
        .then(({ body, status }) => {
          const { posts } = body;
          expect(status).toBe(200);
          expect(posts).toEqual(expect.any(Array));
          expect(posts.length).toBe(13);
          expect(posts[0]).toHaveProperty("id");
          expect(posts[0]).toHaveProperty("name");
          expect(posts[0]).toHaveProperty("excerpt");
          expect(posts[0]).toHaveProperty("tags");
          expect(posts[0].tags).toEqual(expect.any(Array));
          expect(posts[0].tags[0]).toEqual(expect.any(String));
          expect(posts[0]).toHaveProperty("categories");
          expect(posts[0].categories).toEqual(expect.any(Array));
          expect(posts[0]).not.toHaveProperty("description");
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });

  describe("GET /posts/:slug", () => {
    test("[success - 200] GET /posts/:slug should be return an object and status code 200", (done) => {
      request(app)
        .get(`/posts/${posts[0].slug}`)
        .then(({ status, body }) => {
          expect(status).toBe(200);
          expect(body).toEqual(expect.any(Object));
          expect(body).toHaveProperty("id");
          expect(body).toHaveProperty("name");
          expect(body).toHaveProperty("excerpt");
          expect(body).toHaveProperty("tags");
          expect(body.tags).toEqual(expect.any(Array));
          expect(body.tags[0]).toEqual(expect.any(String));
          expect(body).toHaveProperty("isMarkdown");
          expect(body).toHaveProperty("categories");
          expect(body.categories).toEqual(expect.any(Array));
          expect(body).toHaveProperty("description");
          expect(body).toHaveProperty("relatedPosts");
          expect(body.relatedPosts).toEqual(expect.any(Array));
          expect(body.relatedPosts[0]).toEqual(expect.any(Object));
          expect(body.relatedPosts[0]).toHaveProperty("id");
          expect(body.relatedPosts[0]).toHaveProperty("name");
          expect(body.relatedPosts[0]).toHaveProperty("excerpt");
          expect(body.relatedPosts[0]).toHaveProperty("tags");
          expect(body.relatedPosts[0].tags).toEqual(expect.any(Array));
          expect(body.relatedPosts[0].tags[0]).toEqual(expect.any(String));
          expect(body.relatedPosts[0]).toHaveProperty("categories");
          expect(body.relatedPosts[0].categories).toEqual(expect.any(Array));
          expect(body.relatedPosts[0]).not.toHaveProperty("description");
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    test("[failed - 404] GET /posts/:slug without valid id should be return error", (done) => {
      request(app)
        .get(`/posts/slug-jibris`)
        .then(({ status, body }) => {
          expect(status).toBe(404);
          expect(body).toEqual(expect.any(Object));
          expect(body).toHaveProperty("name", "NotFound");
          expect(body).toHaveProperty("messages");
          expect(body.messages).toEqual(expect.any(Array));
          expect(body.messages[0]).toEqual("Post not found");
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });
});
