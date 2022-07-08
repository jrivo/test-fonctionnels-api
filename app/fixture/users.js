const Fake = require ('@faker-js/faker');
const fs = require('fs');

// Faker URL
// https://fakerjs.dev/guide/

const USERS = [];
Fake.faker.locale = 'fr';

function prompt_user(path) {
  console.log(">> Users");
  const users = require(path)
  users.forEach(user => {
    console.log(user);
  });
}

function createRandomUser() {
  return {
    id: Fake.faker.datatype.uuid(),
    username: Fake.faker.internet.userName('User'),
    email: Fake.faker.internet.email(),
    password: Fake.faker.internet.password(12),
    posts: [],
    role: 'USER',
    createdAt: Fake.faker.date.past(1),
    updatedAt: Fake.faker.date.past(1)
  };
}


function make_users() {
  const path = 'app/fixture/json/users.json'

  for (let i = 0; i < 5; i++) {
    let user = createRandomUser();
    if (i===1) {
      user.role = 'ADMIN'
      USERS.push(user);
    }
    else if (i%4===0) {
      user.role = 'MODERATOR'
      USERS.push(user);
    }
    else{
      USERS.push(user);
    }
  }
  const data = JSON.stringify(USERS)
  fs.writeFileSync(path, data)
}


module.exports = {
  make_users,
  prompt_user,
}