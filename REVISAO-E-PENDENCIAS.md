# Revisão Completa — O que Falta e Próximos Passos

> **Data da revisão:** 04/07/2026  
> **Status geral:** Site funcional com admin completo. Pronto para conteúdo real e deploy.

---

## ✅ O que está funcionando

### Site Público
- [x] Home completa e dinâmica (banner, cards, equipe, blog, stack, CTA)
- [x] Página Serviços com 6 seções de cards dinâmicos
- [x] Blog com listagem e post individual
- [x] Tema dark responsivo
- [x] WhatsApp e e-mail dinâmicos (settings)
- [x] Cores do tema aplicadas via admin

### Painel Admin
- [x] Login/logout com Sanctum
- [x] Dashboard com contadores
- [x] Banners / Slider (criar, editar, excluir, upload, reordenar, stats por slide)
- [x] Blog Posts (WYSIWYG, picker de galeria, remover imagem)
- [x] Equipe (todos os campos, botão único, upload de foto)
- [x] Conteúdo das Páginas (tabs: Global, Home, Serviços, Blog)
- [x] Cards de Serviço por seção (6 seções independentes)
- [x] Cores e Estilo (16 controles, só muda o site, pré-visualização isolada)
- [x] Imagens / Mídia (upload, galeria, delete cascade)
- [x] Usuários (criar, editar, excluir, roles)

---

## 🔴 Crítico — Fazer antes de subir para produção

### 1. Conteúdo real ainda placeholder
| Item | Placeholder atual | Onde editar |
|------|------------------|-------------|
| Número WhatsApp | 5511999999999 | Admin → Conteúdo → Global |
| E-mail contato | contato@ejtecnologia.com.br | Admin → Conteúdo → Global |
| Fotos da equipe | Sem foto (placeholder SVG) | Admin → Equipe → Upload |
| Banners do slider | Imagens placeholder via.placeholder.com | Admin → Banners |
| Posts do blog | Conteúdo de exemplo | Admin → Blog Posts |

### 2. Limpeza do banco antes de produção
- Excluir usuários de teste (juliussth@gmail.com, ivan@gmail.com)
- Excluir posts de rascunho se necessário
- Revisar cards de serviço (conteúdo real vs exemplo)

### 3. Senha do admin em produção
- Trocar `ej@admin2026` por senha forte no servidor de produção
- Senha de produção: definir antes do deploy

---

## 🟡 Importante — Melhorias recomendadas

### 4. Settings órfãos no banco
As chaves abaixo existem no banco mas NÃO têm campo no admin (são resquícios do sistema antigo de text fields):
```
serv_s1_i1_t, serv_s1_i1_d, serv_s1_i2_t ... (20 chaves serv_s1/s2 items)
```
**Ação:** Limpar do banco — não causam erro mas ocupam espaço e confundem.

### 5. Senha expira ao reiniciar Docker
**Causa:** O entrypoint do container pode re-rodar o seeder sob certas condições, gerando conflito com o hash salvo.  
**Solução recomendada:** Criar um migration de senha separado e desativar o seeder de usuário após o primeiro setup. Ou usar um script `reset-password.sh` para reset rápido.

### 6. Fotos da equipe — fluxo de upload
**Situação atual:** Foto não estava sendo salva no servidor (só no localStorage). Corrigido para detectar cache, mas o usuário precisa fazer o upload manualmente pelo admin.  
**Ação:** Admin → Equipe → clicar na área de foto → selecionar arquivo → Salvar Equipe.

### 7. Rate limiting não ativado
**Motivo:** Requer tabela `cache` que não existe.  
**Solução para produção:**
```bash
# Criar migration da tabela de cache
php artisan cache:table
php artisan migrate
```
Depois adicionar `->middleware('throttle:10,1')` na rota de login.

---

## 🟢 Backlog — Funcionalidades futuras

### 8. Git / Versionamento
- [ ] Inicializar repositório Git
- [ ] Criar `.gitignore` adequado (excluir vendor/, node_modules/, .env, storage/)
- [ ] Fazer commit inicial com tag `v1.0.0`
- [ ] Criar repositório remoto (GitHub/GitLab)
- [ ] Definir estratégia de branches (main + staging)

### 9. Deploy para Hospedagem (cPanel)
- [ ] Verificar se o cPanel suporta PHP 8.3
- [ ] Configurar banco MySQL no cPanel
- [ ] Fazer upload dos arquivos via FTP / Git
- [ ] Configurar `.env` de produção
- [ ] Rodar migrations no servidor
- [ ] Configurar domínio + HTTPS (certificado SSL gratuito via cPanel)
- [ ] Atualizar `CFG.API` no config.js para URL de produção

### 10. SEO Básico
- [ ] Meta description nas páginas (está vazio no servicos.html)
- [ ] Open Graph tags para compartilhamento no WhatsApp/LinkedIn
- [ ] sitemap.xml
- [ ] robots.txt
- [ ] Google Analytics ou similar

### 11. Formulário de Contato
- [ ] Formulário de contato que envia e-mail
- [ ] Integração com Formspree ou endpoint Laravel Mailables
- [ ] Confirmação visual ao usuário

### 12. Google Analytics / Pixel
- [ ] Script de analytics
- [ ] Rastreamento de cliques no WhatsApp e e-mail

### 13. Performance
- [ ] Minificar CSS/JS para produção
- [ ] Lazy loading nas imagens
- [ ] Cache de API no frontend (hoje busca sempre)

### 14. Blog — Funcionalidades extras
- [ ] Busca no blog
- [ ] Filtro por categoria
- [ ] Paginação (hoje carrega todos os posts)
- [ ] RSS feed

### 15. Extras admin
- [ ] Preview ao vivo do site (iframe no admin)
- [ ] Histórico de alterações / audit log
- [ ] Colaborador: ver conteúdo mas não usuários (já implementado por role, mas não testado completamente)

---

## 📋 Checklist de Deploy (quando estiver pronto)

```
PRÉ-DEPLOY
□ Conteúdo real inserido (WhatsApp, e-mail, fotos, banners, posts)
□ Usuários de teste excluídos
□ Settings órfãos limpos
□ Senha do admin trocada para produção
□ CFG.API atualizado para URL de produção

SERVIDOR
□ PHP 8.3 disponível no cPanel
□ MySQL criado e credenciais configuradas
□ .env de produção criado (APP_ENV=production, APP_DEBUG=false)
□ php artisan migrate --seed executado
□ php artisan storage:link executado
□ php artisan config:cache executado
□ Permissões storage/ e bootstrap/cache/ configuradas (775)

PÓS-DEPLOY
□ HTTPS configurado e certificado SSL ativo
□ Login no admin testado
□ Upload de imagem testado
□ WhatsApp e e-mail confirmados
□ Formulários testados
□ Mobile testado
□ Velocidade verificada (PageSpeed Insights)
```

---

## 🔧 Comandos Úteis

```bash
# Subir ambiente local
docker compose up -d

# Ver logs do Laravel
docker compose logs laravel -f

# Resetar senha admin
docker compose exec laravel php artisan tinker
# > App\Models\User::where('email','admin@ej...')->first()->update(['password' => Hash::make('nova-senha')]);

# Limpar cache Laravel
docker compose exec laravel php artisan cache:clear
docker compose exec laravel php artisan config:clear

# Rodar migrations novas
docker compose exec laravel php artisan migrate

# Ver rotas da API
docker compose exec laravel php artisan route:list --path=api
```
