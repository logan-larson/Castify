FROM node:lts-slim AS build

ARG PROD
ARG MOBILE

WORKDIR /app

COPY package*.json ./
RUN rm -rf node_modules
RUN rm -rf build

COPY . .

ENV PUBLIC_PROD=${PROD}
ENV PUBLIC_MOBILE=${MOBILE}

RUN npm install
RUN npm run build

FROM node:lts-slim AS run

WORKDIR /app

COPY --from=build /app/package.json ./package.json
COPY --from=build /app/build ./build
RUN npm install --production

EXPOSE 3000
ENTRYPOINT [ "npm", "run", "prod" ]