FROM node:alpine

ENV PORT 3000

WORKDIR /app 

COPY . /app

EXPOSE 3000
CMD [ "npm", "start" ]