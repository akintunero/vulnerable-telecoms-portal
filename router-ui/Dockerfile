FROM nginx:latest

COPY index.html /usr/share/nginx/html/index.html
COPY config/nginx.conf /etc/nginx/nginx.conf
COPY --from=nginx:latest /etc/nginx/mime.types /etc/nginx/mime.types

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"] 