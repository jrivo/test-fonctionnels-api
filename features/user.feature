Feature: API User

    Background:
        Given I load "fixture/json/users.json"
        And I am logged
        And I am "Admin"

# Scenario: Update role of user by Id - OK
#     Given I have a payload
#         | id        | role      |
#     When I call "PUT" "/users/{{id}}/change-role" with the payload
#     Then I should get a 200 response code
#     And I should get "an user updated"


# Scenario: Update role of user by Id - Error DB
#     Given I have a payload
#         | id | role |
#     When I call "PUT" "/users/{{id}}/change-role" with the payload
#     Then I should get a 401 response code
#     And I should get "an error"