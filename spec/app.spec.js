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

  describe("/topics GET", () => {
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
});
