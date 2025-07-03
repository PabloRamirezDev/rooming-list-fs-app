# Base image with Node.js
FROM node:22

# Set working directory
WORKDIR /app

# Copy dependency files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

# Expose port
EXPOSE ${BE_PORT}

ENV NODE_ENV=${NODE_ENV} PORT=${PORT} DB_URL=${DB_URL}

# Default command
CMD ["npm", "run", "start:dev"]