FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 8002
# Also need to run workers – we'll run them as separate containers later
CMD ["node", "index.js"]