# ----------------------------------------
# Variables
# ----------------------------------------
APP_NAME=previsit-questionnaire-app
DOCKERFILE=Dockerfile
DOCKER_CONTEXT=.
IMAGE_TAG=$(APP_NAME):latest

# ----------------------------------------
# Environment
# ----------------------------------------
ifneq (,$(wildcard .env))
	include .env
	export
endif
# ----------------------------------------
# Targets
# ----------------------------------------
.PHONY: build run stop clean rebuild format lint test seed compose-up compose-down

# build the Docker image for the API
build:
	docker build -f $(DOCKERFILE) -t $(IMAGE_TAG) $(DOCKER_CONTEXT)

# run the Docker container for the API
# -p 3000:3000 maps the container's port 3000 to the host's port 3000
run:
	docker run --rm -p 3000:3000 --network previsit-net $(IMAGE_TAG)

stop:
	docker stop $(shell docker ps -q --filter "ancestor=$(IMAGE_TAG)")

# remove the Docker image for the API
# -f forces the removal of the image
clean:
	docker rmi -f $(IMAGE_TAG)

# remove all stopped containers and dangling images
rebuild: clean build

# format the code using Prettier
format:
	pnpm format

# format the code using ESLint
lint:
	pnpm lint

# run the tests in all workspaces
# -s flag is used to run the tests in silent mode
test:
	pnpm test

seed:
	pnpm --filter api run seed

compose-up:
	docker-compose up -d

compose-down:
	docker-compose down
