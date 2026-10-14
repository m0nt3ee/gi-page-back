Feature: As a visitor I can get a single blog article

  Scenario: I get an article that exists
    Given I use seed data
    When I send a "GET" request to "/api/v1/articles/5e1f0a2b-0001-4000-8000-000000000001"
    Then the response status should be 200
    And the response body should contain:
      """
      {
        "id": "5e1f0a2b-0001-4000-8000-000000000001",
        "title": "Getting Started with TypeScript",
        "content": "TypeScript is a strongly typed programming language that builds on JavaScript. It adds optional static typing to the language, which can help catch errors early and improve code quality. In this article, we will explore the basics of TypeScript and how to get started with it.",
        "publishedAt": "2026-10-01T10:00:00.000Z",
        "createdAt": "@date('within 1 minute from now')",
        "updatedAt": "@date('within 1 minute from now')"
      }
      """

  Scenario: I get an article with an ID that does not exist
    Given I use seed data
    When I send a "GET" request to "/api/v1/articles/5e1f0a2b-9999-4000-8000-999999999999"
    Then the response status should be 404
    And the response body should have the property "message"

  Scenario: I get an article with an invalid ID format
    Given I use seed data
    When I send a "GET" request to "/api/v1/articles/invalid-id"
    Then the response status should be 400
