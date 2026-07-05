# Deploy Passo a Passo — EJ Tecnologia
> **Data:** 05/07/2026  
> **Servidor:** HostGator (cPanel Shared Hosting)  
> **Domínio:** codesize.com.br  
> **IP:** 108.179.192.134

---

## PRÉ-REQUISITOS (feito antes do deploy)

- [x] Código no GitHub: `https://github.com/oversong1/Site-EJ.git`
- [x] Banco MySQL criado no cPanel
- [x] Acesso SSH disponível

---

## PASSO 1 — Conectar ao servidor via SSH

**No terminal do seu computador (PowerShell ou CMD do Windows):**

```bash
ssh -p 22 codesi80@108.179.192.134
```

Vai pedir a senha: `Ramonvaldez4@48`

> **Diferença de comandos:** No servidor Linux, use `ls` para listar arquivos (não `dir` como no Windows).  
> `ls` = listar arquivos | `cd pasta` = entrar na pasta | `pwd` = mostrar onde você está

**Ao conectar, você estará em:**
```
/home1/codesi80/   ← sua pasta raiz (home)
```

---

## PASSO 2 — Explorar a estrutura do servidor

```bash
# Ver onde você está
pwd

# Listar arquivos e pastas
ls

# A pasta do site (onde o Apache serve os arquivos)
ls ~/public_html/

# Entrar em uma pasta
cd ~/public_html

# Voltar à pasta anterior
cd ..

# Voltar para home
cd ~
```

Estrutura do servidor após o deploy:
```
/home1/codesi80/
├── public_html/        ← Apache serve daqui (domínio principal)
│   ├── .htaccess       ← Redireciona tudo para o Laravel
│   ├── index.php       ← Bootstrap do Laravel
│   ├── css/            ← CSS do site
│   ├── js/             ← JavaScript do site
│   ├── admin.html      ← Painel admin
│   ├── robots.txt
│   └── storage → (link para ~/ej/backend/storage/app/public)
│
└── ej/                 ← Repositório clonado do GitHub
    ├── backend/        ← Laravel
    │   ├── app/
    │   ├── public/     ← Fonte dos assets
    │   ├── storage/    ← Uploads e sessões
    │   ├── vendor/     ← Dependências PHP (instalado pelo Composer)
    │   └── .env        ← Configurações de produção (NÃO está no Git)
    ├── database/
    │   └── seed-data.sql
    └── site/           ← Referência de desenvolvimento
```

---

## PASSO 3 — Instalar o Composer (gerenciador de pacotes PHP)

```bash
# Cria a pasta bin na home se não existir
mkdir -p ~/bin

# Baixa e instala o Composer
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
php composer-setup.php --quiet --install-dir=$HOME/bin --filename=composer
rm composer-setup.php

# Verifica se instalou
~/bin/composer --version
```

---

## PASSO 4 — Clonar o repositório do GitHub

```bash
# Na pasta home
cd ~

# Clona o projeto
git clone https://github.com/oversong1/Site-EJ.git ej

# Entra na pasta clonada
cd ej

# Lista o conteúdo
ls
```

---

## PASSO 5 — Instalar dependências PHP (Composer)

```bash
cd ~/ej/backend

# Instala dependências sem as de desenvolvimento (mais rápido e seguro)
~/bin/composer install --no-dev --optimize-autoloader --no-interaction
```

> Isso cria a pasta `vendor/` com todas as dependências do Laravel.

---

## PASSO 6 — Criar o arquivo .env de produção

O `.env` **não está no GitHub** (por segurança). Precisa ser criado manualmente.

```bash
# Cria o .env baseado no exemplo
cp ~/ej/backend/.env.example ~/ej/backend/.env
```

Edita o arquivo com as configurações de produção:
```bash
nano ~/ej/backend/.env
```

Conteúdo do `.env` de produção:
```ini
APP_NAME="EJ Tecnologia"
APP_ENV=production
APP_KEY=                    ← deixa vazio, será gerado no próximo passo
APP_DEBUG=false
APP_URL=https://codesize.com.br

DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=codesi80_ej
DB_USERNAME=codesi80_ej
DB_PASSWORD=uBIf0.]0w0ac

FILESYSTEM_DISK=public
ADMIN_EMAIL=admin@ejtecnologia.com.br

SESSION_DRIVER=file
CACHE_STORE=file
```

> No nano: `Ctrl+X` para sair, `Y` para salvar, `Enter` para confirmar.

---

## PASSO 7 — Gerar a chave da aplicação

```bash
cd ~/ej/backend

# Gera APP_KEY único (segurança)
php artisan key:generate --force
```

---

## PASSO 8 — Criar as tabelas no banco de dados (migrations)

```bash
cd ~/ej/backend

# Cria todas as tabelas
php artisan migrate --force
```

---

## PASSO 9 — Importar os dados (posts, cards, configurações)

```bash
# Adapta o dump para o banco de produção e importa
sed "s/ej_tecnologia/codesi80_ej/g" ~/ej/database/seed-data.sql > /tmp/seed-prod.sql
mysql -ucodesi80_ej -p'uBIf0.]0w0ac' codesi80_ej < /tmp/seed-prod.sql
rm /tmp/seed-prod.sql

# Verifica se importou
mysql -ucodesi80_ej -p'uBIf0.]0w0ac' codesi80_ej -e "SELECT COUNT(*) FROM posts; SELECT COUNT(*) FROM service_cards;" 2>/dev/null
```

---

## PASSO 10 — Criar link do Storage (para uploads de imagens)

```bash
cd ~/ej/backend

# Cria link simbólico: public/storage → storage/app/public
php artisan storage:link
```

---

## PASSO 11 — Ajustar permissões

```bash
# Storage e bootstrap/cache precisam de escrita
chmod -R 775 ~/ej/backend/storage
chmod -R 775 ~/ej/backend/bootstrap/cache

# Cria pastas de sessões e views (necessário no servidor)
mkdir -p ~/ej/backend/storage/framework/sessions
mkdir -p ~/ej/backend/storage/framework/views
mkdir -p ~/ej/backend/storage/framework/cache/data
```

---

## PASSO 12 — Configurar o public_html para servir o Laravel

Copia os arquivos estáticos do Laravel para onde o Apache serve:
```bash
cp -r ~/ej/backend/public/* ~/public_html/
```

Cria um symlink para o storage no public_html:
```bash
rm -f ~/public_html/storage
ln -sf ~/ej/backend/storage/app/public ~/public_html/storage
```

Cria o `index.php` que faz o bootstrap do Laravel apontando para o projeto:
```bash
# O index.php em public_html aponta para ~/ej/backend
# (já foi configurado automaticamente no deploy)
cat ~/public_html/index.php
```

---

## PASSO 13 — Criar usuário admin

```bash
# Reseta a senha do admin
cd ~/ej/backend
php artisan tinker
# No tinker:
App\Models\User::where('email','admin@ejtecnologia.com.br')->first()->update(['password' => Hash::make('SUA_SENHA_FORTE')]);
exit
```

---

## PASSO 14 — Otimizar para produção

```bash
cd ~/ej/backend

php artisan config:cache   # cacheia as configurações
php artisan route:cache    # cacheia as rotas
php artisan view:cache     # pré-compila as views Blade
```

---

## PASSO 15 — Verificar se está funcionando

```bash
# Testa as rotas principais
curl -s -o /dev/null -w "Home: %{http_code}\n" https://codesize.com.br/
curl -s -o /dev/null -w "Blog: %{http_code}\n" https://codesize.com.br/blog
curl -s -o /dev/null -w "Servicos: %{http_code}\n" https://codesize.com.br/servicos
curl -s -o /dev/null -w "Admin: %{http_code}\n" https://codesize.com.br/admin
```

Todos devem retornar `200`.

---

## HTTPS / SSL

### Verificar status atual
O HostGator já inclui **AutoSSL (Let's Encrypt gratuito)** em todos os planos.

**No cPanel:**
1. Acesse **cPanel → SSL/TLS**
2. Clique em **"Manage SSL sites"**
3. Verifique se `codesize.com.br` aparece com certificado ativo

### Forçar HTTPS (redirecionar HTTP → HTTPS)

Adicione no início do `~/public_html/.htaccess`, **antes** do bloco `<IfModule mod_rewrite.c>`:

```apache
# Força HTTPS
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

Via SSH:
```bash
# Adiciona o redirect HTTPS no .htaccess
cat > ~/public_html/.htaccess << 'HTEOF'
# Força HTTPS
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteCond %{HTTPS} off
    RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
</IfModule>

<IfModule mod_rewrite.c>
    <IfModule mod_negotiation.c>
        Options -MultiViews -Indexes
    </IfModule>

    RewriteEngine On

    RewriteCond %{HTTP:Authorization} .
    RewriteRule .* - [E=HTTP_AUTHORIZATION:%{HTTP:Authorization}]

    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_URI} (.+)/$
    RewriteRule ^ %1 [L,R=301]

    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteRule ^ index.php [L]
</IfModule>
HTEOF
```

### Atualizar APP_URL para HTTPS
```bash
sed -i 's|APP_URL=http://|APP_URL=https://|' ~/ej/backend/.env
cd ~/ej/backend && php artisan config:cache
```

---

## Atualizações futuras

Sempre que fizer mudanças no código:

```bash
# Na sua máquina: commit e push
git add .
git commit -m "descricao da mudanca"
git push

# No servidor via SSH:
cd ~/ej
git pull origin main

# Se mudou views Blade:
cd ~/ej/backend && php artisan view:clear

# Se mudou configs:
cd ~/ej/backend && php artisan config:cache

# Se tem novas migrations:
cd ~/ej/backend && php artisan migrate --force

# Se mudou CSS/JS (assets estáticos):
cp -r ~/ej/backend/public/css/* ~/public_html/css/
cp -r ~/ej/backend/public/js/* ~/public_html/js/
```

---

## Credenciais de produção (GUARDAR COM SEGURANÇA)

```
Servidor:    108.179.192.134
SSH:         ssh -p 22 codesi80@108.179.192.134
FTP:         ftp.codesize.com.br / codesi80 / porta 21
DB banco:    codesi80_ej
DB usuário:  codesi80_ej
Admin URL:   https://codesize.com.br/admin
Admin email: admin@ejtecnologia.com.br
GitHub:      https://github.com/oversong1/Site-EJ
```
