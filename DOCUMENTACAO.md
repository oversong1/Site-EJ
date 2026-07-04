# Documentação Técnica — EJ Tecnologia Site

> **Projeto:** Site institucional + painel admin da EJ Tecnologia  
> **Sócios:** Emerson Souza (Dev Full-Stack / CTO) + Julio Cesar Leal (PM / COO)  
> **Última atualização:** 04/07/2026  
> **Versões atuais:** admin.js v=46 · config.js v=45 · main.js v=18

---

## 1. Estrutura do Projeto

```
06-site-vendas/
├── site/                      # Frontend (HTML/CSS/JS estático)
│   ├── index.html             # Página inicial (Home)
│   ├── servicos.html          # Página de serviços
│   ├── blog.html              # Listagem de blog
│   ├── post.html              # Post individual
│   ├── admin.html             # Painel administrativo
│   ├── sitemap.xml            # Mapa do site para SEO
│   ├── robots.txt             # Regras para bots
│   ├── favicon.png            # Ícone do site (adicionar)
│   ├── og-image.png           # Imagem Open Graph (adicionar)
│   ├── css/
│   │   └── style.css          # Tema dark completo com CSS vars
│   └── js/
│       ├── config.js          # API helper, CFG, EJ namespace, timeout adaptativo
│       ├── data.js            # Dados padrão / fallbacks
│       ├── icons.js           # Sprite SVG inline
│       ├── main.js            # Lógica das páginas públicas
│       └── admin.js           # Lógica do painel admin
├── backend/                   # Laravel 13 + PHP 8.3
│   ├── app/Http/Controllers/Api/
│   │   ├── AuthController.php       # Login por email dinâmico
│   │   ├── BannerController.php
│   │   ├── ContactController.php    # Formulário de contato (SMTP)
│   │   ├── MediaController.php      # Upload + deduplicação + uso
│   │   ├── PostController.php
│   │   ├── ServiceCardController.php
│   │   ├── SettingsController.php
│   │   ├── TeamController.php
│   │   └── UserController.php
│   ├── app/Models/
│   ├── database/migrations/
│   ├── config/cors.php              # CORS configurado
│   ├── docker-compose.yml
│   └── .env                         # Não versionar!
├── dist/                      # Build de produção (gerado por build.py)
├── build.py                   # Script de minificação para produção
├── DOCUMENTACAO.md
├── REVISAO-E-PENDENCIAS.md
└── README.md
```

---

## 2. Stack Tecnológica

| Camada | Tecnologia | Versão |
|--------|-----------|--------|
| Backend | Laravel | 13 |
| Linguagem | PHP | 8.3 |
| Banco de dados | MySQL | 8 |
| Auth | Laravel Sanctum | — |
| Servidor (local) | Nginx + PHP-FPM | Docker |
| Frontend | HTML + CSS + JS vanilla | — |
| Hospedagem alvo | HostGator cPanel (shared) | — |
| Container local | Docker Compose | — |

---

## 3. Como Rodar Localmente

### Pré-requisitos
- Docker Desktop instalado e rodando

### Subir ambiente
```bash
cd 06-site-vendas/backend
docker compose up -d
```

- **Site:** http://localhost
- **Admin:** http://localhost/admin.html
- **phpMyAdmin:** http://localhost:8080
- **API:** http://localhost/api/

### Credenciais padrão
| Sistema | Usuário | Senha |
|---------|---------|-------|
| Admin panel | admin@ejtecnologia.com.br | ej@admin2026 |
| MySQL | ej_user | ej_password_2026 |
| Banco | ej_tecnologia | — |

> **Atenção:** Toda vez que o Docker reiniciar, rodar:
> ```bash
> docker compose exec laravel php artisan tinker
> # No tinker:
> $u = App\Models\User::where('email','admin@ejtecnologia.com.br')->first();
> $u->password = Hash::make('ej@admin2026'); $u->save();
> ```

---

## 4. Banco de Dados

### Tabelas

| Tabela | Registros | Descrição |
|--------|:---------:|-----------|
| `users` | 1 | Usuários do admin |
| `banners` | 3 | Slides do hero com stats por slide |
| `posts` | 4 | Artigos do blog |
| `service_cards` | 29 | Cards de serviço por seção |
| `settings` | 59 | Textos, cores, SMTP e configurações |
| `team_members` | 2 | Emerson + Julio |
| `media` | 34 | Imagens com hash, dimensões, alt_text |

### Seções de service_cards

| `section` | Onde aparece | Cards |
|-----------|-------------|-------|
| `both` | Home + topo Serviços | 8 |
| `sistemas` | Serviços → Sistemas Web | 6 |
| `sites` | Serviços → Sites e E-commerce | 4 |
| `apis` | Serviços → APIs e Integrações | 4 |
| `automacoes` | Serviços → Automações | 4 |
| `devops` | Serviços → DevOps | 3 |

### Grupos de Settings

| Grupo | Exemplos de chaves | Editável no admin? |
|-------|-------------------|:-----------------:|
| `colors` | `--primary`, `--secondary`, `--bg`... | ✅ Cores e Estilo |
| `general` | `home_*`, `serv_*`, `blog_*`, `site_name` | ✅ Conteúdo |
| `mail` | `mail_host`, `mail_port`, `mail_to_emails`... | ✅ E-mail/SMTP |

---

## 5. API — Endpoints

### Autenticação
| Método | Rota | Auth | Descrição |
|--------|------|------|-----------|
| POST | `/api/auth/login` | Pública | Login com email + senha |
| POST | `/api/auth/logout` | Sanctum | Invalida token |
| GET | `/api/auth/me` | Sanctum | Usuário logado |

### Contato (público)
| Método | Rota | Auth |
|--------|------|------|
| POST | `/api/contact` | Pública |
| POST | `/api/contact/test` | Admin |

### Banners, Posts, Cards, Settings, Team
→ Todas as rotas GET públicas, writes requerem Sanctum + role.

### Mídia
| Método | Rota | Auth | Novo |
|--------|------|------|------|
| GET | `/api/media` | Editor | Retorna `in_use`, `used_in`, `alt_text`, dimensões |
| POST | `/api/media/upload` | Editor | Detecta duplicatas por MD5 |
| PUT | `/api/media/{id}` | Editor | Atualiza `alt_text` |
| DELETE | `/api/media/{id}` | Editor | Remove arquivo + registro |

---

## 6. Painel Admin — Abas

| Aba | Visível para | Funcionalidades |
|-----|:------------:|-----------------|
| Dashboard | Todos | Contadores, links rápidos |
| Banners / Slider | Editor+ | CRUD + upload + layouts + stats por slide |
| Blog Posts | Editor+ | CRUD + WYSIWYG + picker galeria |
| Equipe | Editor+ | Nome, cargo, bio, tags, LinkedIn, foto |
| Conteúdo das Páginas | Editor+ | Tabs: Global, Home, Serviços, Blog + cards dinâmicos |
| Cores e Estilo | Editor+ | 16 controles CSS + radius + preview isolado |
| Imagens / Mídia | Editor+ | Grid com badges Em uso/Sem uso, ext, tamanho, alt, dimensões |
| E-mail / SMTP | Admin | Presets Gmail/Outlook/Yahoo/Hostinger, múltiplos destinatários, teste |
| Usuários | Admin | CRUD + roles admin/colaborador |

---

## 7. Frontend — Dinâmico vs Estático

### 100% dinâmico (API)
- Hero Slider, Service Cards (6 seções), Blog, Equipe, Cores, Stack, WhatsApp/e-mail, Formulário de contato

### Otimizações de performance aplicadas
- `defer` em todos os scripts
- `<link rel="preload">` no CSS
- Fontes via `<link>` (não `@import`)
- `preconnect` + `dns-prefetch`
- `loading="lazy"` em imagens
- `theme-color`, `favicon`, `apple-touch-icon`
- `robots: noindex` no admin

---

## 8. Segurança Implementada

| Item | Status | Detalhe |
|------|:------:|---------|
| Auth Sanctum + expiração 8h | ✅ | |
| Bcrypt nas senhas | ✅ | |
| Role-based (admin/colaborador) | ✅ | |
| SQL Injection | ✅ | ORM Eloquent |
| XSS | ✅ | EJ.esc() no frontend |
| Auto-logout no 401 | ✅ | config.js |
| CORS configurado | ✅ | cors.php |
| Timeout adaptativo (12s/6s) | ✅ | config.js |
| robots.txt (admin bloqueado) | ✅ | |
| noindex no admin.html | ✅ | |
| Deduplicação de uploads (MD5) | ✅ | MediaController |
| HTTPS | ⚠️ | Configurar no cPanel |
| Rate limiting login | ⚠️ | Requer migration da tabela cache |

---

## 9. Build de Produção

```bash
# Na pasta 06-site-vendas/ (na sua máquina Windows)
python3 build.py
```

Gera `dist/` com:
- CSS minificado (-21%) + gzip (-83% vs original)
- JS minificado (-19%) + gzip (-79% vs original)
- HTML minificado (-10%)
- `.htaccess` com gzip, cache e headers de segurança

---

## 10. Histórico de Desenvolvimento

### 01-02/07/2026 — Base
- Estrutura de documentação (35+ arquivos .md)
- Site estático completo (5 páginas)
- Tema CSS dark com CSS vars
- Backend Laravel 13 com Docker
- Auth Sanctum, migrations, seeders
- Sistema de banners com layouts e stats por slide
- data-s para edição inline de textos

### 02-03/07/2026 — Admin e dinâmico
- Fix blog/post: icons.js e config.js faltando
- Fix cascata de deleção de mídia
- Galeria de imagens com picker
- WYSIWYG editor (Visual/HTML) nos posts
- Card icon picker com emojis
- Coluna `section` nos service_cards
- loadServiceCardsOnPage() por seção

### 03/07/2026 — Correções críticas
- loadBannersTable recuperada após corrupção
- Fix 401 auto-logout + timeout 3→6/12s
- Admin aba Serviços: 6 editores independentes de cards
- 29 cards criados com conteúdo real (seções corretas)
- Fix Home admin: mostrava 29 cards em vez de 8

### 03/07/2026 — Equipe e Cores
- Seção Equipe refatorada (nome, cargo, bio, tags, LinkedIn, foto)
- index.html: equipe dinâmica via API
- Cores e Estilo: 16 controles, admin não muda, site carrega ao recarregar
- Usuários: initUsers() + criar/editar/excluir funcionando
- AuthController: login por email dinâmico (não mais hardcoded do .env)

### 04/07/2026 — SEO, Performance e Recursos
- ✅ Fix ícone WhatsApp no blog.html (SVG não emoji)
- ✅ Picker de ícones: abas Emojis + SVG sóbrios (18 ícones)
- ✅ Open Graph + Twitter Card nas 3 páginas principais
- ✅ sitemap.xml e robots.txt criados
- ✅ Google Analytics snippet (comentado, ativar com ID real)
- ✅ 20 settings órfãos deletados (serv_s1/s2 items)
- ✅ Formulário de contato com Laravel + PHPMailer (não Formspree)
- ✅ Aba E-mail/SMTP no admin (presets Gmail/Outlook/Hostinger, múltiplos destinatários, teste)
- ✅ Blog: busca em tempo real + filtros por categoria + paginação (6 por página)
- ✅ Performance direta: defer, preload, preconnect, lazy loading, fontes via link
- ✅ build.py: minificação CSS/JS/HTML + gzip + .htaccess
- ✅ Mídia: badge Em uso/Sem uso, extensão, tamanho, dimensões, alt text, deduplicação MD5
