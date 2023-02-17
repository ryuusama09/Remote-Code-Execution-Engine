FROM node:16-alpine3.11
WORKDIR '/app'

COPY package.json .
RUN npm install
COPY . .

RUN apk update && apk add --no-cache bash
RUN apk add --update docker openrc
RUN rc-update add docker boot
CMD ["npm","start"]