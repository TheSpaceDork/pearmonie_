FROM node:18

WORKDIR /app

COPY apps/backend /app

RUN npm install
RUN npm run build

# Debug output: confirm dist/server.js exists
RUN ls -la /app/dist
RUN ls -la /app/dist/server.js || echo "server.js NOT FOUND"

EXPOSE 5000

CMD ["node", "/app/dist/server.js"]
