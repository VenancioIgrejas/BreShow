FROM node:alpine AS development

WORKDIR /app/client

COPY ./client/ .

RUN yarn install

CMD ["yarn", "start"]
