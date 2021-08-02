FROM node:lts-slim AS build

WORKDIR /opt/react

COPY src src
COPY ./index.html ./index.html
COPY ./vite.config.ts ./vite.config.ts
COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json
COPY ./tsconfig.json ./tsconfig.json

RUN npm ci --production
RUN npm run build

FROM nginx

COPY --from=build /opt/react/dist /usr/share/nginx/html
