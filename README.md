# Pets API

REST API for managing users and pets with JWT auth and MongoDB.

## Requirements

- Node.js 18+
- npm 9+
- MongoDB

## Install

```bash
npm install
```

## Environment

Copy the example and adjust as needed:

```bash
cp .env.example .env.development
cp .env.example .env.test
cp .env.example .env.production
```

Required variables:

- `NODE_ENV` (`development` | `test` | `production`)
- `PORT`
- `MONGO_DB_NAME`
- `JWT_SECRET`
- `MONGO_URI` (required when `USE_IN_MEMORY_DB=false`)
- `USE_IN_MEMORY_DB` (`true` | `false`)

Notes:

- For Atlas, use `mongodb+srv://...` or include `tls=true` in the URI.
- Dev/test can run with `USE_IN_MEMORY_DB=true` to avoid a local MongoDB.

## Development

```bash
npm run dev
```

Swagger API Doc: `http://localhost:4000/docs` (or your `PORT`)

## Tests

```bash
npm test
```

Watch mode:

```bash
npm run test:watch
```

## Production

Build:

```bash
npm run build
```

Start:

```bash
npm start
```

## API Endpoints

Base URL: `/api/v1`

Auth:

- `POST /auth/signup` — create user
- `POST /auth/login` — login
- `GET /auth/me` — get current user (requires `Authorization: Bearer <token>`)

Pets:

- `POST /pets` — create pet (auth) 
- `PUT /pets` — update pet (auth)
- `GET /pets/{id}` — get pet by id
- `GET /pets` — list pets (auth)
- `DELETE /pets/{id}` — delete pet (auth)

