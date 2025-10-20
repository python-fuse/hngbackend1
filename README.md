# Strings API - NestJS Backend

A RESTful API built with NestJS for managing and analyzing string data with various filtering capabilities.

## Features

- Create and store strings with automatic property analysis
- Filter strings by various criteria (palindrome, length, word count, character content)
- Natural language query filtering
- SHA256 hash generation for unique identification
- Character frequency analysis
- RESTful endpoints for CRUD operations

## Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **pnpm** (Package manager) - [Install pnpm](https://pnpm.io/installation)

## Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/python-fuse/hngbackend1
   cd hngbackend1
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

## Running the Application

### Development Mode

Start the application in development mode with hot reload:

```bash
pnpm run start:dev
```

### Production Mode

Build and start the application in production mode:

```bash
# Build the application
pnpm run build

# Start in production mode
pnpm run start:prod
```

### Debug Mode

Start the application in debug mode:

```bash
pnpm run start:debug
```

The API will be available at `http://localhost:3000`

## Environment Variables

Currently, the application uses the following environment variables:

- `PORT` - Server port (default: 3000)

To set environment variables, create a `.env` file in the root directory:

```env
PORT=3000
```

## API Endpoints

### POST /strings

Create a new string entry

```bash
curl -X POST http://localhost:3000/strings \
  -H "Content-Type: application/json" \
  -d '{"value": "hello world"}'
```

### GET /strings

Get all strings with optional filtering

```bash
# Get all strings
curl http://localhost:3000/strings

# Filter by parameters
curl "http://localhost:3000/strings?is_palindrome=true&min_length=5&max_length=10&word_count=2&contains_character=a"
```

### GET /strings/filter-by-natural-language

Filter strings using natural language queries

```bash
curl "http://localhost:3000/strings/filter-by-natural-language?query=palindromes with more than 5 characters"
```

### GET /strings/:value

Get a specific string by its value

```bash
curl http://localhost:3000/strings/hello%20world
```

### DELETE /strings/:value

Delete a string by its value

```bash
curl -X DELETE http://localhost:3000/strings/hello%20world
```

## Dependencies

### Production Dependencies

- `@nestjs/common` - NestJS common utilities and decorators
- `@nestjs/core` - NestJS core framework
- `@nestjs/mapped-types` - Utility types for DTOs
- `@nestjs/platform-express` - Express platform adapter for NestJS
- `reflect-metadata` - Metadata reflection library
- `rxjs` - Reactive extensions library

### Development Dependencies

- `@nestjs/cli` - NestJS command line interface
- `@nestjs/schematics` - Code generation schematics
- `@nestjs/testing` - Testing utilities
- `typescript` - TypeScript compiler
- `jest` - Testing framework
- `eslint` - Code linting
- `prettier` - Code formatting

## Scripts

- `pnpm run start` - Start the application
- `pnpm run start:dev` - Start in development mode with hot reload
- `pnpm run start:debug` - Start in debug mode
- `pnpm run start:prod` - Start in production mode
- `pnpm run build` - Build the application
- `pnpm run test` - Run unit tests
- `pnpm run test:e2e` - Run end-to-end tests
- `pnpm run test:cov` - Run tests with coverage
- `pnpm run lint` - Lint the code
- `pnpm run format` - Format the code

## Testing

Run the test suite:

```bash
# Unit tests
pnpm run test

# End-to-end tests
pnpm run test:e2e

# Test coverage
pnpm run test:cov

# Watch mode
pnpm run test:watch
```

## Project Structure

```
src/
├── app.module.ts           # Root application module
├── main.ts                 # Application entry point
├── strings/                # Strings feature module
│   ├── dto/               # Data transfer objects
│   ├── entities/          # Entity definitions
│   ├── strings.controller.ts
│   ├── strings.service.ts
│   └── strings.module.ts
└── utils/                 # Utility functions and definitions
    ├── definitions.ts
    └── utils.ts
```

## Data Storage

Currently, the application uses an in-memory array for data storage. Data will be lost when the application restarts. For production use, consider integrating with a database like PostgreSQL, MongoDB, or MySQL.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the UNLICENSED license.
