# Express-App
#
# VERSION  1.0.0

FROM node:latest

RUN mkdir -p /home/www/express-app
WORKDIR /home/www/express-app

COPY . /home/www/express-app
RUN npm install

EXPOSE 3000
CMD ["npm", "start"]