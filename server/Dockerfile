FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["node", "dist/index.js"] // API issues - Sat Jun 21 02:05:40 WAT 2025
