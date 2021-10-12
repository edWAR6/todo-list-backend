FROM node:14
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY src ./src
COPY tsconfig.json ./
RUN npm run build
EXPOSE 8080
CMD ["node", "build/server"]