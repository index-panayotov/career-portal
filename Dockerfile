# Dockerfile
# Stage 1 - the build process
FROM node:14-alpine as build-deps
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn
COPY . ./
RUN yarn build

# Stage 2 - the production environment
FROM node:14-alpine
WORKDIR /usr/src/app
COPY --from=build-deps /usr/src/app ./
EXPOSE 3000
CMD ["yarn", "start"]