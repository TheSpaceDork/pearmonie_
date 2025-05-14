FROM node:18

WORKDIR /app

COPY . .

WORKDIR /app/apps/frontend

RUN npm install
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
# 