FROM node:10.15.2-alpine as react-build
WORKDIR /app
COPY . ./
RUN yarn
RUN REACT_APP_BACKEND="http://localhost:9090/" yarn build

FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=react-build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]