# Dev — Stack e Decisões Técnicas do Site

> Última atualização: 01/07/2026

---

## Decisão de stack

**Stack escolhida: WordPress + Tema (Astra ou Kadence) + Elementor**

### Por que WordPress para o site institucional?

| Critério | WordPress | PHP Puro | React/Next.js |
|---|---|---|---|
| Velocidade de lançamento | ✅ Rápido (dias) | ⚠️ Médio | ❌ Lento (semanas) |
| SEO | ✅ Excelente (Yoast) | ⚠️ Manual | ✅ Bom (com config) |
| Blog integrado | ✅ Nativo | ❌ Do zero | ⚠️ Configurar |
| Facilidade de manutenção | ✅ Painel visual | ❌ Código puro | ❌ Deploy complexo |
| Hospedagem compartilhada | ✅ Sim | ✅ Sim | ❌ Não ideal |
| Portfólio/Cases dinâmico | ✅ Custom post types | ❌ Manual | ✅ Mas complexo |
| Custo de desenvolvimento | ✅ Baixo | ⚠️ Médio | ❌ Alto |

**Conclusão:** WordPress é a escolha certa para o MVP. Se em 12 meses o site precisar de mais performance ou interatividade, migrar para Next.js.

---

## Plugins essenciais

| Plugin | Função | Custo |
|---|---|---|
| **Astra** ou **Kadence** | Tema base leve e rápido | Grátis |
| **Elementor** | Construtor de páginas visual | Grátis (pro não é necessário) |
| **Yoast SEO** | Otimização de SEO por página/artigo | Grátis |
| **WP Super Cache** ou **LiteSpeed Cache** | Performance e cache | Grátis |
| **Contact Form 7** | Formulário de contato | Grátis |
| **WP Social Chat** | Botão flutuante do WhatsApp | Grátis |
| **Wordfence** | Segurança básica | Grátis |
| **UpdraftPlus** | Backup automático | Grátis |
| **Custom Post Type UI** | Criar tipos de post para Cases/Portfólio | Grátis |
| **Google Analytics para WordPress** | Analytics integrado | Grátis |

---

## Estrutura de páginas WordPress

```
Páginas estáticas:
├── Home (template personalizado)
├── Quem Somos
├── Soluções (página hub)
│   ├── Desenvolvimento de Sistemas
│   ├── Criação de Sites
│   ├── Aplicativos Mobile
│   ├── Integrações e APIs
│   ├── Automações
│   ├── Chatbots e IA
│   └── Consultoria de TI
├── Portfólio (Custom Post Type: "cases")
├── Contato
└── Trabalhe Conosco

Post Types customizados:
├── Cases / Portfólio (custom post type)
└── Blog (post type padrão do WordPress)
```

---

## Configurações de SEO (checklist)

```
□ Instalar e configurar Yoast SEO
□ Definir título e descrição de cada página
□ Configurar sitemap XML (automático pelo Yoast)
□ Verificar site no Google Search Console
□ Instalar Google Analytics
□ Configurar Google Meu Negócio (se tiver CNPJ)
□ Adicionar schema markup nas páginas de serviço
□ Configurar Open Graph (redes sociais)
□ Testar velocidade no PageSpeed Insights
□ Certificar que está 100% responsivo (mobile-first)
```

---

## Checklist de performance

```
□ Comprimir todas as imagens (TinyPNG ou ShortPixel)
□ Ativar cache de página
□ Ativar lazy loading de imagens
□ Minificar CSS e JS
□ Usar CDN se possível
□ Pontuar 90+ no PageSpeed (mobile e desktop)
```

---

## URLs amigáveis

```
/                          → Home
/quem-somos                → Quem Somos
/solucoes                  → Página hub de soluções
/solucoes/sistemas         → Desenvolvimento de Sistemas
/solucoes/sites            → Criação de Sites
/solucoes/aplicativos      → Apps Mobile
/solucoes/integracoes-api  → Integrações e APIs
/solucoes/automacoes       → Automações
/solucoes/chatbots-ia      → Chatbots e IA
/solucoes/consultoria      → Consultoria de TI
/portfolio                 → Portfólio / Cases
/blog                      → Blog
/contato                   → Contato
/trabalhe-conosco          → Trabalhe Conosco
```
