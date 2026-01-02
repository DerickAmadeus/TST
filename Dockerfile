# 1. Use the official Node.js image (Version 22 matches your local version)
FROM node:22-alpine

# 2. Create and set the working directory inside the container
WORKDIR /usr/src/app

# 3. Copy package.json and package-lock.json first 
# (This makes building faster by caching dependencies)
COPY package*.json ./

# 4. Install the dependencies (express, etc.)
RUN npm install

# 5. Copy the rest of your API code (API.js)
COPY . .

# Expose port yang digunakan aplikasi (sesuai dengan server.js)
EXPOSE 6767

# Set environment variable untuk production
ENV NODE_ENV=production

# Command untuk menjalankan aplikasi
CMD ["node", "server.js"]