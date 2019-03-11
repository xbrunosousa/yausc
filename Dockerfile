FROM node
WORKDIR /app
COPY package*.json /app/
COPY yarn.lock /app/
RUN yarn
COPY . .
RUN yarn build
CMD ["yarn", "start"]

EXPOSE 20101