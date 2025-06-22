FROM node:18-alpine AS builder
WORKDIR /app

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

# Install serve globally
RUN npm install -g serve

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

# Copy built application
COPY --from=builder --chown=nextjs:nodejs /app/dist ./dist
COPY --chown=nextjs:nodejs docker-entrypoint.sh ./docker-entrypoint.sh

# Set proper permissions
RUN chmod +x ./docker-entrypoint.sh

# Switch to non-root user
USER nextjs

EXPOSE 5173

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:5173/ || exit 1

ENTRYPOINT ["./docker-entrypoint.sh"]
