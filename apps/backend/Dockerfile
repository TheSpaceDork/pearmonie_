FROM node:18

# Set working directory to /app (Railway prefers /app)
WORKDIR /app

# Copy ONLY package files first (better caching)
COPY package*.json ./
RUN npm install

# Copy the rest of the files
COPY . .

# Build the app (adjust if your build script differs)
RUN npm run build

# Verify the build output (debug step)
RUN ls -la dist/

# Expose port (Railway overrides this anyway)
EXPOSE 5000

# Run the app (adjust if entry point is different, e.g., `dist/main.js`)
CMD ["node", "dist/server.js"]