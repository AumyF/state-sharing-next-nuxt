FROM node:lts-slim AS build

WORKDIR /opt/nuxt

COPY ./components ./components
COPY ./pages ./pages
COPY ./static ./static
COPY ./nuxt.config.ts ./nuxt.config.ts
COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json
COPY ./tsconfig.json ./tsconfig.json

RUN npm ci
RUN npm run build
RUN groupadd --system nuxt && useradd --system --gid nuxt nuxt && chown --recursive nuxt:nuxt .nuxt

USER nuxt

CMD ["npm", "run", "start"]
