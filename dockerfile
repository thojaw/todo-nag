FROM node:16-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --production

COPY . .

# Define the command to run the app
CMD [ "node", "index.js" ]