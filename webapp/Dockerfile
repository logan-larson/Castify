FROM node:lts-slim AS build

WORKDIR /app

COPY package*.json ./
RUN rm -rf node_modules
RUN rm -rf build

COPY . .

ENV PROD=${PROD}
ENV PUBLIC_PROD=${PROD}

RUN npm install
RUN npm run build

FROM node:lts-slim as run

WORKDIR /app

COPY --from=build /app/package.json ./package.json
COPY --from=build /app/build ./build
RUN npm install --production

EXPOSE 3000
ENTRYPOINT [ "npm", "run", "prod" ]