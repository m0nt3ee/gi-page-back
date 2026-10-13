# Blog API

## Technology Stack

| Technology | Version |
| ---------- | ------- |
| Node.js    | 24.10   |
| TypeScript | 5.8     |
| Nest.js    | ^11.1   |
| Prisma     | ^7.6.0  |
| PostgreSQL | 16.2    |

## Prerequisites

- Docker and Docker Compose installed on your machine

## Getting Started

### 1. Clone the repository

```shell
git clone git@github.com:m0nt3ee/gi-page-back.git
cd gi-page-back
```

### 2. Set up environment variables

Copy the example environment file and configure it:

```shell
cp .env.dist .env
```

The default values in `.env.dist` are suitable for local development.

### 3. Start the application

Use Docker Compose to build and start all services:

```shell
docker compose up -d --build
```

This command will:

- Build the application container
- Start PostgreSQL database
- Install dependencies
- Generate Prisma client
- Run database migrations
- Seed the database with sample data
- Start the API in watch mode

### 4. Verify it's running

- API endpoint: http://localhost/
- API documentation (Swagger): http://localhost/api

View application logs:

```shell
docker compose logs -f app
```

### 5. Stop the application

```shell
docker compose down
```

## Development

### Available Commands

```bash
# Code formatting
docker compose exec app npm run format        # Check formatting
docker compose exec app npm run format:fix    # Fix formatting issues

# Linting
docker compose exec app npm run lint          # Check code quality
docker compose exec app npm run lint:fix      # Fix linting issues

# Testing
docker compose exec app npm run test          # Run unit tests
docker compose exec app npm run test:functional  # Run functional tests

# Database
docker compose exec app npm run database:migrate  # Apply migrations
docker compose exec app npm run database:seed     # Seed database
docker compose exec app npm run database:reset    # Reset database (WARNING: destructive)
```

## Testing

The project uses two testing approaches:

- **Jest** for unit tests (located in `src/` directory alongside modules)
- **Cucumber** for functional tests (located in `features/` directory)

Run all tests before pushing changes:

```bash
docker compose exec app npm run format
docker compose exec app npm run lint
docker compose exec app npm run test:functional
```

## Project Structure

```
src/
├── core/              # Core functionality (validation, Prisma, HTTP setup)
│   ├── http/          # HTTP-related configurations (CORS, Swagger, auth)
│   ├── prisma/        # Prisma service and module
│   └── validation/    # Request validation setup
├── modules/           # Feature modules
│   └── status/        # Status endpoint
└── main.ts            # Application entry point

features/              # Cucumber functional tests
prisma/                # Database schema, migrations, and seeds
docker/                # Docker entrypoint scripts
```

## Versioning and Releases

This project follows [Semantic Versioning](https://semver.org/):

- **Major** version for breaking changes
- **Minor** version for new features
- **Patch** version for bug fixes

### Before Merging a PR

1. Update the version in `package.json` (line 3)
2. Run `docker compose exec app npm install` to update `package-lock.json`
3. Commit both files

The CI pipeline will fail if you try to merge without bumping the version.

## CI/CD

GitHub Actions workflows run on every pull request:

- Code formatting check
- Linting
- Tests
- Version bump verification

On merge to `main`:

- A Git tag is created with the version number
- A GitHub release is generated
- Docker image is built and pushed to GitHub Container Registry

## Infrastructure

### Local Development

- Application runs in Docker container on port 80 (mapped from container port 3000)
- PostgreSQL runs in a separate container on port 5432

### Docker Images

- Development image: includes dev dependencies and watch mode
- Production image: optimized, production-ready build

## Contributing

1. Create a feature branch following [Conventional Branch](https://conventional-branch.github.io/) naming
2. Make your changes
3. Run format, lint, and tests
4. Bump the version in `package.json`
5. Commit with signed commits
6. Open a pull request

## Resources

- [NestJS Documentation](https://docs.nestjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [Docker Documentation](https://docs.docker.com/)

## License

Proprietary
