FROM node:14
COPY common /usr/src/backend/common
COPY mongoDB /usr/src/backend/mongoDB
COPY postgreSQL /usr/src/backend/postgreSQL
COPY api /usr/src/backend/api
WORKDIR /usr/src/backend/common
RUN npm install
WORKDIR /usr/src/backend/mongoDB
RUN npm install
WORKDIR /usr/src/backend/postgreSQL
RUN npm install
WORKDIR /usr/src/backend/api
RUN npm install
RUN npm run build
EXPOSE 8080
CMD ["npm", "start"]
