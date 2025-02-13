FROM php:8.2-cli


RUN apk add --no-cache bash curl git unzip && \
    curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

    
RUN curl -L -o /tmp/rr-grpc.tar.gz https://github.com/spiral-modules/php-grpc/releases/download/v1.6.0/rr-grpc-1.6.0-linux-amd64.tar.gz && \
    tar -xzvf /tmp/rr-grpc.tar.gz -C /usr/local/bin/ && \
    rm /tmp/rr-grpc.tar.gz && \
    mv /usr/local/bin/rr-grpc-1.6.0-linux-amd64 /usr/local/bin/rr-grpc && \
    chmod +x /usr/local/bin/rr-grpc 


# RUN composer install


# CMD ["/usr/local/bin/rr-grpc", "serve", "-v", "-d"]

