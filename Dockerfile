FROM node:23-slim AS builder

WORKDIR /app

COPY . .
RUN npm install -g pnpm \
  && pnpm install \
  && pnpm build

FROM node:23-slim

WORKDIR /app
COPY --from=builder /app ./

EXPOSE 3000

CMD ["pnpm", "start"]
