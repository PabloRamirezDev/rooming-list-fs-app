# Rooming List App - Backend

REST API for the Rooming List App.

## Installation

```bash
$ npm install
```

## Running tests

```bash
$ npm run test
```

## DB Migrations

To generate a migration based on the current entities, run the command:

```bash
$ npm run migration:generate --migration=MIGRATION_NAME
```

Make sure to substitute MIGRATION_NAME with the name of the migration you want to generate.

To create an empty migration instead, run:

```bash
$ npm run migration:create --migration=MIGRATION_NAME
```

To run and revert migrations, use:

```bash
$ npm run migration:run # To run
$ npm run migration:revert # To revert
```

Docker compose will run migrations on container initialization, so there is no need to do it manually most of the time.

Note: to operate with migrations, the Docker container must be up and running, and the data source must point to the database container.
