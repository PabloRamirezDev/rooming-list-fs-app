# Rooming List FS App

Full-Stack app to manage rooming lists, bookings and events.


- [Backend](./backend)
- [Frontend](./frontend)

## Tech Stack

The frontend is built with Next.js 15 and React. The backend uses Nest.js and a PostgreSQL database.

## Project Initialization (Docker)

First, copy the contents of all the .env.example files into your own .env:

```bash
# Linux & Mac users
$ cp .env.example .env
$ cp ./backend/.env.example ./backend/.env
$ cp ./frontend/.env.example ./frontend/.env

# Windows users
$ copy .env.example .env
$ copy ./backend/.env.example ./backend/.env
$ copy ./frontend/.env.example ./frontend/.env
```

Make sure you have Docker installed and running on your computer. Then, run:

```bash
$ docker compose up
```

This will start the db, backend and frontend in three different containers for development.