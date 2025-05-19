FROM node:18

WORKDIR /app

# Copy ONLY package files first (better caching)
COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# Verify the build output (debug step)
RUN ls -la dist/

# Expose port (Railway overrides this anyway)
EXPOSE 5000

# Run the app (adjust if entry point is different, e.g., `dist/main.js`)
CMD ["node", "dist/server.js"]