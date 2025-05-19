FROM node:18

WORKDIR /app

COPY . .

WORKDIR /app/apps/backend

RUN npm install
RUN npm run build
RUN ls -la /app/apps/backend/dist


EXPOSE 5000

CMD ["node", "/app/apps/backend/dist/server.js"]
