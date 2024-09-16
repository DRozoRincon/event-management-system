FROM node:20.16.0-alpine3.19 AS base

RUN npm install typescript --global

ENV NODE_ENV=local

WORKDIR /app

COPY src/package*.json .

RUN npm install && npm cache clean --force

COPY src .

FROM base

CMD npm run start