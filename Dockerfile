FROM nginx:alpine
RUN ls -lah
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY magnustest.txt /usr/share/nginx/html
COPY build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]