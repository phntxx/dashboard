FROM node:current-alpine

WORKDIR /app

COPY yarn.lock .
COPY package.json .

RUN [ "yarn", "install" ]

COPY data .
COPY src .
COPY public .

RUN [ "yarn", "build" ]

EXPOSE 3000 8080

CMD [ "yarn", "serve:production" ]
