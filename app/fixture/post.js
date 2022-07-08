const Fake = require ('@faker-js/faker');
const fs = require('fs');


// Faker URL
// https://fakerjs.dev/guide/

const POSTS = [];
Fake.faker.locale = 'fr';

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function get_random_author(usersData) {
  const randomNbr = getRandomInt(usersData.length)
  const user = usersData[randomNbr]
  return {
    id: user.id,
    username: user.username
  }
}

function get_random_catgory(categoriesData) {
  const randomNbr = getRandomInt(categoriesData.length)
  const category = categoriesData[randomNbr]
  return {
    id: category.id,
    name: category.name
  }
}

function add_post_to_author(post, data) {
  data.map(user => {
    if (user.id===post.authorId) {
      user.posts.push(post)
    }
  })
  return data;
}

function add_post_to_category(post, data) {
  data.map(category => {
    if (category.id===post.categoryId) {
      category.posts.push(post)
    }
  })
  return data;
}

function prompt_post(path) {
  console.log(">> Posts");
  const posts = require(path)
  posts.forEach(post => {
    console.log(post);
  });
}

function createRandomPosts(usersData, categoriesData) {
  const author = get_random_author(usersData)
  const category = get_random_catgory(categoriesData)
  const new_post = {
    id: Fake.faker.datatype.uuid(),
    title: Fake.faker.vehicle.vehicle(),
    content: Fake.faker.lorem.paragraph(),
    authorId: author.id,
    author: author.username,
    categoryId: category.id,
    category: category.name,
    createdAt: Fake.faker.date.past(1),
    updatedAt: Fake.faker.date.past(1)
  }
  return new_post;
}

function make_posts() {
  const pathPost = 'app/fixture/json/posts.json'
  const pathUser = 'app/fixture/json/users.json'
  const pathCategory = 'app/fixture/json/category.json'
  const authors = require('./json/users.json')
  const categories = require('./json/category.json')
  let new_users = [];
  let new_categories = [];
  for (let i = 0; i < 5; i++) {
    const post = createRandomPosts(authors, categories)
    POSTS.push(post);

    new_users = add_post_to_author(post, authors)
    new_categories = add_post_to_category(post, categories)
  }
  const dataUser = JSON.stringify(new_users)
  fs.writeFileSync(pathUser, dataUser)

  const dataCategory = JSON.stringify(new_categories)
  fs.writeFileSync(pathCategory, dataCategory)

  const dataPost = JSON.stringify(POSTS)
  fs.writeFileSync(pathPost, dataPost)
}

module.exports = {
  make_posts,
  prompt_post
}
