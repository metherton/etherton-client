FROM nginx
# replace this with your application's default port
COPY dist /usr/share/nginx/html
COPY config.production.json /usr/share/nginx/html/config.json
