FROM node:18

# Set working directory
WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./
COPY apps/backend/package*.json ./apps/backend/

# Install root and backend dependencies
RUN npm install
RUN cd apps/backend && npm install

# Copy all other files
COPY . .

# Build backend
WORKDIR /app/apps/backend
RUN npm run build

# Verify build output
RUN ls -la dist/

EXPOSE 5000
CMD ["node", "dist/server.js"]  # Adjust if your entry point is different