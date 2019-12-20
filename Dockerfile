FROM node:12.14-slim
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install sharp --save
COPY . .


CMD ["npm", "start"]
