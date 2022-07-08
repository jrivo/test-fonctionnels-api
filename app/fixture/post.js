const Fake = require ('@faker-js/faker');
const fs = require('fs');

// Faker URL
// https://fakerjs.dev/guide/

const POSTS = [];
Fake.faker.locale = 'fr';

function find_author() {
  return {
    id: Fake.faker.datatype.uuid(),
    username: Fake.faker.internet.userName()
  }
}

function find_catgory() {
  return {
    id: Fake.faker.datatype.uuid(),
    name: Fake.faker.internet.userName()
  }
}

function prompt_post(data) {
  console.log("prompt_post");
  data.forEach(post => {
    console.log(post);
  });
}

function createRandomPosts() {
  const author = find_author()
  const category = find_catgory()
  return {
    id: Fake.faker.datatype.uuid(),
    title: Fake.faker.vehicle.vehicle(),
    content: Fake.faker.lorem.paragraph(),
    authorId: author.id,
    author: author.username,
    categoryId: category.id,
    category: category.name,
    createdAt: Fake.faker.date.past(1),
    updatedAt: Fake.faker.date.past(1)
  };
}

function make_posts() {
  for (let i = 0; i < 10; i++) {
    POSTS.push(createRandomPosts());
  }
  prompt_post(POSTS)
  const data = JSON.stringify(POSTS)
  fs.writeFileSync('app/fixture/posts.json', JSON.stringify(data))
}

module.exports = {
  make_posts,
}
