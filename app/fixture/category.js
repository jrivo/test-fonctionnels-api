const Fake = require ('@faker-js/faker');
const fs = require('fs');

// Faker URL
// https://fakerjs.dev/guide/

const CATEGORIES = [];
Fake.faker.locale = 'fr';

function prompt_catgory(data) {
  console.log("prompt_catgory");
  data.forEach(category => {
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
  for (let i = 0; i < 10; i++) {
    CATEGORIES.push(createRandomCategory());
  }
  prompt_catgory(CATEGORIES)
  const data = JSON.stringify(CATEGORIES)
  fs.writeFileSync('app/fixture/category.json', data)
}


module.exports = {
  make_categories,
}