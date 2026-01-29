# Build Stage
FROM oven/bun:1 AS build
WORKDIR /app
COPY . .
RUN bun install

# Runtime Stage (Distroless)
FROM oven/bun:distroless
WORKDIR /app
COPY --from=build /app/node_modules /app/app.ts ./

EXPOSE 4000
ENTRYPOINT ["bun", "run", "app.ts"]
