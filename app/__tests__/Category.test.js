const supertest = require("supertest");
const app = require("../../server.js");
const controller = require("../../app/controllers/category.controller");
// const FixtureLoader = require("../features/utils/FixtureLoader.js");
// const { sequelize } = require("../models");
const request = supertest(app);
const fs = require("fs/promises");

let token = "";
let moderatorToken = "";
// beforeAll(async () => {
//   sequelize.constructor._cls = new Map();
// });

// beforeEach(async () => {
//   const trx = await sequelize.transaction();
//   sequelize.constructor._cls.set("transaction", trx);
// });
// afterEach(async () => {
//   await sequelize.constructor._cls.get("transaction").rollback();
// });

// afterAll(() => {
//   sequelize.close();
// });

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

function generateString(length) {
  let result = " ";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

describe("Product routes", () => {
  afterEach(async () => {
    await controller.prisma.category.deleteMany({});
  });

  const username = generateString(10);
  const password = generateString(10);
  const moderatorUsername = generateString(10);
  const moderatorPassword = generateString(10);

  it("should sign up successfully as admin", async () => {
    const response = await request.post("/register").send({
      username: username,
      password: password,
      email: username + "@email.com",
      role: "ADMIN",
    });
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("User was registered successfully!");
  });

  it("should login successfully as admin", async () => {
    const response = await request.post("/login").send({
      username: username,
      password: password,
    });
    expect(response.status).toBe(200);
    expect(response.body.accessToken).toBeDefined();
    token = response.body.accessToken;
  });

  it("should sign up successfully as moderator", async () => {
    const response = await request.post("/register").send({
      username: moderatorUsername,
      password: moderatorPassword,
      email: moderatorUsername + "@email.com",
      role: "MODERATOR",
    });
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("User was registered successfully!");
  });

  it("should login successfully as moderator", async () => {
    const response = await request.post("/login").send({
      username: moderatorUsername,
      password: moderatorPassword,
    });
    expect(response.status).toBe(200);
    expect(response.body.accessToken).toBeDefined();
    moderatorToken = response.body.accessToken;
  });

  it("can't login when username is wrong", async () => {
    const response = await request.post("/login").send({
      username: "wrong username",
      password: password,
    });
    expect(response.status).toBe(401);
  });

  it("can't login when password is wrong", async () => {
    const response = await request.post("/login").send({
      username: username,
      password: "wrong password",
    });
    expect(response.status).toBe(401);
  });

  it("should return a 200 status", async () => {
    const response = await request.get("/categories").send();
    expect(response.status).toBe(200);
  });

  it("should return categories", async () => {
    const response = await request.get("/categories").send();
    expect(response.status).toBe(200);
  });

  it("should return an empty array", async () => {
    const response = await request.get("/categories").send();
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(0);
  });

  it("should be able to create a new category", async () => {
    const categoryName = generateString(10);
    const response = await request
      .post("/categories")
      .set("Content-Type", "application/json")
      .set("Authorization", "Bearer " + token)
      .send({
        name: categoryName,
      });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name", categoryName);
  });

  it("can't create a new category as a moderator", async () => {
    const categoryName = generateString(10);
    const response = await request
      .post("/categories")
      .set("Content-Type", "application/json")
      .set("Authorization", "Bearer " + moderatorToken)
      .send({
        name: categoryName,
      });
    expect(response.status).toBe(403);
  });

  it("should not have access when token is incorect", async () => {
    const categoryName = generateString(10);
    const response = await request
      .post("/categories")
      .set("Content-Type", "application/json")
      .set("Authorization", "Bearer " + token + "jh")
      .send({
        name: categoryName,
      });
    expect(response.status).toBe(401);
  });

  it("should not have access when token isn't provided", async () => {
    const categoryName = generateString(10);
    const response = await request
      .post("/categories")
      .set("Content-Type", "application/json")
      .send({
        name: categoryName,
      });
    expect(response.status).toBe(401);
  });

  it("should not have access when token isn't provided", async () => {
    const categoryName = generateString(10);
    const response = await request
      .post("/categories")
      .set("Content-Type", "application/json")
      .send({
        name: categoryName,
      });
    expect(response.status).toBe(401);
  });

  it("should be able to update a cetagory", async () => {
    const categoryName = generateString(10);
    const response = await request
      .post("/categories")
      .set("Content-Type", "application/json")
      .set("Authorization", "Bearer " + token)
      .send({
        name: categoryName,
      });
    expect(response.status).toBe(201);

    const updatedResponse = await request
      .put("/categories/" + response.body.id)
      .set("Content-Type", "application/json")
      .set("Authorization", "Bearer " + token)
      .send({
        name: "updated test value",
      });

    expect(updatedResponse.status).toBe(200);
    expect(updatedResponse.body.name).toBe("updated test value");
  });

  it("should not be able to update a category without a token", async () => {
    const categoryName = generateString(10);
    const response = await request
      .put("/categories/5")
      .set("Content-Type", "application/json")
      .send({
        name: categoryName,
      });
    expect(response.status).toBe(401);
  });

  // it("should be able to delete a category", async () => {
  //   const categoryName = generateString(10);
  //   const response = await request
  //     .post("/categories")
  //     .set("Content-Type", "application/json")
  //     .set("Authorization", "Bearer " + token)
  //     .send({
  //       name: categoryName,
  //     });
  //   expect(response.status).toBe(201);
  //   const deleteResponse = await request
  //     .delete("/categories/" + response.body.id)
  //     .set("Content-Type", "application/json")
  //     .set("Authorization", "Bearer " + token)
  //     .send({});
  //   expect(deleteResponse.status).toBe(204);
  // });

  it("should not be able to delete a category that doesn't exist", async () => {
    const response = await request
      .delete("/categories/12156")
      .set("Content-Type", "application/json")
      .set("Authorization", "Bearer " + token)
      .send({});
    expect(response.status).toBe(204);
  });

  it("returns a 404 page (get)", async () => {
    const response = await request.get("/pagethatdoesntexist").send({});
    expect(response.status).toBe(404);
  });

  it("returns a 404 page (post)", async () => {
    const response = await request.post("/pagethatdoesntexist").send({});
    expect(response.status).toBe(404);
  });

  it("returns a 404 page (put)", async () => {
    const response = await request.put("/pagethatdoesntexist").send({});
    expect(response.status).toBe(404);
  });

  it("returns a 404 page (delete)", async () => {
    const response = await request.delete("/pagethatdoesntexist").send({});
    expect(response.status).toBe(404);
  });

  // add 404 page test
  // test if it has rights
  // add login test
});
