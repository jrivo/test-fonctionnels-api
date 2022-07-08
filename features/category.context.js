const {
  Before,
  Given,
  When,
  Then,
  After,
  AfterAll,
} = require("@cucumber/cucumber");
const request = require("supertest");
const { expect } = require("expect");
const controller = require("../app/controllers/category.controller");

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

function generateString(length) {
  let result = " ";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

const username = generateString(12);
const password = generateString(12);
let token = "";

Before(function () {
  this.client = request(require("../server.js"));
});

After(async () => {
  await controller.prisma.category.deleteMany({});
});

AfterAll(function () {
  //   const { connection } = require("../models");
  //   connection.close();
});

Given("I am connected as {string}", async function (role) {
  const response = await this.client["post"]("/register").send({
    username: username,
    password: password,
    email: username + "@email.com",
    role: role?.toUpperCase(),
  });

  const loginResponse = await this.client["post"]("/login").send({
    username: username,
    password: password,
  });
  this.token = loginResponse.body.accessToken;
});

Given("I have no resources", function () {});

When("I call {string} {string}", async function (method, url) {
  this.response = await this.client[method.toLowerCase()](url).send();
});

Then("I should get a {int} response code", function (int) {
  expect(this.response.status).toBe(int);
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

Then(
  "The property {string} should be present in the response",
  function (string) {
    expect(this.response.body[string]).toBeDefined();
  }
);

Then("The property {string} should be {string}", function (string, string2) {
  expect(this.response.body[string]).toBe(string2);
});
