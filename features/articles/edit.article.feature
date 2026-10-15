Feature: As an admin I can edit blog articles

  Scenario: Edit an article that exists with valid data
    Given I use admin token
    When I send a "PATCH" request to "/api/v1/articles/5e1f0a2b-0001-4000-8000-000000000001" with body:
      """json
      {
        "title": "Updated Title",
        "content": "Updated content for the article."
      }
      """
    Then the response status should be 204

  Scenario: Edit an article and verify publication date stays the same
    Given I use admin token
    When I send a "GET" request to "/api/v1/articles/5e1f0a2b-0001-4000-8000-000000000001"
    Then the response status should be 200
    When I send a "PATCH" request to "/api/v1/articles/5e1f0a2b-0001-4000-8000-000000000001" with body:
      """json
      {
        "title": "Updated Title Again",
        "content": "Updated content again."
      }
      """
    Then the response status should be 204
    When I send a "GET" request to "/api/v1/articles/5e1f0a2b-0001-4000-8000-000000000001"
    Then the response status should be 200
    And the response body should contain:
      """json
      {
        "id": "5e1f0a2b-0001-4000-8000-000000000001",
        "title": "Updated Title Again",
        "content": "Updated content again.",
        "publishedAt": "2026-10-01T10:00:00.000Z",
        "createdAt": "@date('within 1 minute from now')",
        "updatedAt": "@date('within 1 minute from now')"
      }
      """
    And I reset the database

  Scenario: Edit an article with ID that does not exist
    Given I use admin token
    When I send a "PATCH" request to "/api/v1/articles/5e1f0a2b-9999-4000-8000-999999999999" with body:
      """json
      {
        "title": "Updated Title",
        "content": "Updated content."
      }
      """
    Then the response status should be 404

  Scenario: Edit an article with invalid ID format
    Given I use admin token
    When I send a "PATCH" request to "/api/v1/articles/invalid-id" with body:
      """json
      {
        "title": "Updated Title",
        "content": "Updated content."
      }
      """
    Then the response status should be 400

  Scenario: Edit an article with empty title
    Given I use admin token
    When I send a "PATCH" request to "/api/v1/articles/5e1f0a2b-0001-4000-8000-000000000001" with body:
      """json
      {
        "title": "",
        "content": "Valid content"
      }
      """
    Then the response status should be 400

  Scenario: Edit an article with title exceeding maximum length
    Given I use admin token
    When I send a "PATCH" request to "/api/v1/articles/5e1f0a2b-0001-4000-8000-000000000001" with body:
      """json
      {
        "title": "This title is way too long and exceeds the maximum allowed length of 200 characters. It should trigger a validation error because the system has rules about title length. This is to ensure data quality and consistency across the application.",
        "content": "Valid content"
      }
      """
    Then the response status should be 400

  Scenario: Edit an article with empty content
    Given I use admin token
    When I send a "PATCH" request to "/api/v1/articles/5e1f0a2b-0001-4000-8000-000000000001" with body:
      """json
      {
        "title": "Valid title",
        "content": ""
      }
      """
    Then the response status should be 400

  Scenario: Edit an article with missing title field
    Given I use admin token
    When I send a "PATCH" request to "/api/v1/articles/5e1f0a2b-0001-4000-8000-000000000001" with body:
      """json
      {
        "content": "Valid content"
      }
      """
    Then the response status should be 400

  Scenario: Edit an article with missing content field
    Given I use admin token
    When I send a "PATCH" request to "/api/v1/articles/5e1f0a2b-0001-4000-8000-000000000001" with body:
      """json
      {
        "title": "Valid title"
      }
      """
    Then the response status should be 400

  Scenario: Edit an article with server-owned field id
    Given I use admin token
    When I send a "PATCH" request to "/api/v1/articles/5e1f0a2b-0001-4000-8000-000000000001" with body:
      """json
      {
        "id": "5e1f0a2b-9999-4000-8000-999999999999",
        "title": "Valid title",
        "content": "Valid content"
      }
      """
    Then the response status should be 400

  Scenario: Edit an article with server-owned field publishedAt
    Given I use admin token
    When I send a "PATCH" request to "/api/v1/articles/5e1f0a2b-0001-4000-8000-000000000001" with body:
      """json
      {
        "title": "Valid title",
        "content": "Valid content",
        "publishedAt": "2026-10-15T10:00:00.000Z"
      }
      """
    Then the response status should be 400

  Scenario: Edit an article with server-owned field createdAt
    Given I use admin token
    When I send a "PATCH" request to "/api/v1/articles/5e1f0a2b-0001-4000-8000-000000000001" with body:
      """json
      {
        "title": "Valid title",
        "content": "Valid content",
        "createdAt": "2026-10-15T10:00:00.000Z"
      }
      """
    Then the response status should be 400

  Scenario: Edit an article with unknown field
    Given I use admin token
    When I send a "PATCH" request to "/api/v1/articles/5e1f0a2b-0001-4000-8000-000000000001" with body:
      """json
      {
        "title": "Valid title",
        "content": "Valid content",
        "unknownField": "some value"
      }
      """
    Then the response status should be 400

  Scenario: Edit an article without token
    Given I do not use a token
    When I send a "PATCH" request to "/api/v1/articles/5e1f0a2b-0001-4000-8000-000000000001" with body:
      """json
      {
        "title": "Valid title",
        "content": "Valid content"
      }
      """
    Then the response status should be 401

  Scenario: Edit an article with wrong token
    Given I use a wrong token
    When I send a "PATCH" request to "/api/v1/articles/5e1f0a2b-0001-4000-8000-000000000001" with body:
      """json
      {
        "title": "Valid title",
        "content": "Valid content"
      }
      """
    Then the response status should be 403

  Scenario: Edit an article without token and with invalid data
    Given I do not use a token
    When I send a "PATCH" request to "/api/v1/articles/5e1f0a2b-0001-4000-8000-000000000001" with body:
      """json
      {
        "title": "",
        "content": ""
      }
      """
    Then the response status should be 401
