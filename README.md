# TODOs List Management #

This is a demo for a backend service with RESTful API.

## Author ##

> Eduardo Oviedo Blanco

## Requirements ##

- [Git](https://git-scm.com/downloads)
- [node.js](https://nodejs.org/) (current LTS is 14.18.0)
- [Docker](https://www.docker.com/products/docker-desktop)

## Clone instructions ##

To clone this repo run:

```bash
git clone https://github.com/edWAR6/todo-list-backend.git
```

## TL;DR

Build your local environment.
```bash
docker-compose up
```

> Check if the API is running at http://localhost:3000/
> Try the API at *8080* if in dev mode, *3000* if in deploy mode.
> For example _http://localhost:8080/api/lists_

To change the database in use, edit the *.env* file located in `backend/api/.env`.
Set the value `ACTIVE_DATABASE` to 'MongoDB' or 'PostgreSQL'.

## Development

To run in development environment make sure you run the databases.

```bash
docker-compose up mongodb postgresql
```

Then you can navigate to backend/api and execute.

```bash
cd backend/api
npm run dev
```

## Docker instructions

You can launch your api container alone and work with it following the next instructions.

### Build instructions ##

To build your api image, alone run:

```bash
cd backend
docker build . -t todos_api
```

To list your images and make sure the new one is there, run:

```bash
docker images
```

### Run instructions ##

To execute your container run:

```bash
docker run -p 3000:8080 -d --name api todos_api
```

To see the name, id, status, etc, of your container run:
```bash
docker ps
```

To see the container log, run:

```bash
docker logs <container id>
```

To enter your container run:

```bash
docker exec -it 1aabe54e5493 /bin/bash
```

To exit your container just press `Ctrl+d` or run:

```bash
exit
```
