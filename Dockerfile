FROM nginx
# replace this with your application's default port
COPY dist /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf
