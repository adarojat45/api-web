const request = require("supertest");
const app = require("../app");
const mongoose = require("../config/mongoose");
const PostSchema = require("../schemas/postSchema");

const Post = mongoose.model("Post", PostSchema);

let posts = [];

beforeAll(async () => {
	let postsPayload = [];
	for (let i = 0; i < 20; i++) {
		const payload = {
			name: `Post name ${i}`,
			slug: `post-name-${i}`,
			description: `Post description ${i}`,
			excerpt: `Post excerpt ${i}`,
			tags: ["tags1", "tags2"],
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
	mongoose.disconnect();
});

describe("Post test cases", () => {
	describe("GET /posts", () => {
		test("[success - 200] GET /posts should be return an array of object with some object property", (done) => {
			request(app)
				.get("/posts")
				.then(({ body, status }) => {
					expect(status).toBe(200);
					expect(body).toEqual(expect.any(Array));
					expect(body.length).toBe(20);
					expect(body[0]).toHaveProperty("id");
					expect(body[0]).toHaveProperty("name");
					expect(body[0]).toHaveProperty("excerpt");
					expect(body[0]).toHaveProperty("tags");
					expect(body[0].tags).toEqual(expect.any(Array));
					expect(body[0].tags[0]).toEqual(expect.any(String));
					expect(body[0]).toHaveProperty("isMarkdown");
					expect(body[0]).toHaveProperty("categories");
					expect(body[0].categories).toEqual(expect.any(Array));
					expect(body[0]).toHaveProperty("isActive");
					expect(body[0]).toHaveProperty("isDeleted");
					expect(body[0]).not.toHaveProperty("description");
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
					expect(body).toHaveProperty("isActive");
					expect(body).toHaveProperty("isDeleted");
					expect(body).toHaveProperty("description");
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
