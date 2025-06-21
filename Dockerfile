FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=builder /app/dist ./dist
COPY docker-entrypoint.sh ./docker-entrypoint.sh
RUN chmod +x ./docker-entrypoint.sh
EXPOSE 5173
ENTRYPOINT ["./docker-entrypoint.sh"] 
