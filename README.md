## OrbitalOps Dashboard

OrbitalOps Dashboard is a Vue satellite operations dashboard for monitoring simulated spacecraft health, alerts, telemetry, and ground-station contact windows.

This project was built to practice and demonstrate frontend engineering skills relevant to operational web apps, including SPA routing, GraphQL API integration, UI components managing data, and automated testing.

![Dashboard](screenshots/orbitalops-dashboard.png)

## Features

- Satellite dashboard with current status (normal, warning, or critical) metrics
- Status filtering
- Individual satellite detail pages with telemetry, alerts, and contact windows with ground locations
- GraphQL API served locally (using GraphQL Yoga)
- Apollo Client integration on the Vue frontend
- Vue Router used for SPA navigation
- Unit tests with Vitest
- E2E browser tests with Playwright
- TypeScript, ESLint, and Prettier for maintainability

## Tech Stack

Vue.js, Vue Router, Typescript, GraphQL, Apollo Client, GraphQL

## Running Locally

Install Dependencies

```sh
npm install
```

Run the project- this will run both the client and the server.
The Vue frontend runs at: http://localhost:5173
The GraphQL server runs at: http://localhost:4000/graphql

```sh
npm run dev:all
```

To run the frontend only (use this only if the GraphQL server is already running separately):

```sh
npm run dev
```

To run the backend only:

```sh
npm run server
```

### Example GraphQL query

```graphql
query {
  satellites {
    id
    name
    status
    batteryPercent
    temperatureC
    signalStrengthDb
  }
}
```

### Running tests

Running E2E tests

```sh
npm run test:e2e
```

Running Unit Tests

```sh
npx playwright test --ui
```

You may need this installed:

```sh
npx playwright install
```

# Recommended commands before committing changes

```sh
npm run test:unit
npm run test:e2e
npm run type-check
npm run lint
npm run build
```

Enjoy!
