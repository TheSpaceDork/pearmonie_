FROM node:18

WORKDIR /app

# Copy everything
COPY . .

# Install dependencies at the root level so workspaces are linked
RUN npm install

# Set the working directory to your frontend app
WORKDIR /app/apps/frontend

# Build your frontend
RUN npm run build
