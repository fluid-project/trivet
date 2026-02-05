FROM node:24.13.0-alpine3.23 AS builder

RUN corepack enable

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

WORKDIR /app

COPY pnpm-lock.yaml ./
COPY pnpm-workspace.yaml ./

RUN --mount=type=cache,target=/pnpm/store \
	pnpm fetch

COPY package.json ./

RUN --mount=type=cache,target=/pnpm/store \
	pnpm install --frozen-lockfile --offline

COPY . .

RUN pnpm build

FROM nginx:1.29.5-alpine3.23

COPY --from=builder /app/_site /usr/share/nginx/html
