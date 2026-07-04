#!/bin/sh
# ============================================================
# EJ Tecnologia — Entrypoint do container Laravel
# Remove BOM automaticamente após cada instalação
# ============================================================

set -e

echo ""
echo "============================================"
echo " EJ Tecnologia — Iniciando container PHP"
echo "============================================"

cd /var/www/app

# ── 1. Instala scaffold do Laravel 13 (só na primeira vez)
if [ ! -f "/var/www/app/public/index.php" ]; then
    echo ""
    echo "[1/5] Instalando scaffold do Laravel 13..."
    echo "      (Só na primeira vez — pode demorar ~3 min)"

    rm -rf /tmp/laravel_base 2>/dev/null || true

    composer create-project laravel/laravel:^13.0 /tmp/laravel_base \
        --no-interaction --prefer-dist --quiet

    # Copia scaffold com /. para merge correto em pastas existentes
    for dir in bootstrap config public resources lang; do
        if [ -d "/tmp/laravel_base/$dir" ]; then
            mkdir -p "/var/www/app/$dir"
            cp -rn "/tmp/laravel_base/$dir/." "/var/www/app/$dir/" 2>/dev/null || true
        fi
    done
    [ -f "/tmp/laravel_base/artisan" ] && cp "/tmp/laravel_base/artisan" /var/www/app/artisan
    if [ -d "/tmp/laravel_base/app" ]; then
        mkdir -p /var/www/app/app
        cp -rn /tmp/laravel_base/app/. /var/www/app/app/ 2>/dev/null || true
    fi
    if [ -d "/tmp/laravel_base/database/factories" ]; then
        mkdir -p /var/www/app/database/factories
        cp -rn /tmp/laravel_base/database/factories/. /var/www/app/database/factories/ 2>/dev/null || true
    fi

    # Copia composer.json e composer.lock do Laravel 13
    cp /tmp/laravel_base/composer.json /var/www/app/composer.json
    cp /tmp/laravel_base/composer.lock /var/www/app/composer.lock

    rm -rf /tmp/laravel_base

    # ── REMOVE BOM DE TODOS OS ARQUIVOS PHP (fix Windows CRLF/BOM)
    # Usa PHP para corrigir — busca ?php (< perdido) e corrige
    php -r "
        function fixBOM(\$dir) {
            \$it = new RecursiveIteratorIterator(new RecursiveDirectoryIterator(\$dir, RecursiveDirectoryIterator::SKIP_DOTS));
            foreach (\$it as \$file) {
                if (\$file->getExtension() !== 'php') continue;
                \$h = fopen(\$file->getPathname(), 'rb');
                if (!\$h) continue;
                \$first4 = fread(\$h, 4);
                fclose(\$h);
                if (substr(\$first4, 0, 4) === '?php') {
                    file_put_contents(\$file->getPathname(), '<' . file_get_contents(\$file->getPathname()));
                } elseif (substr(\$first4, 0, 3) === chr(239).chr(187).chr(191)) {
                    file_put_contents(\$file->getPathname(), substr(file_get_contents(\$file->getPathname()), 3));
                }
            }
        }
        fixBOM('/var/www/app/app');
        fixBOM('/var/www/app/config');
        fixBOM('/var/www/app/bootstrap');
        fixBOM('/var/www/app/routes');
        fixBOM('/var/www/app/public');
    "
    echo "      Scaffold instalado e BOM removido."
else
    echo "[1/5] Laravel já instalado. Pulando."
fi

# Garante que bootstrap/app.php inclui rotas da API
if ! grep -q "routes/api.php" /var/www/app/bootstrap/app.php 2>/dev/null; then
    sed -i "s|->withRouting(|->withRouting(\n        api: __DIR__.'/../routes/api.php',|" /var/www/app/bootstrap/app.php
    echo "      API routes adicionadas ao bootstrap/app.php"
fi

# Garante Controller base existe
if [ ! -f "/var/www/app/app/Http/Controllers/Controller.php" ]; then
    mkdir -p /var/www/app/app/Http/Controllers
    printf '<?php\nnamespace App\Http\Controllers;\nabstract class Controller {}\n' > /var/www/app/app/Http/Controllers/Controller.php
fi

# ── 2. Cria .env
echo ""
echo "[2/5] Configurando .env..."
if [ ! -f "/var/www/app/.env" ]; then
    if [ -f "/var/www/app/.env.example" ]; then
        cp /var/www/app/.env.example /var/www/app/.env
    else
        printf 'APP_NAME="EJ Tecnologia"\nAPP_ENV=local\nAPP_KEY=\nAPP_DEBUG=true\nAPP_URL=http://localhost\nADMIN_EMAIL=admin@ejtecnologia.com.br\nADMIN_PASSWORD=ej@admin2026\nDB_CONNECTION=mysql\nDB_HOST=mysql\nDB_PORT=3306\nDB_DATABASE=ej_tecnologia\nDB_USERNAME=ej_user\nDB_PASSWORD=ej_password_2026\nFILESYSTEM_DISK=public\nSESSION_DRIVER=file\nCACHE_DRIVER=file\nSANCTUM_STATEFUL_DOMAINS=localhost\n' > /var/www/app/.env
    fi
fi

# ── 3. Instala dependências
echo ""
echo "[3/5] Instalando dependências Composer..."
composer install --no-interaction --no-scripts --optimize-autoloader --quiet

# Adiciona sanctum se ausente
if [ ! -d "/var/www/app/vendor/laravel/sanctum" ]; then
    composer require laravel/sanctum --no-interaction --quiet
fi

# Gera APP_KEY
if ! grep -q "APP_KEY=base64:" /var/www/app/.env 2>/dev/null; then
    php artisan key:generate --force --quiet
fi

php artisan package:discover --ansi --quiet 2>/dev/null || true

chown -R www-data:www-data /var/www/app/storage /var/www/app/bootstrap/cache 2>/dev/null || true
chmod -R 775 /var/www/app/storage /var/www/app/bootstrap/cache 2>/dev/null || true

# ── 4. MySQL
echo ""
echo "[4/5] Aguardando MySQL..."
TRIES=0
until php -r "new PDO('mysql:host='.getenv('DB_HOST').';port='.(getenv('DB_PORT')?:3306),getenv('DB_USERNAME'),getenv('DB_PASSWORD')); echo 'OK';" 2>/dev/null | grep -q "OK"; do
    TRIES=$((TRIES+1)); [ $TRIES -ge 30 ] && echo "      MySQL timeout." && break; sleep 2
done
echo "      MySQL pronto."

# ── 5. Migrations
echo ""
echo "[5/5] Rodando migrations..."
php artisan migrate --seed --force --quiet && echo "      Banco configurado." || echo "      Migrations ja existem."
php artisan storage:link --quiet 2>/dev/null || true

echo ""
echo "============================================"
echo " EJ Tecnologia — PRONTO!"
echo " Site:       http://localhost"
echo " Admin:      http://localhost/admin.html"
echo " phpMyAdmin: http://localhost:8080"
echo " Senha:      ej@admin2026"
echo "============================================"
echo ""
exec php-fpm
