FROM node:14.16.0

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build \
    && npm install -g serve@11.3.2

EXPOSE 5000