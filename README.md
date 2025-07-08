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

By default, the frontend will be accessible at http://localhost:4000 and the backend at http://localhost:3000.

## Design Overview

### Backend

Horizontally, the backend uses a layered architecture that distinguishes three major categories: application, domain and infrastructure. The domain layer contains entities and business logic; the infrastructure layer handles connections with the database and other low-level operations; and the application layer holds the services that interact with both the domain and infrastructure.

On the other hand, there is a vertical separation in modules, based on major functionalities or resources. Some modules have to interact with each other; in such cases they're allowed to consume only the application-level services of other modules.

Based on the requirements, the API follows common REST standards and practices. It exposes two types of resources: Rooming Lists and Bookings. 

To create a Booking, it is necessary to reference a previously created Rooming List. 

Pagination uses two query parameters: `limit` and `page`. Paginated resources return the number of items in that page, the total amount of resources matched by the query, and the url of the next page.

Rooming Lists can be sorted by `cutOffDate`, either ascending or descending. This is achieved by setting the query parameters `sortField` and `sortDirection`. Similarly, they can be filtered by `status`, and searched by setting the `search` parameter.

Authentication uses a simple JWT guard that verifies against an environment-dependent secret, and then it checks that the `sub` claim is an allowed value.

#### Sample Requests

- List all rooming lists

```http
GET /rooming-lists
Authorization: Bearer [TOKEN]
```

```json
{
	"count": 7,
	"total": 7,
	"next": null,
	"items": [
		{
			"roomingListId": 7,
			"hotelId": 101,
			"eventId": 2,
			"eventName": "Ultra Miami",
			"rfpName": "RLM-2026",
			"cutOffDate": "2026-10-25",
			"status": "received",
			"agreementType": "leisure"
		},
	    // ...
	]
}
```

- Create booking

```http
POST /bookings
Authorization: Bearer [TOKEN]
Content-Type: application/json

{
	"hotelId": 1,
	"eventId": 7,
	"guestName": "John Doe",
	"guestPhoneNumber": "555-5555",
	"checkInDate": "2025-03-07",
	"checkOutDate": "2025-03-08",
	"roomingListId": 4
}
```

```json
{
	"bookingId": 12,
	"hotelId": 1,
	"eventId": 7,
	"guestName": "John Doe",
	"guestPhoneNumber": "555-5555",
	"checkInDate": "2025-03-07T00:00:00.000Z",
	"checkOutDate": "2025-03-08T00:00:00.000Z"
}
```

- Get all Bookings of a specific Rooming List

```http
GET /rooming-lists/2/bookings
Authorization: Bearer [TOKEN]
```

```json
{
	"count": 4,
	"total": 4,
	"next": null,
	"items": [
		{
			"bookingId": 1,
			"hotelId": 1,
			"eventId": 2,
			"guestName": "John Doe",
			"guestPhoneNumber": "555-5555",
			"checkInDate": "2025-03-07",
			"checkOutDate": "2025-03-08"
		},
        // ...
	]
}
```

#### Specific Decisions

Here are some of the decisions made while developing the backend app, and a summary of the logic behind them:

- The separation in modules was done that way due to the entities that were given in the requirements. Since the tables have to be seeded at runtime, it made sense to keep the public resources close to the entity definitions.
- IDs are not handled by TypeORM directly, but created based on a sequence in the database. This allows for the possibility of inserting manual ids (such as when re-seeding the database) without having to rely on the backend entirely for that.

### Frontend

The frontend uses the Next.js framework. It was chosen due to its ease of development, as well as for its robust server side capabilities. With it, there could be a layer between the frontend and the api, so credentials are not exposed to end users.

Since it is a pretty simple app, state management was implemented using React Context. There is an EventsContext, which is in charge of fetching the events data, and a BookingsContext, which does so for bookings. The api layer of the frontend allows to further abstract from the backend, so events data is aggregated in the server-side and not the client-side.

Some states and components were added (such as the loading states and sort buttons), since they were not provided in the design. Besides that, the original design was followed as closely as possible.

## Aspects to improve

These are aspects that, due to the scope of the project and resources (time), could not be implemented.

- Although there are a couple of unit tests, there is still a significant portion of the app that is not covered by any tests.
- Stronger validation rules should be added to the backend to ensure reliability.
- The frontend could see benefit from a couple of refactors, to make its code cleaner.
