FROM node:24.15-alpine3.23 AS builder

WORKDIR /app

COPY package*.json ./

RUN apk add --no-cache git

RUN npm ci

COPY . ./

RUN npm run build

FROM nginx:1.29.7-alpine

COPY --from=builder /app/dist /usr/share/nginx/html
