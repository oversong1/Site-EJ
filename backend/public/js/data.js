/* ============================================================
   CODESIZE — DATA LAYER
   Gerencia banners e posts via localStorage
   Senha admin: ej@admin2026
   ============================================================ */

const EJ = {

  K: { BANNERS:'ej_banners', POSTS:'ej_posts', INIT:'ej_init', AUTH:'ej_auth' },

  DEFAULTS: {
    banners: [
      {
        id:1, active:true,
        title: "Tecnologia que resolve o problema certo.",
        subtitle: "Sistemas, automações, sites e APIs feitos sob medida para o seu negócio crescer.",
        cta_text: "Falar no WhatsApp", cta_link: "https://wa.me/5511999999999",
        cta2_text: "Ver Serviços",     cta2_link: "servicos.html"
      },
      {
        id:2, active:true,
        title: "SaaS, ERP, Automações e muito mais.",
        subtitle: "Do zero ao sistema completo — com CI/CD, APIs e metodologia ágil do início ao fim.",
        cta_text: "Conhecer Soluções", cta_link: "servicos.html",
        cta2_text: "Blog Técnico",     cta2_link: "blog.html"
      },
      {
        id:3, active:true,
        title: "Você foca no negócio. A gente cuida da tecnologia.",
        subtitle: "Emerson Souza + Julio Cesar Leal — Dev Full-Stack e PM trabalhando juntos pelo seu resultado.",
        cta_text: "Conheça a equipe",  cta_link: "index.html#sobre",
        cta2_text: "Nosso portfólio",  cta2_link: "index.html#portfolio"
      }
    ],

    posts: [
      {
        id:1, color:"#6C63FF", category:"Sistemas", author:"Emerson Souza", read_time:"5 min",
        date:"2026-07-01", slug:"o-que-e-saas",
        title: "O que é SaaS e por que pode transformar o seu negócio",
        excerpt: "SaaS (Software as a Service) é um modelo onde você usa o software pela internet via assinatura. Entenda como funciona e quando faz sentido para o seu negócio.",
        content: `<p><strong>SaaS</strong> significa <em>Software as a Service</em> — Software como Serviço. Em vez de comprar e instalar um programa, você acessa pela internet e paga mensalmente.</p>
<p>Exemplos que todos conhecem: Google Workspace, Spotify, Trello, Notion. Todos são SaaS.</p>
<h3>Vantagens para quem usa</h3>
<ul>
  <li><strong>Sem investimento alto inicial</strong> — o cliente não precisa pagar R$ 20.000 de uma vez</li>
  <li><strong>Sempre atualizado</strong> — recebe melhorias automaticamente</li>
  <li><strong>Acesso de qualquer lugar</strong> — celular, tablet, notebook</li>
  <li><strong>Sem manutenção</strong> — o fornecedor cuida de tudo</li>
</ul>
<h3>Vantagens para quem vende</h3>
<ul>
  <li><strong>Receita recorrente</strong> — você recebe todo mês, não só uma vez</li>
  <li><strong>Escalável</strong> — a mesma plataforma serve centenas de clientes</li>
  <li><strong>Fidelização natural</strong> — cliente que usa se acostuma e raramente cancela</li>
</ul>
<h3>Quando faz sentido construir um SaaS?</h3>
<p>Quando você tem um processo repetitivo que outras empresas do mesmo segmento também têm. Exemplos: sistema de agendamento para salões, gestão de estoque para pequeno comércio, portal de clientes para prestadores de serviço.</p>
<h3>Nossa stack para SaaS</h3>
<p>Utilizamos <strong>PHP/Laravel</strong> no back-end, <strong>React ou Blade</strong> no front-end, <strong>MySQL</strong> como banco, e <strong>CI/CD com GitHub Actions</strong> para entregas frequentes e seguras.</p>`
      },
      {
        id:2, color:"#00D9FF", category:"Automação", author:"Emerson Souza", read_time:"4 min",
        date:"2026-07-01", slug:"5-automacoes-n8n",
        title: "5 processos que você pode automatizar hoje com N8N",
        excerpt: "N8N é uma ferramenta open source de automação que conecta sistemas sem escrever código. Veja 5 exemplos práticos que qualquer empresa pode implementar agora.",
        content: `<p>O <strong>N8N</strong> é uma ferramenta de automação visual — você conecta blocos para criar fluxos que executam tarefas automaticamente. É open source e pode ser hospedado no seu próprio servidor, sem custo de licença.</p>
<h3>1. Lembrete automático de agendamento</h3>
<p>2 horas antes do horário marcado, o sistema envia uma mensagem de WhatsApp automática para o cliente. Zero trabalho manual, zero falta sem aviso.</p>
<h3>2. Formulário → CRM + E-mail + Planilha</h3>
<p>Quando alguém preenche um formulário no site, os dados vão automaticamente para o CRM, para uma planilha do Google Sheets e dispara um e-mail de boas-vindas.</p>
<h3>3. Relatório diário automático</h3>
<p>Todo dia às 8h, um resumo das métricas do dia anterior chega no e-mail do gestor — sem ninguém precisar montar manualmente.</p>
<h3>4. Notificação de novo pedido</h3>
<p>Cada vez que chega um pedido no e-commerce, o time recebe um WhatsApp com os detalhes. Resposta mais rápida, cliente mais satisfeito.</p>
<h3>5. Backup automático para o Google Drive</h3>
<p>Todo dia à meia-noite, os arquivos importantes são copiados automaticamente para uma pasta organizada no Drive.</p>
<p>Todas essas automações são possíveis com N8N em questão de horas, sem precisar escrever muito código.</p>`
      },
      {
        id:3, color:"#10B981", category:"DevOps", author:"Emerson Souza", read_time:"6 min",
        date:"2026-07-01", slug:"o-que-e-cicd",
        title: "CI/CD: o que é e por que todo projeto sério precisa disso",
        excerpt: "CI/CD significa Integração e Entrega Contínua. É a prática de automatizar testes e deploy para que cada mudança no código seja entregue com segurança e rapidez.",
        content: `<p><strong>CI/CD</strong> é a sigla para <em>Continuous Integration / Continuous Delivery</em> — Integração e Entrega Contínua.</p>
<p>Em termos simples: é um sistema que, toda vez que você faz uma alteração no código e envia para o repositório, automaticamente:</p>
<ol>
  <li>Roda os testes automatizados</li>
  <li>Verifica se o código está correto</li>
  <li>Faz o deploy no servidor</li>
</ol>
<h3>Por que isso importa?</h3>
<p>Sem CI/CD, publicar uma nova versão é um processo manual, demorado e sujeito a erro humano. Com CI/CD, é automático, rápido e seguro. O time entrega mais rápido com muito menos medo.</p>
<h3>O que usamos</h3>
<p>Nos nossos projetos usamos <strong>GitHub Actions</strong> para criar pipelines de CI/CD. É gratuito para repositórios públicos e tem plano generoso para projetos privados.</p>
<p>Um pipeline típico para Laravel inclui: rodar <strong>PHPUnit</strong>, verificar padrão de código, fazer deploy via SSH e rodar as migrations automaticamente.</p>
<h3>Resultado para o cliente</h3>
<p>Entregas mais frequentes, sem downtime, com rollback automático em caso de problema. O cliente vê melhorias toda semana — sem medo de quebrar o sistema.</p>`
      }
    ]
  },

  // ── Init ────────────────────────────────────────────────
  init() {
    if (!localStorage.getItem(this.K.INIT)) {
      localStorage.setItem(this.K.BANNERS, JSON.stringify(this.DEFAULTS.banners));
      localStorage.setItem(this.K.POSTS,   JSON.stringify(this.DEFAULTS.posts));
      localStorage.setItem(this.K.INIT, '1');
    }
  },

  // ── Banners ─────────────────────────────────────────────
  getBanners()  { this.init(); return this._read(this.K.BANNERS); },
  getActive()   { return this.getBanners().filter(b => b.active); },
  saveBanners(d){ localStorage.setItem(this.K.BANNERS, JSON.stringify(d)); },

  addBanner(b)  { const all=this.getBanners(); b.id=Date.now(); all.push(b); this.saveBanners(all); return b; },
  delBanner(id) { this.saveBanners(this.getBanners().filter(b=>b.id!=id)); },
  updBanner(id,d){ const all=this.getBanners(), i=all.findIndex(b=>b.id==id); if(i>-1){all[i]={...all[i],...d}; this.saveBanners(all);} },

  // ── Posts ────────────────────────────────────────────────
  getPosts()    { this.init(); return this._read(this.K.POSTS); },
  getPost(id)   { return this.getPosts().find(p=>p.id==id)||null; },
  savePosts(d)  { localStorage.setItem(this.K.POSTS, JSON.stringify(d)); },

  addPost(p)    { const all=this.getPosts(); p.id=Date.now(); p.date=p.date||new Date().toISOString().split('T')[0]; p.slug=this.slug(p.title); all.unshift(p); this.savePosts(all); return p; },
  delPost(id)   { this.savePosts(this.getPosts().filter(p=>p.id!=id)); },
  updPost(id,d) { const all=this.getPosts(), i=all.findIndex(p=>p.id==id); if(i>-1){all[i]={...all[i],...d}; this.savePosts(all);} },

  // ── Auth ─────────────────────────────────────────────────
  loggedIn()   { return sessionStorage.getItem(this.K.AUTH)==='1'; },
  login(pw)    { if(pw==='ej@admin2026'){sessionStorage.setItem(this.K.AUTH,'1');return true;} return false; },
  logout()     { sessionStorage.removeItem(this.K.AUTH); },

  // ── Utils ────────────────────────────────────────────────
  _read(k) { try{return JSON.parse(localStorage.getItem(k))||[];}catch{return[];} },
  fmtDate(s){ const d=new Date(s+'T12:00:00'); return d.toLocaleDateString('pt-BR',{day:'2-digit',month:'long',year:'numeric'}); },
  slug(t)   { return t.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,''); },
  esc(s)    { if(!s)return''; const d=document.createElement('div'); d.appendChild(document.createTextNode(String(s))); return d.innerHTML; }
};
