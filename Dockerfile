FROM node:16.15.0-alpine3.14 as build-stage
WORKDIR /app
COPY package*.json ./
COPY yarn.lock ./
COPY ./ .
RUN yarn docs:build

FROM nginx as production-stage
RUN mkdir /app
COPY --from=build-stage /app/docs/.vuepress/dist /app
COPY nginx.conf /etc/nginx/nginx.conf