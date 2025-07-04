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
EXPOSE ${PORT}

ENV NODE_ENV=${NODE_ENV} PORT=${PORT}

# Default command
CMD ["npm", "run", "dev"]