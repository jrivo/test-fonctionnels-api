Feature: Category

    Scenario: should return all category
        Given I have no resources
        When I call "GET" "/categories"
        Then I should get a 200 response code
        And I should get an empty array


    Scenario: should return a category
        Given I am connected as "admin"
        And I have a ressource
        When I call "GET" "/categories"
        Then I should get a 200 response code
        And I should get an array with 1 element




    Scenario: should create a category
        Given I am connected as "admin"
        And I have a payload
            | name | Category 1 |
        When I call "POST" "/categories" with the payload
        Then I should get a 201 response code
        And The property "id" should be present in the response
        And The property "name" should be "Category 1"


    Scenario: Cannot create a category if not logged in
        And I have a payload
            | name | Category 1 |
        When I call "POST" "/categories" with the payload
        Then I should get a 401 response code


    Scenario: can create a category as a moderator
        Given I am connected as "MODERATOR"
        And I have a payload
            | name | Category 2 |
        When I call "POST" "/categories" with the payload
        Then I should get a 201 response code

    Scenario: can update a category as an admin
        Given I am connected as "admin"
        And I have a ressource
        When I call "PUT" with the payload
            | name | Category 2 |
        Then I should get a 200 response code

    Scenario: cannot update a category that doesn't exist
        Given I am connected as "admin"
        And I have a ressource
        When I call "PUT" "/categories/0456"
        Then I should get a 400 response code

    Scenario: cannot update a category as a moderator
        Given I am connected as "MODERATOR"
        And I have a ressource
        When I call "PUT" with the payload
            | name | Category 2 |
        Then I should get a 403 response code

    Scenario: cannot update a category if not logged in
        And I have a ressource
        When I call "PUT" with the payload
            | name | Category 2 |
        Then I should get a 401 response code

    Scenario: cannot delete a category if not logged in
        And I have a ressource
        When I call "DELETE"
        Then I should get a 401 response code


    Scenario: cannot delete a category as a moderator
        Given I am connected as "MODERATOR"
        And I have a ressource
        When I call "DELETE"
        Then I should get a 403 response code

    Scenario: cannot delete a category that doesn't exist
        Given I am connected as "ADMIN"
        When I call "DELETE" "/categories/0456"
        Then I should get a 204 response code

    Scenario: should a 404 page (get)
        When I call "GET" "/dsfsdfsfds"
        Then I should get a 404 response code

    Scenario: should a 404 page (post)
        When I call "GET" "/dsfsdfsfds"
        Then I should get a 404 response code


    Scenario: should a 404 page (put)
        When I call "GET" "/dsfsdfsfds"
        Then I should get a 404 response code

    Scenario: should a 404 page (delete)
        When I call "GET" "/dsfsdfsfds"
        Then I should get a 404 response code

# Scenario: can delete a category as an admin
#     Given I am connected as "admin"
#     And I have a ressource
#     When I call "DELETE"
#     Then I should get a 200 response code
#     And I should get an empty array