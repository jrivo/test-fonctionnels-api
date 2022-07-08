const Fake = require ('@faker-js/faker');
const fs = require('fs');

// Faker URL
// https://fakerjs.dev/guide/

const USERS = [];
Fake.faker.locale = 'fr';

function prompt_user(data) {
  console.log("prompt_post");
  data.forEach(user => {
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
  for (let i = 0; i < 10; i++) {
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
  prompt_user(USERS);
  const data = JSON.stringify(USERS)
  fs.writeFileSync('app/fixture/users.json', data)
}


module.exports = {
  make_users,
}