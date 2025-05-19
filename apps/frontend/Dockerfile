# Frontend Dockerfile (apps/frontend/Dockerfile)
FROM node:18

WORKDIR /app

# Copy pre-built ai-utils (must exist in your build context)
COPY packages/ai-utils/dist ./packages/ai-utils/dist
COPY packages/ai-utils/package.json ./packages/ai-utils/package.json

# Install frontend dependencies
COPY apps/frontend/package*.json ./
RUN npm install --legacy-peer-deps

# Copy frontend code
COPY apps/frontend .

# Build frontend
RUN npm run build