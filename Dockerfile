# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM tiangolo/node-frontend:10 as build-stage
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY ./ /app/
ENV REACT_APP_API_URL=http://85.145.226.121:7000
ENV REACT_APP_HOME_URL = http://192.168.1.20:8000
RUN npm run build
# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.15
COPY --from=build-stage /app/build/ /usr/share/nginx/html
# Copy the default nginx.conf provided by tiangolo/node-frontend
COPY --from=build-stage /nginx.conf /etc/nginx/conf.d/default.conf




# FROM node:10 AS builder

# WORKDIR /app

# COPY . .

# RUN npm install

# ENV REACT_APP_API_URL=http://85.145.226.121:7000
# ENV REACT_APP_HOME_URL = http://192.168.1.20:8000

# RUN npm run build


# FROM nginx:alpine

# EXPOSE 80

# WORKDIR /usr/share/nginx/html

# RUN rm -rf ./*

# COPY --from=builder /app/build .

# CMD ["nginx", "-g", "daemon off;"]