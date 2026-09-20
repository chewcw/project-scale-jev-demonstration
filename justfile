build:
  npm run build

start: build
  bash -c ". .env" && npm run start
