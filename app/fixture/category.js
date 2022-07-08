const Fake = require ('@faker-js/faker');
const fs = require('fs');

// Faker URL
// https://fakerjs.dev/guide/

const CATEGORIES = [];
Fake.faker.locale = 'fr';

function prompt_catgory(path) {
  console.log(">> Categories");
  const categories = require(path)
  categories.forEach(category => {
    console.log(category);
  });
}

function createRandomCategory() {
  return {
    id: Fake.faker.datatype.uuid(),
    name: Fake.faker.company.companyName(),
    posts: [],
    createdAt: Fake.faker.date.past(1),
    updatedAt: Fake.faker.date.past(1)
  };
}

function make_categories() {
  const path = 'app/fixture/json/category.json'
  for (let i = 0; i < 3; i++) {
    CATEGORIES.push(createRandomCategory());
  }
  const data = JSON.stringify(CATEGORIES)
  fs.writeFileSync(path, data)
}


module.exports = {
  make_categories,
  prompt_catgory
}