FROM node:22-alpine

# Set working directory
WORKDIR /src/app

# Copy package files
COPY package*.json .
RUN npm install

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Expose port
EXPOSE 3000

CMD ["sh", "-c", "npm run db:reset && npm run dev"]