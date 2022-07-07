const supertest = require("supertest");
const app = require("../../server.js");
// const FixtureLoader = require("../features/utils/FixtureLoader.js");
// const { sequelize } = require("../models");
const request = supertest(app);
const fs = require("fs/promises");

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
  it("should return a 200 status", async () => {
    const response = await request.get("/categories").send();
    expect(response.status).toBe(200);
  });

  it("should return one category", async () => {
    const response = await request.get("/categories").send();
    expect(response.status).toBe(200);
    // expect(response.body).toHaveLength(1);
  });

  it("should create a new category", async () => {
    const categoryName = generateString(10);
    const response = await request
      .post("/categories")
      .set("Content-Type", "application/json")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjU3MTAxMDAyLCJleHAiOjE2NTcxODc0MDJ9.yaVsggJNdU_6Htg1tRq3h7zNThccFkfumRh6jGb0HAQ"
      )
      .send({
        name: categoryName,
      });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name", categoryName);
  });

  it("should not have access when token is incorect", async () => {
    const categoryName = generateString(10);
    const response = await request
      .post("/categories")
      .set("Content-Type", "application/json")
      .set(
        "Authorization",
        "Bearer eyJhbGcidsfdOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjU3MTAxMDAyLCJleHAiOjE2NTcxODc0MDJ9.yaVsggJNdU_6Htg1tRq3h7zNThccFkfumRh6jGb0HAQ"
      )
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

  // it("should return all products with data", async () => {
  //   await FixtureLoader(
  //     await fs.realpath(__dirname + "/../features/fixtures/product.json")
  //   );
  //   const response = await request.get("/products").send();
  //   expect(response.status).toBe(200);
  //   expect(response.body).toHaveLength(3);
  // });
});
