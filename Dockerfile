FROM node:24.13.0-alpine3.23 AS builder

WORKDIR /app

COPY package.json ./

RUN apk add --no-cache git

RUN npm install

COPY . ./

RUN npm run build

FROM nginx:1.29.4-alpine3.23

COPY --from=builder /app/_site /usr/share/nginx/html
