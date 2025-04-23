FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json ./

RUN apk add --no-cache git

RUN npm install

COPY . ./

RUN npm run build

FROM nginx:1.28.0-alpine

COPY --from=builder /app/_site /usr/share/nginx/html
