Feature: As an admin I can create blog articles

  Scenario: Create article with valid data
    Given I use admin token
    When I send a "POST" request to "/api/v1/articles" with body:
      """json
      {
        "title": "New Article Title",
        "content": "This is the content of the new article."
      }
      """
    Then the response status should be 201
    Then the response body should contain:
      """json
      {
        "id": "@uuid",
        "title": "New Article Title",
        "content": "This is the content of the new article.",
        "publishedAt": "@date('within 1 minute from now')",
        "createdAt": "@date('within 1 minute from now')",
        "updatedAt": "@date('within 1 minute from now')"
      }
      """
    And I reset the database

  Scenario: Create article and verify it appears in the list
    Given I use admin token
    When I send a "POST" request to "/api/v1/articles" with body:
      """json
      {
        "title": "Article That Should Appear in List",
        "content": "Content for verification."
      }
      """
    Then the response status should be 201
    When I send a "GET" request to "/api/v1/articles"
    Then the response status should be 200
    And the response body should have the property "articles"
    And I reset the database

  Scenario: Create article with empty title
    Given I use admin token
    When I send a "POST" request to "/api/v1/articles" with body:
      """json
      {
        "title": "",
        "content": "Valid content"
      }
      """
    Then the response status should be 400

  Scenario: Create article with title exceeding maximum length
    Given I use admin token
    When I send a "POST" request to "/api/v1/articles" with body:
      """json
      {
        "title": "This title is way too long and exceeds the maximum allowed length of 200 characters. It should trigger a validation error because the system has rules about title length. This is to ensure data quality and consistency across the application.",
        "content": "Valid content"
      }
      """
    Then the response status should be 400

  Scenario: Create article with empty content
    Given I use admin token
    When I send a "POST" request to "/api/v1/articles" with body:
      """json
      {
        "title": "Valid title",
        "content": ""
      }
      """
    Then the response status should be 400

  Scenario: Create article with missing title field
    Given I use admin token
    When I send a "POST" request to "/api/v1/articles" with body:
      """json
      {
        "content": "Valid content"
      }
      """
    Then the response status should be 400

  Scenario: Create article with missing content field
    Given I use admin token
    When I send a "POST" request to "/api/v1/articles" with body:
      """json
      {
        "title": "Valid title"
      }
      """
    Then the response status should be 400

  Scenario: Create article with non-string title
    Given I use admin token
    When I send a "POST" request to "/api/v1/articles" with body:
      """json
      {
        "title": 12345,
        "content": "Valid content"
      }
      """
    Then the response status should be 400

  Scenario: Create article with server-owned field id
    Given I use admin token
    When I send a "POST" request to "/api/v1/articles" with body:
      """json
      {
        "id": "5e1f0a2b-9999-4000-8000-999999999999",
        "title": "Valid title",
        "content": "Valid content"
      }
      """
    Then the response status should be 400

  Scenario: Create article with server-owned field publishedAt
    Given I use admin token
    When I send a "POST" request to "/api/v1/articles" with body:
      """json
      {
        "title": "Valid title",
        "content": "Valid content",
        "publishedAt": "2026-10-15T10:00:00.000Z"
      }
      """
    Then the response status should be 400

  Scenario: Create article with server-owned field createdAt
    Given I use admin token
    When I send a "POST" request to "/api/v1/articles" with body:
      """json
      {
        "title": "Valid title",
        "content": "Valid content",
        "createdAt": "2026-10-15T10:00:00.000Z"
      }
      """
    Then the response status should be 400

  Scenario: Create article with unknown field
    Given I use admin token
    When I send a "POST" request to "/api/v1/articles" with body:
      """json
      {
        "title": "Valid title",
        "content": "Valid content",
        "unknownField": "some value"
      }
      """
    Then the response status should be 400

  Scenario: Create article without token
    Given I do not use a token
    When I send a "POST" request to "/api/v1/articles" with body:
      """json
      {
        "title": "Valid title",
        "content": "Valid content"
      }
      """
    Then the response status should be 401

  Scenario: Create article with wrong token
    Given I use a wrong token
    When I send a "POST" request to "/api/v1/articles" with body:
      """json
      {
        "title": "Valid title",
        "content": "Valid content"
      }
      """
    Then the response status should be 403

  Scenario: Create article without token and with invalid data
    Given I do not use a token
    When I send a "POST" request to "/api/v1/articles" with body:
      """json
      {
        "title": "",
        "content": ""
      }
      """
    Then the response status should be 401
