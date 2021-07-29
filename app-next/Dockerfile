FROM node:lts-slim

WORKDIR /opt/next

COPY ./pages ./pages
COPY ./public ./public
COPY ./styles ./styles
COPY ./next.config.js ./next.config.js
COPY ./next-env.d.ts ./next-env.d.ts
COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json
COPY ./tsconfig.json ./tsconfig.json

RUN npm ci
RUN npm run build
RUN groupadd --system next && useradd --system --gid next next && chown --recursive next:next .next

USER next
CMD ["npm", "run" , "start"]

