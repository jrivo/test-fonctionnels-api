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
});

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

Given("I am connected as {string} \\(with id)", async function (role) {
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
  console.log(loginResponse.body.accessToken);
  this.token = loginResponse.body.accessToken;
  this.id = loginResponse.body.id;
});

Given("I have no posts", function () {
  posts = prisma.post.findMany({}).then((posts) => {
    expect(posts.length).toEqual(0);
  });
});

Given("I have a post", async function () {
  posts = prisma.post.findMany({}).then((posts) => {
    expect(posts.length).toEqual(1);
  });
});

Given("the payload is missing one or more fields", function () {
  this.payload = { title: "test" };
});

Then('I should get the created post', function () {
  expect(this.response.body.length).toEqual(1);
});

Then('I should get the updated post', function () {
  expect(this.response.body.length).toEqual(1);
});

Then("I should get an error message", function () {
  expect(this.response.body[error]).toBeDefined();
});

Then("I should get one post", function () {
  expect(this.response.body.length).toEqual(1);
});

Then("I should get all posts", function () {
  expect(this.response.body.length).toBeGreaterThanOrEqual(1);
});
