set dotenv-load

build:
  npm run build

start: build
  bash -c ". .env && npm run start"

dev:
  bash -c ". .env && npm run dev"

install:
  npm install

lint:
  npm run lint || true
