process.env.NODE_ENV = "test";
const chai = require("chai");
const { expect } = require("chai");
const app = require("../app");
const request = require("supertest")(app);
const connection = require("../connection");

describe("/api", () => {
  beforeEach(() => {
    return connection.seed.run();
  });
  after(() => connection.destroy());
  describe("/api/", () => {
    it("404 when incorrect path provided", () => {
      return request
        .get("/bananas")
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).to.equal("Error 404: Page Not Found");
        });
    });
    it("INVALID METHOD responds 405", () => {
      const invalidMethods = ["get", "patch", "put", "delete"];
      const methodPromises = invalidMethods.map(method => {
        return request[method]("/api")
          .expect(405)
          .then(({ body: { msg } }) => {
            expect(msg).to.equal("Method Not Allowed");
          });
      });
      return Promise.all(methodPromises);
    });
  });

  describe("/topics", () => {
    it("GET /responds with a 200 and contains certain keys", () => {
      return request
        .get("/api/topics")
        .expect(200)
        .then(({ body: { topics } }) => {
          expect(topics[0]).to.contain.keys("slug", "description");
        });
    });
    describe("GET errors", () => {
      it("INVALID METHOD responds 405", () => {
        const invalidMethods = ["patch", "put", "delete"];
        const methodPromises = invalidMethods.map(method => {
          return request[method]("/api/topics")
            .expect(405)
            .then(({ body: { msg } }) => {
              expect(msg).to.equal("Method Not Allowed");
            });
        });
        return Promise.all(methodPromises);
      });
    });
  });

  describe("/users/:username", () => {
    it("GET /responds with 200", () => {
      return request
        .get("/api/users/butter_bridge")
        .expect(200)
        .then(({ body: { user } }) => {
          expect(user).to.contain.keys("username", "name", "avatar_url");
        });
    });
    describe("GET /users/username ERRORS", () => {
      it("responds 404 user not found", () => {
        return request
          .get("/api/users/123")
          .expect(404)
          .then(({ body: { msg } }) => {
            expect(msg).to.equal("Error 404: Page Not Found");
          });
      });
      it("INVALID METHOD responds 405", () => {
        const invalidMethods = ["patch", "put", "delete"];
        const methodPromises = invalidMethods.map(method => {
          return request[method]("/api/users/lurker")
            .expect(405)
            .then(({ body: { msg } }) => {
              expect(msg).to.equal("Method Not Allowed");
            });
        });
        return Promise.all(methodPromises);
      });
    });
  });

  describe("/articles/:article_id", () => {
    describe("GET /articles/:article_id", () => {
      it("GET /responds 200 for a successful", () => {
        return request
          .get("/api/articles/2")
          .expect(200)
          .then(({ body: { article } }) => {
            expect(article).to.contain.keys(
              "author",
              "title",
              "body",
              "article_id",
              "topic",
              "created_at",
              "votes",
              "comment_count"
            );
          });
      });
      describe("GET /articles/article_id ERRORS", () => {
        it("responds 404 article not found", () => {
          return request
            .get("/api/articles/123")
            .expect(404)
            .then(({ body: { msg } }) => {
              expect(msg).to.equal("Error 404: Page Not Found");
            });
        });
        it("responds 400 bad request when invalid input", () => {
          return request
            .get("/api/articles/hello")
            .expect(400)
            .then(({ body: { msg } }) => {
              expect(msg).to.equal("Bad Request");
            });
        });
        it("INVALID METHOD responds 405", () => {
          const invalidMethods = ["post", "put"];
          const methodPromises = invalidMethods.map(method => {
            return request[method]("/api/articles/1")
              .expect(405)
              .then(({ body: { msg } }) => {
                expect(msg).to.equal("Method Not Allowed");
              });
          });
          return Promise.all(methodPromises);
        });
      });
    });
    describe("PATCH /articles/:article_id", () => {
      it("responds 200 for successful patch", () => {
        return request
          .patch("/api/articles/2")
          .send({ inc_votes: 24 })
          .expect(200)
          .then(({ body: { updatedArticle } }) => {
            expect(updatedArticle.votes).to.equal(24);
          });
      });
      it("responds 200 for a negative number", () => {
        return request
          .patch("/api/articles/1")
          .send({ inc_votes: -50 })
          .expect(200)
          .then(({ body: { updatedArticle } }) => {
            expect(updatedArticle.votes).to.equal(50);
          });
      });
      describe("PATCH /articles/:article_id ERRORS", () => {
        it("responds status: 400 when passed no body ", () => {
          return request
            .patch("/api/articles/1")
            .send({})
            .expect(400)
            .then(({ body: { msg } }) => {
              expect(msg).to.equal("Bad Request");
            });
        });
        it("responds 400 when passed an invalid data type", () => {
          return request
            .patch("/api/articles/1")
            .send({ inc_votes: "cat" })
            .expect(400)
            .then(({ body: { msg } }) => {
              expect(msg).to.equal("Bad Request");
            });
        });
        it("responds 400 when passed another property on body", () => {
          return request
            .patch("/api/articles/1")
            .send({ inc_votes: 2, title: "what a day" })
            .expect(400)
            .then(({ body: { msg } }) => {
              expect(msg).to.equal("Bad Request");
            });
        });
      });
    });
  });
  describe.only("/articles/:article_id/comments", () => {
    describe("POST /articles/:article_id/comments", () => {
      it("POST /responds with 201 for successful creation", () => {
        return request
          .post("/api/articles/1/comments")
          .send({ username: "rogersop", body: "What a load of glitter" })
          .expect(201)
          .then(({ body: { newComment } }) => {
            expect(newComment).to.contain.keys(
              "author",
              "body",
              "article_id",
              "comment_id"
            );
          });
      });
    });
  });
});
