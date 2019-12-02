FROM richarvey/nginx-php-fpm

RUN composer self-update
RUN composer global require "fxp/composer-asset-plugin:^1.1"

CMD ["/start.sh"]
