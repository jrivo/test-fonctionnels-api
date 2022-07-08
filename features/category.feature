Feature: Category

    Scenario: should return all category
        Given I have no resources
        When I call "GET" "/categories"
        Then I should get a 200 response code
        And I should get an empty array


    Scenario: should create a category
        Given I am connected as "admin"
        And I have a payload
            | name | Category 1 |
        When I call "POST" "/categories" with the payload
        Then I should get a 201 response code
        And The property "id" should be present in the response
        And The property "name" should be "Category 1"

    Scenario: can create a category as a moderator
        Given I am connected as "MODERATOR"
        And I have a payload
            | name | Category 2 |
        When I call "POST" "/categories" with the payload
        Then I should get a 403 response code
