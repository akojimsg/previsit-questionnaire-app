#!/bin/sh
set -e

ENV_FILE=".env"

# ----------------------------------------
# Environment Defaults
# ----------------------------------------
DEFAULT_ENV_VARS="
MONGODB_URI=mongodb://mongo:27017/previsit-questionnaire
MONGO_INITDB_DATABASE=previsit-questionnaire
REDIS_URI=redis://redis:6379
API_PORT=3000
NEXT_PUBLIC_API_BASE_URL=http://previsit-api:3000/api
NEXT_PUBLIC_CONSOLE_URL=http://localhost:4001
"

echo_section() {
  printf "\n\033[1;32m==> %s\033[0m\n" "$1"
}

# ----------------------------------------
# Step 1: Create .env if missing
# ----------------------------------------
if [ ! -f "$ENV_FILE" ]; then
  echo_section "Creating .env file..."
  touch "$ENV_FILE"
fi

# ----------------------------------------
# Step 2: Add missing keys from defaults
# ----------------------------------------
echo_section "Checking and setting default environment variables..."
echo "$DEFAULT_ENV_VARS" | while IFS= read -r line; do
  # Skip empty lines
  [ -z "$line" ] && continue

  key=$(printf "%s" "$line" | cut -d= -f1)
  value=$(printf "%s" "$line" | cut -d= -f2-)

  if ! grep -q "^$key=" "$ENV_FILE"; then
    echo "$key=$value" >> "$ENV_FILE"
    echo "✅ Set default: $key=$value"
  fi
done

# ----------------------------------------
# Step 3: Export env vars for current session
# ----------------------------------------
echo_section "Exporting environment variables..."
# shellcheck source=/dev/null
set -a
. .env
set +a

# ----------------------------------------
# Step 4: Docker Compose build + up
# ----------------------------------------
echo_section "Building and starting containers..."
docker-compose build
docker-compose up -d

# ----------------------------------------
# Step 5: Service URLs
# ----------------------------------------
echo_section "🚀 All services running"
echo "API:       $NEXT_PUBLIC_API_BASE_URL"
echo "Console:   $NEXT_PUBLIC_CONSOLE_URL"
echo "Patient:   http://localhost:4000"
