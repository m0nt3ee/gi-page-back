Feature: As a visitor I can list blog articles

  Scenario: I list articles with articles in the database
    Given I use seed data
    When I send a "GET" request to "/api/v1/articles"
    Then the response status should be 200
    And the response body should have the property "articles"

  Scenario: I list articles and they are ordered newest first
    Given I use seed data
    When I send a "GET" request to "/api/v1/articles"
    Then the response status should be 200
    And the response body should contain:
      """
      {
        "articles": [
          {
            "id": "5e1f0a2b-0001-4000-8000-000000000003",
            "title": "Database Management with Prisma",
            "content": "Prisma is a next-generation ORM that makes database management easier and more type-safe. It provides a powerful query engine and supports multiple databases including PostgreSQL, MySQL, and SQLite. Learn how to use Prisma effectively in your projects.",
            "publishedAt": "2026-10-13T09:15:00.000Z",
            "createdAt": "@date('within 1 minute from now')",
            "updatedAt": "@date('within 1 minute from now')"
          },
          {
            "id": "5e1f0a2b-0001-4000-8000-000000000004",
            "title": "Advanced TypeScript Patterns",
            "content": "Explore advanced TypeScript patterns and techniques to write better, more maintainable code. This article dives into generics, conditional types, and utility types.",
            "publishedAt": "2026-10-13T09:15:00.000Z",
            "createdAt": "@date('within 1 minute from now')",
            "updatedAt": "@date('within 1 minute from now')"
          },
          {
            "id": "5e1f0a2b-0001-4000-8000-000000000005",
            "title": "Testing in TypeScript",
            "content": "Learn how to write effective tests for TypeScript applications using Jest and other testing frameworks. This guide covers unit tests, integration tests, and best practices.",
            "publishedAt": "2026-10-13T09:15:00.000Z",
            "createdAt": "@date('within 1 minute from now')",
            "updatedAt": "@date('within 1 minute from now')"
          },
          {
            "id": "5e1f0a2b-0001-4000-8000-000000000002",
            "title": "Building REST APIs with NestJS",
            "content": "NestJS is a progressive Node.js framework for building efficient and scalable server-side applications. It uses TypeScript by default and combines elements of OOP, FP, and FRP. This article covers the fundamentals of building REST APIs using NestJS.",
            "publishedAt": "2026-10-10T14:30:00.000Z",
            "createdAt": "@date('within 1 minute from now')",
            "updatedAt": "@date('within 1 minute from now')"
          },
          {
            "id": "5e1f0a2b-0001-4000-8000-000000000001",
            "title": "Getting Started with TypeScript",
            "content": "TypeScript is a strongly typed programming language that builds on JavaScript. It adds optional static typing to the language, which can help catch errors early and improve code quality. In this article, we will explore the basics of TypeScript and how to get started with it.",
            "publishedAt": "2026-10-01T10:00:00.000Z",
            "createdAt": "@date('within 1 minute from now')",
            "updatedAt": "@date('within 1 minute from now')"
          }
        ]
      }
      """

  Scenario: I list articles published at the same time and they maintain consistent order
    Given I use seed data
    When I send a "GET" request to "/api/v1/articles"
    Then the response status should be 200
    When I send a "GET" request to "/api/v1/articles"
    Then the response status should be 200
    And the response body should contain:
      """
      {
        "articles": [
          {
            "id": "5e1f0a2b-0001-4000-8000-000000000003",
            "title": "Database Management with Prisma",
            "content": "Prisma is a next-generation ORM that makes database management easier and more type-safe. It provides a powerful query engine and supports multiple databases including PostgreSQL, MySQL, and SQLite. Learn how to use Prisma effectively in your projects.",
            "publishedAt": "2026-10-13T09:15:00.000Z",
            "createdAt": "@date('within 1 minute from now')",
            "updatedAt": "@date('within 1 minute from now')"
          },
          {
            "id": "5e1f0a2b-0001-4000-8000-000000000004",
            "title": "Advanced TypeScript Patterns",
            "content": "Explore advanced TypeScript patterns and techniques to write better, more maintainable code. This article dives into generics, conditional types, and utility types.",
            "publishedAt": "2026-10-13T09:15:00.000Z",
            "createdAt": "@date('within 1 minute from now')",
            "updatedAt": "@date('within 1 minute from now')"
          },
          {
            "id": "5e1f0a2b-0001-4000-8000-000000000005",
            "title": "Testing in TypeScript",
            "content": "Learn how to write effective tests for TypeScript applications using Jest and other testing frameworks. This guide covers unit tests, integration tests, and best practices.",
            "publishedAt": "2026-10-13T09:15:00.000Z",
            "createdAt": "@date('within 1 minute from now')",
            "updatedAt": "@date('within 1 minute from now')"
          },
          {
            "id": "5e1f0a2b-0001-4000-8000-000000000002",
            "title": "Building REST APIs with NestJS",
            "content": "NestJS is a progressive Node.js framework for building efficient and scalable server-side applications. It uses TypeScript by default and combines elements of OOP, FP, and FRP. This article covers the fundamentals of building REST APIs using NestJS.",
            "publishedAt": "2026-10-10T14:30:00.000Z",
            "createdAt": "@date('within 1 minute from now')",
            "updatedAt": "@date('within 1 minute from now')"
          },
          {
            "id": "5e1f0a2b-0001-4000-8000-000000000001",
            "title": "Getting Started with TypeScript",
            "content": "TypeScript is a strongly typed programming language that builds on JavaScript. It adds optional static typing to the language, which can help catch errors early and improve code quality. In this article, we will explore the basics of TypeScript and how to get started with it.",
            "publishedAt": "2026-10-01T10:00:00.000Z",
            "createdAt": "@date('within 1 minute from now')",
            "updatedAt": "@date('within 1 minute from now')"
          }
        ]
      }
      """

  Scenario: I list articles with no articles in the database
    Given I use an empty database
    When I send a "GET" request to "/api/v1/articles"
    Then the response status should be 200
    And the response body should contain:
      """
      {
        "articles": []
      }
      """
