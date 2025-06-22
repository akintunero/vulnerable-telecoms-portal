FROM node:18-alpine AS builder
WORKDIR /app

# Install system dependencies for CVE simulations
RUN apk add --no-cache \
    git \
    openssh-client \
    xz \
    cups-client \
    curl \
    wget \
    bash

# Install dependencies first for better caching
COPY package*.json ./
RUN npm ci --only=production=false

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:18-alpine AS production
WORKDIR /app

# Install system dependencies for CVE simulations
RUN apk add --no-cache \
    git \
    openssh-client \
    xz \
    cups-client \
    curl \
    wget \
    bash

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

# Copy built application and dependencies
COPY --from=builder --chown=nextjs:nodejs /app/dist ./dist
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/package*.json ./

# Set proper permissions
RUN chmod -R 755 ./dist

# Switch to non-root user
USER nextjs

EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1

CMD ["node", "dist/index.js"]
