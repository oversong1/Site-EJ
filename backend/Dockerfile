FROM php:8.3-fpm-alpine

# Dependências do sistema
RUN apk add --no-cache \
    git curl zip unzip \
    libpng-dev libjpeg-turbo-dev freetype-dev \
    libxml2-dev oniguruma-dev \
    icu-dev g++ make autoconf mysql-client

# Extensões PHP para Laravel 13 + MySQL
RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
 && docker-php-ext-install -j$(nproc) \
    pdo pdo_mysql mbstring exif pcntl bcmath gd xml intl

# Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Diretório da aplicação
WORKDIR /var/www/app

# Copia os arquivos customizados do projeto (controllers, models, migrations, etc.)
# O restante do Laravel (bootstrap, config, public, resources) é instalado
# automaticamente pelo entrypoint.sh na primeira execução.
COPY . .

# Permissões do entrypoint
COPY docker/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

# Cria diretórios necessários (caso não existam ainda)
RUN mkdir -p storage/app/public storage/logs storage/framework/cache \
             storage/framework/sessions storage/framework/views \
             bootstrap/cache \
 && chmod -R 775 storage bootstrap/cache

EXPOSE 9000

# O entrypoint instala o Laravel automaticamente na primeira vez
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
