Feature: Post

    Scenario: should return all posts
        Given I have a post
        When I call "GET" "/posts"
        Then I should get a 200 response code
        And I should get all posts

    Scenario: should return all posts empty
        Given I have no posts
        When I call "GET" "/posts"
        Then I should get a 200 response code
        And I should get an empty array

    Scenario: should return a post
        Given I have a post
        When I call "GET" "/posts/1"
        Then I should get a 200 response code
        And I should get one post

    Scenario: should return a post that does not exists
        Given I have no posts
        When I call "GET" "/posts/1321612316"
        Then I should get a 404 response code

    Scenario: should create a post
        Given I have a payload
            | title | content | categoryId |
        When I call "POST" "/posts"
        Then I should get a 201 response code
        And I should get the created post

    Scenario: should create a post with invalid payload
        Given I have a payload
        But the payload is missing one or more fields
        When I call "POST" "/posts"
        Then I should get a 400 response code
        And I should get an error message

    Scenario: should update a post
        Given I have a post
        And I have a payload
            | title | content | categoryId |
        When I call "PUT" "/posts/1"
        Then I should get a 200 response code
        And I should get the updated post

    Scenario: should update a post with invalid payload
        Given I have a post
        And I have a payload
        But the payload is missing one or more fields
        When I call "PUT" "/posts/1"
        Then I should get a 400 response code
        And I should get an error message

    Scenario: should update a post that does not exist
        Given I have no posts
        And I have a payload
            | title      | test |
            | content    | test |
            | categoryId | 1    |
        When I call "PUT" "/posts/1"
        Then I should get a 404 response code

    Scenario: should update a post that is not mine as user
        Given I am connected as "user" (with id)
        And I have a post
        And I have a payload
            | title | content | categoryId |
        When I call "PUT" "/posts/2"
        But I am not the owner of the post
        Then I should get a 403 response code

    Scenario: should delete a post
        Given I have a post
        When I call "DELETE" "/posts/1"
        Then I should get a 200 response code

    Scenario: should delete a post that does not exist
        Given I am connected as "admin" (with id)
        And I have no posts
        When I call "DELETE" "/posts/1561516513513"
        Then I should get a 404 response code

    Scenario: should delete a post as user
        Given I am connected as "user" (with id)
        When I call "DELETE" "/posts/1"
        Then I should get a 403 response code
