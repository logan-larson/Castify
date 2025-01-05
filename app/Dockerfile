FROM node:18-alpine

ARG PUBLIC_PROD
ARG PUBLIC_MOBILE

ENV PUBLIC_PROD=$PUBLIC_PROD
ENV PUBLIC_MOBILE=$PUBLIC_MOBILE

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "prod"]