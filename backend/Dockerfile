# # Use a PHP base image with the gRPC extension.  PHP 8.2 is a good choice.
# FROM php:8.2-cli

# # Install necessary system packages
# RUN apt-get update && apt-get install -y --no-install-recommends \
#     git \
#     unzip \
#     libzip-dev \
#     && rm -rf /var/lib/apt/lists/*

# # Install gRPC extension (important for PHP to talk to gRPC)
# RUN pecl install grpc \
#     && docker-php-ext-enable grpc

# # Install Composer (PHP package manager)
# RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# # Set the working directory
# WORKDIR /app

# # Copy project files (important: copy composer.json *first* for caching)
# COPY composer.json composer.lock ./
# COPY .rr.yaml ./
# COPY proto ./proto

# # Install PHP dependencies
# RUN composer install --no-dev --optimize-autoloader --no-interaction

# # Install RoadRunner
# ADD https://github.com/roadrunner-server/roadrunner/releases/download/v2023.3.8/roadrunner-2023.3.8-linux-amd64.tar.gz /tmp
# RUN tar -xf /tmp/roadrunner-2023.3.8-linux-amd64.tar.gz -C /usr/local/bin/ && \
#   rm /tmp/roadrunner-2023.3.8-linux-amd64.tar.gz
# RUN chmod +x /usr/local/bin/rr

# # Copy application code (after dependencies to leverage caching)
# COPY src ./src

# # Expose the gRPC port
# EXPOSE 9005

# # Use RoadRunner as the entrypoint, serving gRPC
# CMD ["rr", "serve", "-v", "-d"]

FROM php:8.3-cli

# Install necessary system packages
RUN apt-get update && apt-get install -y --no-install-recommends \
    unzip \
    && rm -rf /var/lib/apt/lists/*

# Install gRPC extension (important for PHP to talk to gRPC)
RUN pecl install grpc \
    && docker-php-ext-enable grpc

# Install Composer (PHP package manager)
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Set the working directory
WORKDIR /app

# Copy project files
COPY composer.json composer.lock ./
COPY .rr.yaml ./
COPY proto ./proto

# Install PHP dependencies
RUN composer install --no-dev --optimize-autoloader --no-interaction

# Install RoadRunner
ADD https://github.com/roadrunner-server/roadrunner/releases/download/v2023.3.8/roadrunner-2023.3.8-linux-amd64.tar.gz /tmp
RUN tar -xf /tmp/roadrunner-2023.3.8-linux-amd64.tar.gz -C /usr/local/bin/ && \
  rm /tmp/roadrunner-2023.3.8-linux-amd64.tar.gz
RUN chmod +x /usr/local/bin/rr

# Install rr-grpc plugin (pre-built)
ADD https://github.com/spiral-modules/php-grpc/releases/download/v1.6.0/rr-grpc-1.6.0-linux-amd64.tar.gz /tmp/
RUN tar -xf /tmp/rr-grpc-1.6.0-linux-amd64.tar.gz -C /usr/local/bin/ && \
    rm /tmp/rr-grpc-1.6.0-linux-amd64.tar.gz
RUN chmod +x /usr/local/bin/rr-grpc

# Copy application code (after dependencies to leverage caching)
COPY src ./src

# Expose the gRPC port
EXPOSE 9005

# Use RoadRunner with the rr-grpc plugin as the entrypoint
CMD ["rr-grpc", "serve", "-v", "-d"]