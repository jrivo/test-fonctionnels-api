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
const fixture = require("../app/fixture")

Before(function () {
  this.client = request(require("../server.js"));
});

After(function () {
  //   const { connection } = require("../models");
  //   connection.query('DELETE FROM "Products"');
});

AfterAll(function () {
  //   const { connection } = require("../models");
  //   connection.close();
});


// BACKGROUND

Given("I load {string}", async function (string) {
  // Write code here that turns the phrase above into concrete actions
  console.log('Create fixture '+string);
  fixture.create_fixture()
});

Given("I am logged", async function () {
  // Write code here that turns the phrase above into concrete actions
  console.log('Logged');
});

Given("I am {string}", async function (string) {
  // Write code here that turns the phrase above into concrete actions
  console.log('Role: '+string);
});


// SCENARIO

Given("I have a payload", function () {
  // Write code here that turns the phrase above into concrete actions
});


When("I call {string} {string} with the payload", async function (method, url) {
  // Write code here that turns the phrase above into concrete actions
  this.response = await this.client[method.toLowerCase()](url).send();
});

Then("I should get a {int} response code", function (int) {
  // Then('I should get a {float} response code', function (float) {
  // Write code here that turns the phrase above into concrete actions
  expect(this.response.status).toBe(int);
});

Then("I should get {string}", function () {
  // Write code here that turns the phrase above into concrete actions
  expect(this.response.body).toEqual([]);
});
