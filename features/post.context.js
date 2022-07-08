const {
  Before,
  Given,
  When,
  Then,
  After,
  AfterAll,
  BeforeAll,
} = require("@cucumber/cucumber");
const request = require("supertest");
const { expect } = require("expect");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

function generateString(length) {
  let result = " ";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

BeforeAll(async () => {
  await prisma.category.create({ data: { name: "testCategory" } });
})

Before(async function () {
  this.client = request(require("../server.js"));
  this.username = generateString(12);
  this.password = generateString(12);
});

After(async () => {
  await prisma.post.deleteMany({});
});

AfterAll(async function () {
  //   const { connection } = require("../models");
  //   connection.close();
  await prisma.category.deleteMany({});
});

Given("I am connected as {string} (with id)", async function (role) {
  const response = await this.client["post"]("/register").send({
    username: this.username,
    password: this.password,
    email: this.username + "@email.com",
    role: role?.toUpperCase(),
  });

  const loginResponse = await this.client["post"]("/login").send({
    username: this.username,
    password: this.password,
  });
  this.token = loginResponse.body.accessToken;
  this.id = loginResponse.body.id;
});

Given("I have no posts", function () {
  posts = prisma.post.findMany({}).then((posts) => {
    expect(posts.length).toEqual(0);
  })
});

Given('I have a post', function () {
  posts = prisma.post.findMany({}).then((posts) => {
    expect(posts.length).toBeGreaterThan(0);
  })
});

Then("I should get an empty array", function () {
  expect(this.response.body).toEqual([]);
});

Given("I have a payload", function (dataTable) {
  this.payload = dataTable.rowsHash();
});

When("I call {string} {string} with the payload", async function (method, url) {
  this.response = await this.client[method.toLowerCase()](url)
    .set("Content-Type", "application/json")
    .set("Authorization", "Bearer " + this.token)
    .send(this.payload);
});

When('I am not the owner of the post', function () {
  prisma.post.findUnique({
    where: {
      id: 1,
    },
  }).then((post) => {
    expect(post.authorId).not.toEqual(this.id);
  })
  
});

Then(
  "The property {string} should be present in the response",
  function (string) {
    expect(this.response.body[string]).toBeDefined();
  }
);

Then("The property {string} should be {string}", function (string, string2) {
  expect(this.response.body[string]).toBe(string2);
});

Then('I should get an error message', function () {
  expect(this.response.body[error]).toBeDefined();
});
