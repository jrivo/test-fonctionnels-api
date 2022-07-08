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

Before(function () {
  this.client = request(require("../server.js"));
  this.username = generateString(12);
  this.password = generateString(12);
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
});

Given("I have no resources", function () {});

Given("I have a ressource", async function () {
  this.ressource = await this.client["post"]("/categories")
    .set("Content-Type", "application/json")
    .set("Authorization", "Bearer " + this.token)
    .send({
      name: "test",
    });
});

When("I call {string} with the payload", async function (string, dataTable) {
  const payload = dataTable.rowsHash();
  // console.log("payload", payload);
  // console.log("body id ", this.ressource.body.id);
  this.response = await this.client[string.toLowerCase()](
    "/categories/" + this.ressource.body.id
  )
    .set("Content-Type", "application/json")
    .set("Authorization", "Bearer " + this.token)
    .send(payload);
  console.log("response body", this.response.body);
});

When("I call {string}", async function (string) {
  this.response = await this.client[string.toLowerCase()](
    "/categories/" + this.ressource.body.id
  )
    .set("Content-Type", "application/json")
    .set("Authorization", "Bearer " + this.token)
    .send();
});

When("I call {string} {string}", async function (method, url) {
  if (this.token) {
    this.response = await this.client[method.toLowerCase()](url)
      .set("Content-Type", "application/json")
      .set("Authorization", "Bearer " + this.token)
      .send();
  } else {
    this.response = await this.client[method.toLowerCase()](url).send();
  }
});

Then("I should get a {int} response code", function (int) {
  expect(this.response.status).toBe(int);
});

Then("I should get an empty array", function () {
  expect(this.response.body).toEqual([]);
});

Then("I should get an array with {int} element", function (int) {
  expect(this.response.body.length).toEqual(int);
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
