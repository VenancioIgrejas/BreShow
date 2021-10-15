FROM node:12.7-alpine AS build
WORKDIR /app/client
COPY ./client/package.json ./client/package-lock.json ./
RUN npm install
COPY ./client .
RUN npm run start