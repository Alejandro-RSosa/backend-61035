FROM node:16-alpine

RUN apk add --no-cache make gcc g++ python3

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "src/app.js"]