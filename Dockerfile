FROM nginx
# replace this with your application's default port
# RUN rm /etc/nginx/conf.d/default.conf
RUN mkdir /var/www/certbot
COPY dist /usr/share/nginx/html
COPY dist /var/www/certbot
# COPY server.conf /etc/nginx/conf.d

