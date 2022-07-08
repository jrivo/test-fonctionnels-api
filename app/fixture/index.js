const users = require("./users");
const category = require("./category");
const post = require("./post");

async function create_fixture() {
    console.log("***** CREATE FIXTURE *****");
    await users.make_users()
    // await users.prompt_user('./json/users.json')

    await category.make_categories()
    // await category.prompt_catgory('./json/category.json')

    await post.make_posts()
    // await post.prompt_post('./json/posts.json')
}

async function prompt_fixture() {
    console.log("***** FIN *****");
    await users.prompt_user('./json/users.json')
    await category.prompt_catgory('./json/category.json')
    await post.prompt_post('./json/posts.json')
}

async function main(params) {
    await create_fixture()
    await prompt_fixture()
}

main();

module.exports = {
    create_fixture
}