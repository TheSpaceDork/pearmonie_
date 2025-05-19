FROM node:18

# Set working directory
WORKDIR /app

# Copy everything into the image
COPY . .

# Install dependencies using npm
RUN npm install

# Use turbo to build only the backend and its dependencies
RUN npx turbo run build --filter=backend...

# 🔍 Debug: Check what was built
RUN echo "==== FILE STRUCTURE AFTER BUILD ====" && ls -R /app/apps/backend/

# Expose the port your backend uses
EXPOSE 5000

# Start your server
CMD ["node", "apps/backend/dist/server.js"]
