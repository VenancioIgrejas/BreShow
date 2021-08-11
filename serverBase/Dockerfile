FROM node:10

WORKDIR /usr/src/app/serverBase

COPY . .

RUN npm install
RUN npm run typeorm-migration-generate
RUN npm run typeorm-migration-run

EXPOSE 3001

CMD ["npm", "start"]
