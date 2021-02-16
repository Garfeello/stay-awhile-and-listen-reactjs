FROM node:15-alpine
COPY package.json ./
COPY package-lock.json ./
RUN npm install --save
COPY . ./
EXPOSE 3000
CMD [ "npm", "start"]