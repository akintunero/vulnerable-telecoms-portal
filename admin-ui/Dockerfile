FROM node:18-alpine

WORKDIR /app

# Install git
RUN apk add --no-cache git

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

RUN npm run build

# Expose port
EXPOSE 3000

# Start the application in development mode
CMD ["npm", "start"] 