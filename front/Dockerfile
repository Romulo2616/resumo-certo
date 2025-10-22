FROM nginx:1.29.2

COPY ./css /usr/share/nginx/html/css
COPY ./js /usr/share/nginx/html/js
COPY ./*.html /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
