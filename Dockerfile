FROM node:12

ENV DATA_PROVIDER=mongo
ENV MONGO_URL=mongodb+srv://admin:admin@cluster0.nmtod.mongodb.net/dasalab
ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3333
CMD [ "npm", "run", "dev" ]
