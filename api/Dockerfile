FROM node:alpine AS development

WORKDIR /usr/src/app

COPY ./api/ .

RUN npm install glob rimraf
RUN npm i -g @nestjs/cli
RUN npm i nestjs-keycloak-admin
RUN npm i 


RUN npm run build

FROM node:alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY ./api/ .

RUN npm install --only=production

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]