# ----------------------------------------
# Project Config
# ----------------------------------------
APP_NAME=previsit-questionnaire-app
DOCKERFILE=Dockerfile
DOCKER_CONTEXT=.
IMAGE_TAG=$(APP_NAME):latest
DOCKER=docker --context default compose

# ----------------------------------------
# Load Environment Variables from .env (if present)
# ----------------------------------------
ifneq (,$(wildcard .env))
  include .env
  export
endif

# ----------------------------------------
# Docker contexts
# ----------------------------------------
.PHONY: build run stop clean rebuild rebuild-api rebuild-app rebuild-console

build: ## Build Docker image (API)
	build-pnpm build-api build-app build-console

build-api: ## Build Docker image (API)
	$(DOCKER) build --no-cache previsit-api

build-app: ## Build Docker image (Patient App)
	$(DOCKER) build --no-cache previsit-app

build-console: ## Build Docker image (Admin Console)
	$(DOCKER) build --no-cache previsit-console

# ----------------------------------------
# Start or restart containers
# ----------------------------------------	

start-all: ## Start/Restart all containers
	$(DOCKER) down -v && $(DOCKER) up -d

start-api: ## Rebuild and restart API container
	$(DOCKER) build --no-cache previsit-api
	$(DOCKER) up -d --force-recreate previsit-api

start-app: ## Rebuild and restart Patient App container
	$(DOCKER) build --no-cache previsit-app
	$(DOCKER) up -d --force-recreate previsit-app

start-console: ## Rebuild and restart Admin Console container
	$(DOCKER) build --no-cache previsit-console
	$(DOCKER) up -d --force-recreate previsit-console

# ----------------------------------------
# Docker Compose Targets
# ----------------------------------------
.PHONY: compose-up compose-down

compose-up: ## Start full dev environment
	$(DOCKER) up -d

compose-down: ## Stop dev environment
	$(DOCKER) down

# ----------------------------------------
# Dev Workflow (Formatting / Linting / Testing / Seeding)
# ----------------------------------------
.PHONY: format lint test seed

build-pnpm: ## Build pnpm
	pnpm build

format: ## Format code with Prettier
	pnpm format

lint: ## Run ESLint on codebase
	pnpm lint

test: ## Run tests
	pnpm test
