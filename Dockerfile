FROM nginx
# replace this with your application's default port
COPY dist /usr/share/nginx/html
COPY server.conf /etc/nginx/conf.d/
