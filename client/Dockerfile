FROM node:14

RUN npm install -g @angular/cli 

WORKDIR /app/client

COPY ./client/package.json .

RUN npm install

COPY ./client .

CMD ng serve --host 0.0.0.0