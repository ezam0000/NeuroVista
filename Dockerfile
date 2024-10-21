# Use the latest Debian-based Node.js image
FROM node:20-bookworm

# Update system packages and install necessary dependencies
RUN apt-get update && apt-get upgrade -y && \
    apt-get install -y --no-install-recommends \
    libheif-dev \
    libwmf-dev \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .

# Use yarn to build the application
RUN yarn build

EXPOSE 3000 3001

COPY .env /app/.env

# Use yarn to start the application
CMD ["yarn", "start:dev"]