FROM node:18

WORKDIR /app

COPY . .

RUN npm install

WORKDIR /app/apps/frontend

RUN npm run build
