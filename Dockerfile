FROM nginx
# replace this with your application's default port
RUN rm /etc/nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY dist /usr/share/nginx/html
COPY server.conf /etc/nginx
