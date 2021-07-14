FROM nginx
# replace this with your application's default port
# RUN rm /etc/nginx/conf.d/default.conf
#RUN mkdir /etc/nginx/certs
COPY dist /usr/share/nginx/html
# COPY server.conf /etc/nginx/conf.d

