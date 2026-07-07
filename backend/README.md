# CodeSize — Backend Laravel

> API REST + Docker + MySQL para o site institucional  
> Stack: **PHP 8.3 com Laravel 13** · MySQL 8 · Nginx · Docker

> Laravel 13 lançado em março de 2026 — versão mais recente com suporte ativo até 2028.

---

## Estrutura

```
backend/
├── docker-compose.yml          ← Orquestra PHP, Nginx, MySQL, phpMyAdmin
├── Dockerfile                  ← Imagem PHP 8.2-FPM com extensões
├── docker/nginx/default.conf   ← Nginx: frontend estático + proxy Laravel
├── app/Http/Controllers/Api/   ← Controllers da API
├── app/Models/                 ← Models (Banner, Post, Setting, TeamMember, Media)
├── database/migrations/        ← 4 tabelas: banners, posts, settings, team+media
├── database/seeders/           ← Dados iniciais (banners, posts, equipe, cores)
├── routes/api.php              ← Todas as rotas da API
├── .env.example                ← Variáveis de ambiente
└── composer.json               ← Dependências PHP
```

---

## Como rodar localmente com Docker

### Pré-requisitos
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) instalado e rodando

### Passo a passo

```bash
# 1. Entre na pasta backend
cd 06-site-vendas/backend

# 2. Copie o .env
cp .env.example .env

# 3. Instale o Laravel completo (só na primeira vez)
#    Você precisa ter o Composer instalado localmente, OU usar:
docker run --rm -v "$(pwd):/app" composer:latest install --no-dev

# 4. Suba os containers
docker compose up -d

# 5. Aguarde o MySQL subir (~30s), então:
docker compose exec laravel php artisan key:generate
docker compose exec laravel php artisan migrate --seed
docker compose exec laravel php artisan storage:link

# 6. Pronto! Acesse:
```

| Serviço        | URL                              |
|----------------|----------------------------------|
| Site           | http://localhost                 |
| API            | http://localhost/api/banners     |
| phpMyAdmin     | http://localhost:8080            |

---

## Alternativa: instalar Laravel do zero

Se preferir criar um projeto Laravel limpo e copiar os arquivos customizados:

```bash
# 1. Crie o projeto Laravel
composer create-project laravel/laravel backend

# 2. Copie os arquivos customizados deste repositório para dentro do projeto:
#    - routes/api.php
#    - app/Http/Controllers/Api/*
#    - app/Models/*
#    - database/migrations/*
#    - database/seeders/DatabaseSeeder.php
#    - .env.example → .env
#    - docker-compose.yml, Dockerfile, docker/

# 3. Instale o Sanctum
composer require laravel/sanctum

# 4. Siga o passo a passo acima (docker compose up -d...)
```

---

## API — Rotas principais

### Públicas (sem autenticação)
| Método | Rota             | Descrição                        |
|--------|------------------|----------------------------------|
| GET    | /api/banners     | Banners ativos (slider da home)  |
| GET    | /api/posts       | Todos os posts publicados        |
| GET    | /api/posts/{id}  | Post individual                  |
| GET    | /api/settings    | Configurações (cores, contatos)  |
| GET    | /api/team        | Membros da equipe                |

### Autenticadas (Bearer token)
| Método | Rota                    | Descrição                   |
|--------|-------------------------|-----------------------------|
| POST   | /api/auth/login         | Login — retorna token       |
| GET    | /api/banners/all        | Todos os banners (admin)    |
| POST   | /api/banners            | Criar banner                |
| PUT    | /api/banners/{id}       | Editar banner               |
| DELETE | /api/banners/{id}       | Excluir banner              |
| POST   | /api/banners/{id}/image | Upload imagem do banner     |
| POST   | /api/posts              | Criar post                  |
| PUT    | /api/posts/{id}         | Editar post                 |
| DELETE | /api/posts/{id}         | Excluir post                |
| PUT    | /api/settings           | Salvar cores/configurações  |
| PUT    | /api/team/{key}         | Atualizar membro da equipe  |
| POST   | /api/team/{key}/photo   | Upload foto do sócio        |
| POST   | /api/media/upload       | Upload genérico de imagem   |
| GET    | /api/media              | Listar todas as imagens     |

---

## Banco de dados

| Tabela         | Descrição                                    |
|----------------|----------------------------------------------|
| `banners`      | Slides do hero da home (título, imagem, CTA) |
| `posts`        | Artigos do blog com HTML e imagem de capa    |
| `settings`     | Configurações do site (cores, contatos)      |
| `team_members` | Fotos e bios dos sócios                      |
| `media`        | Galeria de uploads do admin                  |

---

## Deploy na hospedagem compartilhada (produção)

```bash
# 1. Suba os arquivos do backend via FTP/Git para o servidor
# 2. Configure o .env com dados do banco da hospedagem:
#    DB_HOST=localhost, DB_DATABASE=..., APP_ENV=production
# 3. Via SSH ou painel:
php artisan key:generate
php artisan migrate --seed
php artisan storage:link
php artisan config:cache
php artisan route:cache

# 4. Configure o DocumentRoot do domínio para apontar para /backend/public/
# 5. Para o frontend, coloque os arquivos de /site/ em /public/site/ ou configure
#    um subdomínio separado
```

---

## Senha do admin

**Padrão:** `ej@admin2026`  
**Onde mudar:** no `.env`, variável `ADMIN_PASSWORD`

> Para escalar, migrar para autenticação de usuários com banco (User model + Sanctum) quando precisar de múltiplos administradores.
