# Project 2: Drill & Practice

This is an application providing a list of topics and allows creating multiple-choice questions into those topics that are then answered by self and others. The application also shows basic statistics: the total number of available questions and the total number of question answers. In addition, the application also provides an API for retrieving and answering random questions.

# Online Demo

https://drill-and-practice-songlin.herokuapp.com/

## Contents

The Drill & Practice has a Deno application that starts on port `7777`.
Launching the Drill & Practice starts the Deno application, a PostgreSQL server, and a
database migration process (Flyway).

## Starting and shutting down

The Drill & Practice is used with Docker Compose.

- To start the Drill & Practice, open up the terminal in the folder that
  contains the `docker-compose.yml` file and type `docker-compose up`.
- To stop the Drill & Practice, press `ctrl+C` (or similar) in the same terminal
  where you wrote the command `docker-compose up`. Another option is to open up
  a new terminal and navigate to the folder that contains the
  `docker-compose.yml` file, and then write `docker-compose stop`.

## Database

When the Drill & Practice is up and running, you can access the PostgreSQL
database from the terminal using the following command:

```
docker exec -it database-server psql -U username database
```

This opens up `psql` console, where you can write SQL commands.

## Database migrations

When the Drill & Practice is started, Flyway is used to run the SQL commands in
the database migration files that reside in the `flyway/sql`-folder. If a
database exists, Flyway checks that the schema corresponds to the contents of
the database migration files.

If you need new database tables or need to alter the schema, the correct
approach is to create a new migration file and start the Drill & Practice.
Another approach is to modify the existing migration file -- if you do this, the
migrations fail, however.

If you end up altering the migration files (or the schema in the database), you
can clean up the database (remove the existing database tables) by stopping the
containers and the related volumes -- with the database data -- with the command
`docker-compose down`. When you launch the Drill & Practice again after this,
the database is newly created based on the migration files.

## Deno cache

When we launch a Deno application, Deno loads any dependencies that the
application uses. These dependencies are then stored to the local file system
for future use. The Drill & Practice uses the `app-cache`-folder for storing the
dependencies. If you need to clear the cache, empty the contents of the folder.

## The project.env file

Database and Deno cache configurations are entered in the `project.env` file,
which Docker uses when starting the Drill & Practice. If you deploy the
application, you naturally do not wish to use the file in this repository.
Instead, create a new one that is -- as an example -- only available on the
server where the application is deployed. Another option is to use secrets --
we'll discuss these briefly in the course, where this Drill & Practice is used.
