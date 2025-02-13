FROM ubuntu:noble-20250127

# Install system dependencies and PHP
RUN apt-get update && apt-get install -y \
    software-properties-common \
    curl \
    git \
    zip \
    unzip \
    && add-apt-repository ppa:ondrej/php \
    && apt-get update \
    && apt-get install -y \
    php8.3-cli \
    php8.3-zip \
    php8.3-xml \
    php8.3-mbstring \
    php8.3-curl \
    && rm -rf /var/lib/apt/lists/*

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /app

# Install rr-grpc
RUN curl -L https://github.com/spiral-modules/php-grpc/releases/download/v1.6.0/rr-grpc-1.6.0-linux-amd64.tar.gz -o rr-grpc.tar.gz \
    && tar -xf rr-grpc.tar.gz \
    && chmod +x rr-grpc-1.6.0-linux-amd64/rr-grpc \
    && mv rr-grpc-1.6.0-linux-amd64/rr-grpc . \
    && rm -rf rr-grpc.tar.gz rr-grpc-1.6.0-linux-amd64

RUN ./rr-grpc -v
RUN composer --version

# Copy project files
COPY . .

# Install dependencies
RUN composer install && composer update

# Start RoadRunner server
CMD ["./rr-grpc", "serve", "-v", "-d"]