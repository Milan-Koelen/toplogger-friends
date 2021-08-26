FROM node:10 AS builder

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build


FROM nginx:alpine

EXPOSE 80

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=builder /app/build .

CMD ["nginx", "-g", "daemon off;"]