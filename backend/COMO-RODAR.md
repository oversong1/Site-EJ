# Como rodar o projeto no seu PC

> Tudo que você precisa: apenas **Docker Desktop** instalado.  
> O Laravel 13, PHP 8.3, MySQL e Nginx sobem automaticamente.

---

## Pré-requisito: instalar o Docker Desktop

1. Acesse: **https://www.docker.com/products/docker-desktop/**
2. Baixe a versão para Windows
3. Instale e **reinicie o PC**
4. Confirme que está rodando: abra o terminal e execute:
   ```
   docker --version
   ```
   Deve mostrar algo como `Docker version 27.x.x`

---

## Rodando o projeto (primeira vez)

```bash
# 1. Navegue até a pasta backend
cd C:\Users\Administrador\Desktop\backup\Pessoal\Trabalho\Projeto-EJ\06-site-vendas\backend

# 2. Copie o arquivo de configuração
copy .env.example .env

# 3. Suba os containers
docker compose up -d
```

**Na primeira execução** o sistema vai:
- Baixar as imagens Docker (PHP, MySQL, Nginx) — pode demorar ~5 min dependendo da internet
- Instalar o Laravel 13 automaticamente via Composer
- Criar o banco de dados e tabelas
- Inserir os dados iniciais (banners, posts, equipe)

> ⚠️ **CPU ALTA NA PRIMEIRA VEZ É NORMAL**
> O `composer create-project laravel/laravel:^13.0` baixa e instala ~200 pacotes PHP.
> O CPU pode chegar a 200-300% e o Docker mostra o container como "meio ligado".
> **Isso é esperado. Aguarde 5-10 minutos.**
> Nas próximas vezes que subir (`docker compose up -d`) demora apenas 2-3 segundos.

Acompanhe o progresso em tempo real:
```bash
docker compose logs -f laravel
```

Quando aparecer a mensagem `EJ Tecnologia — Tudo pronto!`, está pronto.

---

## Acessar o projeto

| O quê | URL |
|---|---|
| **Site** | http://localhost |
| **Painel Admin** | http://localhost/admin.html |
| **phpMyAdmin** (banco) | http://localhost:8080 |

**Credenciais do admin:**
- E-mail: admin@ejtecnologia.com.br
- E-mail: admin1@ejtecnologia.com.br
- Senha:  ej@admin2026
- Senha:  Ej@admin2026
- Senha:  Ramonvaldez4@48

---

## Comandos úteis do dia a dia

```bash
# Subir os containers
docker compose up -d


# Parar os containers (sem perder dados)
docker compose stop

# Ver logs em tempo real
docker compose logs -f

# Acessar o terminal do Laravel
docker compose exec laravel sh

# Rodar migrations manualmente
docker compose exec laravel php artisan migrate

# Resetar banco e seeds (APAGA TUDO)
docker compose exec laravel php artisan migrate:fresh --seed

# Ver rotas da API
docker compose exec laravel php artisan route:list

# Limpar cache
docker compose exec laravel php artisan cache:clear
docker compose exec laravel php artisan config:clear
```

---

## Mudar a senha do admin

Edite o `.env`:
```
ADMIN_PASSWORD=SuaNovaSenha123
```

Depois, resete o usuário no banco:
```bash
docker compose exec laravel php artisan db:seed --class=DatabaseSeeder
```

Ou via phpMyAdmin (http://localhost:8080):
- Tabela `users`
- Campo `password` recebe o hash gerado por `Hash::make('sua_senha')` via artisan tinker:
  ```bash
  docker compose exec laravel php artisan tinker
  >>> Hash::make('SuaNovaSenha123')
  ```

---

## Estrutura Docker

```
docker compose up -d
         │
         ├── nginx (porta 80)
         │   ├── Serve /site/* como HTML/CSS/JS estático
         │   └── Proxy /api/* → laravel:9000
         │
         ├── laravel (PHP 8.3-FPM, porta 9000 interna)
         │   ├── Laravel 13
         │   ├── API REST em /api/*
         │   └── Autenticação via Laravel Sanctum
         │
         ├── mysql (MySQL 8, porta 3306)
         │   ├── banners
         │   ├── posts
         │   ├── users
         │   ├── personal_access_tokens (Sanctum)
         │   ├── settings
         │   ├── team_members
         │   └── media
         │
         └── phpmyadmin (porta 8080)
```

---

## Segurança implementada

| Item | Como está |
|---|---|
| Senhas | `bcrypt` via `Hash::make()` — nunca em texto puro |
| Tokens | Laravel Sanctum — token Bearer com expiração de 8h |
| Rotas admin | Protegidas com `auth:sanctum` middleware |
| Uploads | Validação de tipo (jpg/png/webp) e tamanho (máx 5MB) |
| SQL injection | Protegido pelo Eloquent ORM (queries parametrizadas) |
| Input | Validação em todos os controllers com `$request->validate()` |
| HTTPS | Configurado no servidor de produção (não no Laravel) |
| Token revogado | No login, tokens antigos são deletados automaticamente |

---

## Deploy na hospedagem compartilhada (produção)

> Quando chegar a hora — por enquanto, só o Docker local.

Passos resumidos:
1. Ter PHP 8.3 e MySQL disponíveis no cPanel
2. Fazer upload dos arquivos via FTP
3. Configurar o `.env` com dados reais (banco, domínio, senha forte)
4. Via SSH ou gerenciador de arquivos:
   ```bash
   php artisan key:generate
   php artisan migrate --seed
   php artisan storage:link
   php artisan config:cache
   php artisan route:cache
   ```
5. Apontar o DocumentRoot para `/public/`

---

## Problemas comuns

**"Port 80 already in use"**
```bash
# Verifica o que está usando a porta 80
netstat -ano | findstr :80
# Ou muda a porta no docker-compose.yml:
# ports: - "8090:80"
```

**MySQL não conecta**
```bash
# Aguarda mais tempo e tenta de novo
docker compose restart laravel
docker compose logs mysql
```

**"Permission denied" no storage**
```bash
docker compose exec laravel chmod -R 775 storage
docker compose exec laravel chown -R www-data:www-data storage
```
