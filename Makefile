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
# Docker Targets (Build / Run / Clean)
# ----------------------------------------
.PHONY: build run stop clean rebuild rebuild-api rebuild-app rebuild-console

build: ## Build Docker image (API)
	docker build -f $(DOCKERFILE) -t $(IMAGE_TAG) $(DOCKER_CONTEXT)

run: ## Run Docker image (API)
	docker run --rm -p 3000:3000 --network previsit-net $(IMAGE_TAG)

stop: ## Stop running container for built image
	docker stop $(shell docker ps -q --filter "ancestor=$(IMAGE_TAG)")

clean: ## Remove Docker image
	docker rmi -f $(IMAGE_TAG)

start-all: ## Start/Restart all containers
	$(DOCKER) down -v && $(DOCKER) up

rebuild: clean build ## Clean and rebuild Docker image

rebuild-api: ## Rebuild and restart API container
	$(DOCKER) build --no-cache previsit-api
	$(DOCKER) up -d --force-recreate previsit-api

rebuild-app: ## Rebuild and restart Patient App container
	$(DOCKER) build --no-cache previsit-app
	$(DOCKER) up -d --force-recreate previsit-app

rebuild-console: ## Rebuild and restart Admin Console container
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

format: ## Format code with Prettier
	pnpm format

lint: ## Run ESLint on codebase
	pnpm lint

test: ## Run tests
	pnpm test
