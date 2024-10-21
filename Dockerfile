FROM node:18.20.4

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000 3001

CMD ["npm", "run", "start:dev"]