FROM node as builder
WORKDIR /app
COPY package*.json /app/
COPY yarn.lock /app/
RUN yarn
COPY ./ /app/
RUN yarn build

FROM nginx:alpine
COPY --from=builder /app/build/ /usr/share/nginx/html
