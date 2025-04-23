# --------------------
# Stage 1: Build
# --------------------
FROM node:22-alpine AS builder

WORKDIR /app

# Workspace deps
COPY pnpm-lock.yaml pnpm-workspace.yaml ./
COPY package.json ./
COPY previsit-console/package.json previsit-console/
COPY libs/shared/package.json libs/shared/

RUN corepack enable && pnpm install --frozen-lockfile

# Copy full workspace source
COPY . .

# Build the app
RUN pnpm --filter previsit-console build

# --------------------
# Stage 2: Production Runtime
# --------------------
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Use non-root user
RUN addgroup -S nodegroup && adduser -S nodeuser -G nodegroup

# Copy compiled output
COPY --from=builder /app/previsit-console/.next ./.next
COPY --from=builder /app/previsit-console/public ./public
COPY --from=builder /app/previsit-console/package.json ./
# COPY --from=builder /app/previsit-console/next.config.ts ./
COPY --from=builder /app/libs ./libs

# Install only production deps
RUN corepack enable && pnpm install --prod

RUN chown -R nodeuser:nodegroup /app
USER nodeuser

EXPOSE 3000
CMD ["pnpm", "start"]
