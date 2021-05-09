#!/usr/bin/env bash
rm -f ./nginx.conf
envsubst '\$NGINX_DOMAIN' < etc/nginx/nginx.conf.template > etc/nginx/nginx.conf
chmod 666 etc/nginx/nginx.conf
nginx -g "daemon off;"
echo "variable NGINX_DOMAIN=" ${NGINX_DOMAIN}
