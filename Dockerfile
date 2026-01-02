# Menggunakan Node.js versi LTS sebagai base image
FROM node:18-alpine

# Set working directory di dalam container
WORKDIR /app

# Copy package.json dan package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy seluruh source code ke container
COPY . .

# Expose port yang digunakan aplikasi (sesuai dengan server.js)
EXPOSE 6767

# Set environment variable untuk production
ENV NODE_ENV=production

# Command untuk menjalankan aplikasi
CMD ["npm", "start"]