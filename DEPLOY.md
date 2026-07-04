# Guia de Deploy — EJ Tecnologia

> **Atualizado:** 04/07/2026  
> **Hospedagem:** HostGator (cPanel + PHP 8.3 + MySQL)

---

## PARTE 1 — Subir para o GitHub

### 1.1 Criar repositório no GitHub

1. Acesse [github.com](https://github.com) e faça login
2. Clique em **New repository**
3. Configure:
   - **Nome:** `ej-tecnologia-site`
   - **Visibilidade:** Private (recomendado — tem .env.example e código sensível)
   - **NÃO** inicializar com README (já temos)
4. Clique em **Create repository**

### 1.2 Conectar o repositório local ao GitHub

```bash
cd C:/Users/Administrador/Desktop/backup/Pessoal/Trabalho/Projeto-EJ/06-site-vendas

# Substitua SEU_USUARIO pelo seu username do GitHub
git remote add origin https://github.com/SEU_USUARIO/ej-tecnologia-site.git

# Envia o código
git push -u origin main
```

> **Se pedir autenticação:** use seu Personal Access Token do GitHub  
> (GitHub → Settings → Developer settings → Personal access tokens → Generate new token)

### 1.3 Fluxo de trabalho diário

```bash
# Após fazer mudanças, commitar e subir:
git add .
git commit -m "fix: descrição do que mudou"
git push
```

---

## PARTE 2 — Deploy no HostGator

### Arquitetura de produção

```
HostGator cPanel
├── public_html/          ← Site frontend (HTML/CSS/JS)
│   ├── index.html
│   ├── servicos.html
│   ├── blog.html
│   ├── post.html
│   ├── admin.html
│   ├── css/style.min.css
│   ├── js/*.min.js
│   ├── .htaccess
│   ├── sitemap.xml
│   ├── robots.txt
│   ├── favicon.png
│   └── og-image.png
│
└── ej-api/               ← Backend Laravel (FORA do public_html)
    ├── app/
    ├── config/
    ├── database/
    ├── public/           ← Este é o DocumentRoot da API
    │   └── index.php
    ├── routes/
    ├── storage/
    └── .env
```

### Você vai precisar de:
- **FTP** (FileZilla) → para o frontend (dist/)
- **SSH** → para o backend Laravel (`composer install`, `php artisan migrate`)
- Os dois complementares — SSH para setup inicial, FTP para atualizações de frontend

---

## PARTE 3 — Passo a passo do Deploy

### 3.1 Preparar o frontend (na sua máquina)

```bash
cd C:/Users/Administrador/Desktop/backup/Pessoal/Trabalho/Projeto-EJ/06-site-vendas

# 1. Gera os arquivos minificados
python3 build.py

# 2. Edita dist/js/config.min.js — muda a URL da API
# Encontre: CFG.API = 'http://localhost/api'
# Mude para: CFG.API = 'https://ejtecnologia.com.br/api'
```

### 3.2 Upload do frontend via FTP

**Programa:** FileZilla (gratuito — filezilla-project.org)

```
Host:     ftp.ejtecnologia.com.br  (ou o IP do cPanel)
Usuário:  (usuário FTP do cPanel)
Senha:    (senha FTP do cPanel)
Porta:    21 (FTP) ou 22 (SFTP — mais seguro)
```

**O que subir:** todo o conteúdo de `dist/` → para `public_html/`

### 3.3 Configurar o backend via SSH

#### Verificar se SSH está disponível
- HostGator Business plan e acima: SSH incluído
- Planos menores: solicitar ativação no suporte

#### Conectar via SSH
```bash
# No terminal do Windows (PowerShell ou CMD)
ssh SEU_USUARIO@ejtecnologia.com.br

# Ou com porta específica (comum no HostGator: 2222)
ssh -p 2222 SEU_USUARIO@ejtecnologia.com.br
```

> **Senha SSH:** é a mesma do cPanel, normalmente

#### Fazer upload do backend via FTP
Suba a pasta `backend/` (menos `vendor/`, `.env`, `storage/uploads/`) para `~/ej-api/`

#### Setup inicial no servidor (via SSH)
```bash
# Na pasta do backend no servidor
cd ~/ej-api

# Instala dependências PHP
composer install --no-dev --optimize-autoloader

# Cria o .env de produção
cp .env.example .env
nano .env   # edita com os dados de produção

# Gera chave da aplicação
php artisan key:generate

# Cria link do storage
php artisan storage:link

# Roda as migrations
php artisan migrate --seed

# Otimiza para produção
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

### 3.4 Configurar o .env de produção

```ini
APP_ENV=production
APP_DEBUG=false
APP_URL=https://ejtecnologia.com.br

DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=ej_tecnologia_prod  # criar no cPanel → MySQL Databases
DB_USERNAME=ej_user_prod
DB_PASSWORD=SENHA_FORTE_AQUI

ADMIN_EMAIL=admin@ejtecnologia.com.br

MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_ENCRYPTION=tls
MAIL_USERNAME=seuemail@gmail.com
MAIL_PASSWORD=senha-app-gmail

FILESYSTEM_DISK=public
```

### 3.5 Configurar o domínio da API no cPanel

No cPanel → **Subdomínios** ou **Addon Domains**:
- Criar subdomínio `api.ejtecnologia.com.br`
- Apontar para `~/ej-api/public`

**OU** usar path no mesmo domínio via .htaccess

### 3.6 Configurar HTTPS (SSL)

- cPanel → **SSL/TLS** → **Let's Encrypt** (gratuito)
- Ativar para `ejtecnologia.com.br` e `www.ejtecnologia.com.br`
- Se usar subdomínio da API: ativar também para `api.ejtecnologia.com.br`

---

## PARTE 4 — Atualizações depois do deploy

### Atualizar apenas o frontend (mais comum)
```bash
# Na sua máquina:
python3 build.py
# Sobe dist/ via FTP para public_html/ (substitui os arquivos)
```

### Atualizar o backend
```bash
# Na sua máquina: commita e dá push
git add . && git commit -m "fix: ..." && git push

# No servidor via SSH:
cd ~/ej-api
git pull origin main   # se configurou git no servidor
composer install --no-dev
php artisan migrate
php artisan config:cache
```

### Atualizar banco sem perder dados
```bash
# NUNCA rode --seed em produção após o primeiro deploy
# Use apenas:
php artisan migrate   # aplica novas migrations
```

---

## PARTE 5 — Checklist final antes de subir

```
CONTEÚDO
□ WhatsApp real configurado no admin → Conteúdo → Global
□ E-mail real configurado
□ Fotos da equipe enviadas pelo admin
□ Banners reais (sem placeholder)
□ favicon.png criado (32x32 e 180x180)
□ og-image.png criado (1200x630)

CONFIGURAÇÃO
□ CFG.API atualizado para URL de produção em config.min.js
□ .env de produção criado no servidor (APP_DEBUG=false)
□ Banco MySQL criado no cPanel
□ Migrations rodadas no servidor
□ HTTPS ativo (SSL Let's Encrypt)
□ SMTP testado pelo admin → E-mail/SMTP → Testar

SEGURANÇA
□ Senha do admin trocada (não mais ej@admin2026)
□ .env NÃO está no Git (verificar: git status deve mostrar .env ignorado)
□ Usuários de teste deletados

TESTE FINAL
□ Home carrega corretamente
□ Formulário de contato envia e-mail
□ Admin faz login
□ Upload de imagem funciona
□ Blog carrega posts
□ Mobile ok (teste no celular)
□ PageSpeed Insights ≥ 80
```

---

## Resumo: SSH vs FTP

| Ação | SSH | FTP |
|------|:---:|:---:|
| Upload frontend (dist/) | — | ✅ Simples |
| Setup inicial do Laravel | ✅ Obrigatório | — |
| composer install | ✅ | — |
| php artisan migrate | ✅ | — |
| Atualizações de frontend | — | ✅ |
| Ver logs de erro | ✅ | — |
| Editar .env no servidor | ✅ | ✅ |

**Conclusão:** SSH para o backend (setup e manutenção), FTP para o frontend (atualizações frequentes).
