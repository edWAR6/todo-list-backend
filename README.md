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

## Build instructions ##

To build your image run:

```bash
cd backend
cd api
docker build . -t todos_api
```

To list your images and make sure the new one is there, run:

```bash
docker images
```

## Run instructions ##

To execute your container run:

```bash
docker run -p 4000:8080 -d --name todos_api todos_api
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
