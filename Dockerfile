#FROM node:current-alpine as react-build
#WORKDIR /app
#COPY . ./
#RUN yarn install
#RUN CI=true yarn coverage
#RUN CI=true yarn build

FROM nginx:alpine
WORKDIR /app
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]