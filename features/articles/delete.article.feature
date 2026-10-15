Feature: As an admin I can delete blog articles

  Scenario: Delete an article that exists
    Given I use admin token
    When I send a "DELETE" request to "/api/v1/articles/5e1f0a2b-0001-4000-8000-000000000001"
    Then the response status should be 204
    And I reset the database

  Scenario: Delete an article and verify it returns 404 afterwards
    Given I use admin token
    When I send a "DELETE" request to "/api/v1/articles/5e1f0a2b-0001-4000-8000-000000000001"
    Then the response status should be 204
    When I send a "GET" request to "/api/v1/articles/5e1f0a2b-0001-4000-8000-000000000001"
    Then the response status should be 404
    And I reset the database

  Scenario: Delete an article with ID that does not exist
    Given I use admin token
    When I send a "DELETE" request to "/api/v1/articles/5e1f0a2b-9999-4000-8000-999999999999"
    Then the response status should be 404

  Scenario: Delete an article with invalid ID format
    Given I use admin token
    When I send a "DELETE" request to "/api/v1/articles/invalid-id"
    Then the response status should be 400

  Scenario: Delete an article without token
    Given I do not use a token
    When I send a "DELETE" request to "/api/v1/articles/5e1f0a2b-0001-4000-8000-000000000001"
    Then the response status should be 401

  Scenario: Delete an article with wrong token
    Given I use a wrong token
    When I send a "DELETE" request to "/api/v1/articles/5e1f0a2b-0001-4000-8000-000000000001"
    Then the response status should be 403
