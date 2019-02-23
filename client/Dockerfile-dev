FROM node:10.15.1-alpine

RUN mkdir -p /app/client

WORKDIR /app/client

COPY . /app/client

RUN npm install

CMD ["npm", "run", "start"]