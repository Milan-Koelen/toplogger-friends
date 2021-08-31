FROM node:10 AS builder

WORKDIR /app

COPY . .

RUN npm install

ENV REACT_APP_API_URL=http://192.168.1.20:7000
ENV REACT_APP_HOME_URL = http://192.168.1.20/8000

RUN npm run build


FROM nginx:alpine

EXPOSE 80

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=builder /app/build .

CMD ["nginx", "-g", "daemon off;"]