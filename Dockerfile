FROM node:current-alpine

WORKDIR /app

COPY yarn.lock .
COPY package.json .

RUN [ "yarn", "install" ]

COPY data /app/data
COPY src /app/src
COPY public /app/public

RUN [ "yarn", "build" ]

EXPOSE 3000 8080

CMD [ "yarn", "serve:production" ]
