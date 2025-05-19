FROM node:18


COPY . .

WORKDIR /apps/backend

RUN npm install
RUN npm run build


EXPOSE 5000

CMD ["node", "/app/apps/backend/dist/server.js"]
