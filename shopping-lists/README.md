# Shopping List

A web application that is used as a shared shopping list.

# Online Demo

https://songlin-shopping-list.herokuapp.com/

## Contents

The Shopping List has a Deno application that starts on port `7777`.
The application responds to queries with the message `Hello world!`. Launching
the Shopping List starts the Deno application, a PostgreSQL server, and a
database migration process (Flyway).

## Starting and shutting down

The Shopping List is used with Docker Compose.

- To start the Shopping List, open up the terminal in the folder that
  contains the `docker-compose.yml` file and type `docker-compose up`.
- To stop the Shopping List, press `ctrl+C` (or similar) in the same terminal
  where you wrote the command `docker-compose up`. Another option is to open up
  a new terminal and navigate to the folder that contains the
  `docker-compose.yml` file, and then write `docker-compose stop`.

## Database

When the Shopping List is up and running, you can access the PostgreSQL
database from the terminal using the following command:

```
docker exec -it database-server psql -U username database
```

This opens up `psql` console, where you can write SQL commands.

## Database migrations

When the Shopping List is started, Flyway is used to run the SQL commands in
the database migration files that reside in the `flyway/sql`-folder. If a
database exists, Flyway checks that the schema corresponds to the contents of
the database migration files.

If you need new database tables or need to alter the schema, the correct
approach is to create a new migration file and start the Shopping List.
Another approach is to modify the existing migration file -- if you do this, the
migrations fail, however.

If you end up altering the migration files (or the schema in the database), you
can clean up the database (remove the existing database tables) by stopping the
containers and the related volumes -- with the database data -- with the command
`docker-compose down`. When you launch the Shopping List again after this,
the database is newly created based on the migration files.

## Deno cache

When we launch a Deno application, Deno loads any dependencies that the
application uses. These dependencies are then stored to the local file system
for future use. The Shopping List uses the `app-cache`-folder for storing the
dependencies. If you need to clear the cache, empty the contents of the folder.

## The project.env file

Database and Deno cache configurations are entered in the `project.env` file,
which Docker uses when starting the Shopping List. If you deploy the
application, you naturally do not wish to use the file in this repository.
Instead, create a new one that is -- as an example -- only available on the
server where the application is deployed. Another option is to use secrets --
we'll discuss these briefly in the course, where this Shopping List is used.
