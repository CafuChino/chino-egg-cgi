FROM node:14-slim
EXPOSE 7001
ENV NODE_ENV production
ENV EGG_SERVER_ENV prod

WORKDIR /app
COPY . .

CMD [ "npm", "run", "start" ]

