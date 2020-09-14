FROM nginx:alpine

RUN apk add --no-cache nodejs yarn
RUN yarn global add @beam-australia/react-env

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY /build /usr/share/nginx/html
COPY .env /var/
COPY entrypoint.sh /var/entrypoint.sh

EXPOSE 80

ENTRYPOINT ["/var/entrypoint.sh"]

CMD ["nginx", "-g", "daemon off;"]