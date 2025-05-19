FROM node:18

WORKDIR /app

# Avoid node_modules mess
COPY .dockerignore .dockerignore
COPY . .

# Add this if peer deps might be broken
RUN npm install --legacy-peer-deps

WORKDIR /app/apps/frontend

RUN npm run build
