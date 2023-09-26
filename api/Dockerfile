FROM node:lts-slim

WORKDIR /app

COPY package*.json ./
RUN rm -rf node_modules
RUN rm -rf build

COPY . .

RUN npm install

EXPOSE 4000
ENTRYPOINT ["npm", "run", "prod"]