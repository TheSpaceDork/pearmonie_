FROM node:18

# Set working directory
WORKDIR /app

# Copy everything into the image
COPY . .

# Move to backend directory
WORKDIR /app/apps/backend

# Install dependencies
RUN npm install

# Build your app (must generate dist/server.js)
RUN npm run build

# 🔍 Debug: List files to see what's built
RUN echo "==== FILE STRUCTURE AFTER BUILD ====" && ls -R /app




# Expose the port your app uses
EXPOSE 5000

# Start your server (adjust this if needed)
CMD ["node", "dist/server.js"]
