# --------------------
# Stage 1: Build
# --------------------
FROM node:22-alpine AS builder

WORKDIR /app

# Copy workspace files
COPY pnpm-lock.yaml pnpm-workspace.yaml ./
COPY package.json ./
COPY previsit-api/package.json previsit-api/
COPY libs/shared/package.json libs/shared/

RUN corepack enable && pnpm install --frozen-lockfile

# Copy full source
COPY . .

# Build only the API
RUN pnpm --filter previsit-api build

# ----------------------------
# Stage 2: Production Runtime
# ----------------------------
FROM node:22-alpine

# Create a non-root user and group
RUN addgroup -S nodegroup && adduser -S nodeuser -G nodegroup

WORKDIR /app

# Copy build output from the first stage
COPY --from=builder /app/previsit-api/dist ./dist

# Copy just the API's package.json (for prod install)
COPY --from=builder /app/previsit-api/package.json ./

RUN corepack enable && pnpm install --prod

# Change ownership to non-root user
RUN chown -R nodeuser:nodegroup /app
USER nodeuser

# Set default port
ENV PORT=3000

# Run the app
CMD ["node", "dist/main"]
