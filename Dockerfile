FROM node:24.22-alpine3.23 AS builder

WORKDIR /app

COPY package*.json ./

RUN apk add --no-cache git

RUN npm ci

COPY . ./

RUN npm run build

FROM nginx:1.31.8-alpine

COPY --from=builder /app/_site /usr/share/nginx/html
