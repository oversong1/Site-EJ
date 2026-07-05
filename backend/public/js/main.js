/* ============================================================
   EJ TECNOLOGIA — SCRIPTS PRINCIPAIS
   Usa API Laravel quando disponível, fallback localStorage
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  header();
  mobileMenu();
  activeNav();
  revealOnScroll();
  loadAndRenderSlider();
  loadThemeColors();         // Cores do tema (admin)
  loadServiceCardsOnPage();  // Cards da API
  loadTeamSection();         // Equipe dinâmica
  applyPageSettings();       // Textos editados no admin
  homeBlog();
  blogPage();
  postPage();
});

/* ── HEADER SCROLL ─────────────────────────────────────── */
function header() {
  const h = document.querySelector('.header');
  if (!h) return;
  const fn = () => h.classList.toggle('scrolled', window.scrollY > 20);
  window.addEventListener('scroll', fn, { passive: true });
  fn();
}

/* ── MENU MOBILE ───────────────────────────────────────── */
function mobileMenu() {
  const btn = document.querySelector('.hamburger');
  const nav = document.querySelector('.mobile-nav');
  if (!btn || !nav) return;
  btn.addEventListener('click', () => { btn.classList.toggle('active'); nav.classList.toggle('open'); document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : ''; });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
  document.addEventListener('click', e => { if (!btn.contains(e.target) && !nav.contains(e.target)) close(); });
  function close() { btn.classList.remove('active'); nav.classList.remove('open'); document.body.style.overflow = ''; }
}

/* ── NAV ATIVA ─────────────────────────────────────────── */
function activeNav() {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(a => {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });
}

/* ── REVEAL ────────────────────────────────────────────── */
function revealOnScroll() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

/* ── SLIDER ────────────────────────────────────────────── */
async function loadAndRenderSlider() {
  const wrap = document.getElementById('slider-wrap');
  if (!wrap) return;

  let banners = [];
  const res = await api('GET', '/banners');
  if (res.ok && Array.isArray(res.data)) {
    banners = res.data.filter(b => b.active);
  } else {
    // Fallback localStorage
    banners = EJ.getActive();
  }
  if (!banners.length) return;
  renderSlider(banners);
  // Aplica settings nas hero-stats (data-s) que foram renderizadas agora
  const s = JSON.parse(localStorage.getItem('ej_content') || '{}');
  _applySettingsToDOM(s);
  api('GET', '/settings').then(r => { if (r.ok && r.data) _applySettingsToDOM(r.data); });
}

function renderSlider(banners) {
  const slidesEl = document.getElementById('slider-slides');
  const dotsEl   = document.getElementById('slider-dots');
  if (!slidesEl) return;
  slidesEl.innerHTML = '';
  if (dotsEl) dotsEl.innerHTML = '';

  banners.forEach((b, i) => {
    const layout = b.layout || 'background'; // background | right | left
    const slide = document.createElement('div');
    slide.className = 'hero-slide layout-' + layout;

    // Bloco de conteúdo (igual em todos os layouts)
    const ctaBtn = `<a href="${b.cta_link||'#'}" class="btn btn-primary btn-lg"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style="flex-shrink:0;display:inline-block;vertical-align:middle"><path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326z"/></svg> ${EJ.esc(b.cta_text)}</a>`;
    const cta2Btn = b.cta2_text ? `<a href="${b.cta2_link||'#'}" class="btn btn-secondary btn-lg">${EJ.esc(b.cta2_text)} &rarr;</a>` : '';
    const contentHtml = `
      <div class="hero-content">
        <div class="hero-tag anim-fiu"><span class="hero-dot"></span>EJ Tecnologia — Dev + PM</div>
        <h1 class="hero-title anim-fiu d1">${EJ.esc(b.title)}</h1>
        <p class="hero-sub anim-fiu d2">${EJ.esc(b.subtitle)}</p>
        <div class="hero-actions anim-fiu d3">${ctaBtn}${cta2Btn}</div>
        ${(()=>{
          const bStats=Array.isArray(b.stats)?b.stats:(typeof b.stats==='string'&&b.stats?JSON.parse(b.stats):[]);
          if(!bStats||!bStats.length)return '';
          return '<div class="hero-stats anim-fiu d3">' + bStats.map(s=>'<div><div class="hero-stat-val gradient-text">'+EJ.esc(s.val)+'</div><div class="hero-stat-lbl">'+EJ.esc(s.lbl)+'</div></div>').join('') + '</div>';
        })()}
      </div>`;

    if (layout === 'right' || layout === 'left') {
      // Imagem ao lado do texto
      const imgHtml = b.image_url
        ? `<div class="hero-img-side"><img src="${b.image_url}" alt="${EJ.esc(b.title)}" loading="lazy"></div>`
        : '';
      slide.innerHTML = `<div class="hero-overlay" style="background:linear-gradient(135deg,rgba(15,15,26,.85),rgba(15,15,26,.45))"></div>
        <div class="container hero-layout-inner">${contentHtml}${imgHtml}</div>`;
    } else {
      // Layout background (padrão)
      if (b.image_url) {
        slide.style.cssText = `background-image:url('${b.image_url}');background-size:cover;background-position:center top`;
      }
      slide.innerHTML = `<div class="hero-overlay"></div>
        <div class="container" style="position:relative;z-index:2">${contentHtml}</div>`;
    }
    slidesEl.appendChild(slide);
    if (dotsEl) {
      const dot = document.createElement('button');
      dot.className = 'slider-dot';
      dot.setAttribute('aria-label', 'Slide ' + (i + 1));
      dot.addEventListener('click', () => { goTo(i); reset(); });
      dotsEl.appendChild(dot);
    }
  });

  const slides = slidesEl.querySelectorAll('.hero-slide');
  const dots   = dotsEl ? dotsEl.querySelectorAll('.slider-dot') : [];
  let cur = 0, timer;

  function goTo(n) {
    slides[cur].classList.remove('active'); if (dots[cur]) dots[cur].classList.remove('active');
    cur = (n + slides.length) % slides.length;
    slides[cur].classList.add('active'); if (dots[cur]) dots[cur].classList.add('active');
  }
  function next() { goTo(cur + 1); }
  function prev() { goTo(cur - 1); }
  function start() { timer = setInterval(next, 5500); }
  function reset() { clearInterval(timer); start(); }

  document.getElementById('btn-next')?.addEventListener('click', () => { next(); reset(); });
  document.getElementById('btn-prev')?.addEventListener('click', () => { prev(); reset(); });
  goTo(0); start();
}

/* ── BLOG HOME ─────────────────────────────────────────── */
async function homeBlog() {
  const el = document.getElementById('home-blog');
  if (!el) return;
  let posts = [];
  const res = await api('GET', '/posts?limit=3');
  if (res.ok && Array.isArray(res.data.data || res.data)) {
    posts = (res.data.data || res.data).slice(0, 3);
  } else {
    posts = EJ.getPosts().slice(0, 3);
  }
  el.innerHTML = posts.map(postCard).join('');
  revealOnScroll();
}

/* ── BLOG PAGE ─────────────────────────────────────────── */
let _allPosts = [];
const POSTS_PER_PAGE = 6;
let _blogPage = 1;
let _blogCat = '';
let _blogQ = '';

async function blogPage() {
  const el = document.getElementById('blog-grid');
  if (!el) return;

  const res = await api('GET', '/posts');
  _allPosts = (res.ok && Array.isArray(res.data.data || res.data)) ? (res.data.data || res.data) : EJ.getPosts();
  setTimeout(() => document.getElementById('blog-loading')?.remove(), 50);

  // Barra de busca + filtro de categorias
  const cats = [...new Set(_allPosts.map(p => p.category).filter(Boolean))];
  const controls = document.getElementById('blog-controls');
  if (controls) {
    controls.innerHTML =
      '<div style="display:flex;gap:.75rem;flex-wrap:wrap;align-items:center;margin-bottom:1.5rem">' +
      '<input id="blog-search" type="search" placeholder="Buscar artigos..." style="flex:1;min-width:200px;padding:.6rem 1rem;background:var(--surface);border:1px solid var(--border-light);border-radius:var(--radius-sm);color:var(--text);font-size:.875rem" oninput="_blogFilter()">' +
      '<div style="display:flex;gap:.5rem;flex-wrap:wrap">' +
      '<button class="blog-cat-btn active" onclick="_setBlogCat(this,null)">Todos</button>' +
      cats.map(function(cat){ return '<button class="blog-cat-btn" data-cat="'+EJ.esc(cat)+'" onclick="_setBlogCat(this,this.dataset.cat)">' + EJ.esc(cat) + '</button>'; }).join('') +
      '</div></div>';
    if (!document.getElementById('blog-cat-style')) {
      var s = document.createElement('style'); s.id='blog-cat-style';
      s.textContent='.blog-cat-btn{padding:.35rem .85rem;border:1px solid var(--border-light);border-radius:20px;background:transparent;color:var(--text-mut);cursor:pointer;font-size:.8rem;transition:.2s}.blog-cat-btn.active,.blog-cat-btn:hover{background:var(--primary);color:#fff;border-color:var(--primary)}';
      document.head.appendChild(s);
    }
  }
  _renderBlogGrid();
}

/* ── POST INDIVIDUAL ───────────────────────────────────── */
async function postPage() {
  const el = document.getElementById('post-container');
  if (!el) return;
  const id = new URLSearchParams(location.search).get('id');
  let post = null;
  if (id) {
    const res = await api('GET', '/posts/' + id);
    post = res.ok ? res.data : EJ.getPost(id);
  }
  if (!post) { el.innerHTML = '<div class="text-center" style="padding:5rem 0"><h2>Post não encontrado</h2><a href="blog.html" class="btn btn-primary mt-4">← Blog</a></div>'; return; }
  document.title = post.title + ' — EJ Tecnologia';
  const img = post.image_url
    ? `<img src="${post.image_url}" alt="${EJ.esc(post.title)}" style="width:100%;border-radius:var(--radius-lg);margin-bottom:2.5rem;max-height:320px;object-fit:cover">`
    : `<div class="blog-thumb" style="border-radius:var(--radius-lg);margin-bottom:2.5rem;height:220px;background:linear-gradient(135deg,${post.color||'#6C63FF'}28,${post.color||'#00D9FF'}18)"><span style="font-size:4rem">${getCatEmoji(post.category)}</span></div>`;
  el.innerHTML = `
    <div class="post-wrap">
      <a href="blog.html" style="display:inline-flex;align-items:center;gap:.4rem;color:var(--text-mut);font-size:.875rem;margin-bottom:2rem">← Voltar ao blog</a>
      <span class="post-cat-big">${EJ.esc(post.category)}</span>
      <h1 style="font-size:clamp(1.75rem,4vw,2.8rem);margin-bottom:1.25rem;line-height:1.15">${EJ.esc(post.title)}</h1>
      <div style="display:flex;gap:1.5rem;flex-wrap:wrap;margin-bottom:2.5rem;font-size:.82rem;color:var(--text-mut)">
        <span>✍️ ${EJ.esc(post.author)}</span>
        <span>📅 ${EJ.fmtDate(post.date || post.created_at)}</span>
        <span>📖 ${EJ.esc(post.read_time)} de leitura</span>
      </div>
      ${img}
      <div class="post-content">${post.content}</div>
      <div class="divider"></div>
      <div style="text-align:center;padding:1rem 0 2rem"><a href="blog.html" class="btn btn-secondary">← Ver todos os artigos</a></div>
    </div>`;
}

function _setBlogCat(btn, cat) {
  _blogCat = cat || ''; _blogPage = 1;
  document.querySelectorAll('.blog-cat-btn').forEach(function(b){b.classList.remove('active');});
  if (btn) btn.classList.add('active');
  _renderBlogGrid();
}

function _blogFilter() {
  _blogQ = (document.getElementById('blog-search')?.value || '').toLowerCase().trim();
  _blogPage = 1; _renderBlogGrid();
}

function _renderBlogGrid() {
  const el = document.getElementById('blog-grid');
  const pagEl = document.getElementById('blog-pagination');
  if (!el) return;
  let filtered = _allPosts;
  if (_blogCat) filtered = filtered.filter(function(p){return p.category===_blogCat;});
  if (_blogQ)   filtered = filtered.filter(function(p){
    return (p.title||'').toLowerCase().includes(_blogQ)||(p.excerpt||'').toLowerCase().includes(_blogQ)||(p.category||'').toLowerCase().includes(_blogQ);
  });
  const total = filtered.length;
  const pages = Math.ceil(total / POSTS_PER_PAGE);
  const slice = filtered.slice((_blogPage-1)*POSTS_PER_PAGE, _blogPage*POSTS_PER_PAGE);
  el.innerHTML = slice.length ? slice.map(postCard).join('') : '<p class="text-muted text-center" style="padding:4rem">Nenhum artigo encontrado.</p>';
  if (pagEl) {
    if (pages <= 1) { pagEl.innerHTML = ''; }
    else {
      var ph = '<div style="display:flex;gap:.5rem;justify-content:center;margin-top:2rem;flex-wrap:wrap">';
      if (_blogPage>1) ph += '<button class="btn btn-outline btn-sm" onclick="_goPage('+(_blogPage-1)+')">&#8592; Anterior</button>';
      for (var i=1;i<=pages;i++) ph += '<button class="btn btn-sm '+(i===_blogPage?'btn-primary':'btn-outline')+'" onclick="_goPage('+i+')">'+i+'</button>';
      if (_blogPage<pages) ph += '<button class="btn btn-outline btn-sm" onclick="_goPage('+(_blogPage+1)+')">Próximo &#8594;</button>';
      pagEl.innerHTML = ph + '</div>';
    }
  }
  revealOnScroll();
}

function _goPage(p) {
  _blogPage = p; _renderBlogGrid();
  document.getElementById('blog-grid')?.scrollIntoView({behavior:'smooth',block:'start'});
}

async function postPage() {
  const el = document.getElementById('post-container');
  if (!el) return;
  const id = new URLSearchParams(location.search).get('id');
  let post = null;
  if (id) {
    const res = await api('GET', '/posts/' + id);
    post = res.ok ? res.data : EJ.getPost(id);
  }
  if (!post) { el.innerHTML = '<div class="text-center" style="padding:5rem 0"><h2>Post não encontrado</h2><a href="blog.html" class="btn btn-primary mt-4">← Blog</a></div>'; return; }
  document.title = post.title + ' — EJ Tecnologia';
  const img = post.image_url
    ? `<img src="${post.image_url}" alt="${EJ.esc(post.title)}" style="width:100%;border-radius:var(--radius-lg);margin-bottom:2.5rem;max-height:320px;object-fit:cover">`
    : `<div class="blog-thumb" style="border-radius:var(--radius-lg);margin-bottom:2.5rem;height:220px;background:linear-gradient(135deg,${post.color||'#6C63FF'}28,${post.color||'#00D9FF'}18)"><span style="font-size:4rem">${getCatEmoji(post.category)}</span></div>`;
  el.innerHTML = `
    <div class="post-wrap">
      <a href="blog.html" style="display:inline-flex;align-items:center;gap:.4rem;color:var(--text-mut);font-size:.875rem;margin-bottom:2rem">← Voltar ao blog</a>
      <span class="post-cat-big">${EJ.esc(post.category)}</span>
      <h1 style="font-size:clamp(1.75rem,4vw,2.8rem);margin-bottom:1.25rem;line-height:1.15">${EJ.esc(post.title)}</h1>
      <div style="display:flex;gap:1.5rem;flex-wrap:wrap;margin-bottom:2.5rem;font-size:.82rem;color:var(--text-mut)">
        <span>✍️ ${EJ.esc(post.author)}</span>
        <span>📅 ${EJ.fmtDate(post.date || post.created_at)}</span>
        <span>📖 ${EJ.esc(post.read_time)} de leitura</span>
      </div>
      ${img}
      <div class="post-content">${post.content}</div>
      <div class="divider"></div>
      <div style="text-align:center;padding:1rem 0 2rem"><a href="blog.html" class="btn btn-secondary">← Ver todos os artigos</a></div>
    </div>`;
}

/* ── HELPERS ───────────────────────────────────────────── */
function postCard(p) {
  const color = p.color || '#6C63FF';
  const img = p.image_url
    ? `<div class="blog-thumb"><img src="${p.image_url}" alt="${EJ.esc(p.title)}" loading="lazy" style="width:100%;height:100%;object-fit:cover"></div>`
    : `<div class="blog-thumb" style="background:linear-gradient(135deg,${color}28,${color}18)"><span style="font-size:3rem">${getCatEmoji(p.category)}</span></div>`;
  // cor sempre aplicada: borda superior do card + badge da categoria
  return `<article class="blog-card reveal" style="border-top:3px solid ${color}" onclick="location.href='/blog/${p.slug || p.id}'">${img}<div class="blog-body"><span class="blog-cat" style="background:${color}22;color:${color}">${EJ.esc(p.category)}</span><h3 class="blog-title">${EJ.esc(p.title)}</h3><p class="blog-exc">${EJ.esc(p.excerpt)}</p><div class="blog-meta"><span>✍️ ${EJ.esc(p.author)}</span><span>📖 ${EJ.esc(p.read_time||'5 min')}</span></div></div></article>`;
}


/* ── CARDS DE SERVIÇOS (carrega da API) ─────────────────── */

/* Renderiza ícone do card: emoji direto ou SVG via sprite */
function _renderCardIcon(icon) {
  icon = icon || '🖥';
  if (icon.startsWith('[svg:')) {
    var id = icon.slice(5, -1);
    return '<svg style="width:28px;height:28px;fill:currentColor" aria-hidden="true"><use href="#' + id + '"/></svg>';
  }
  return EJ.esc(icon);
}
function _renderCards(cards) {
  return cards.map(c => {
    const rawTags = c.tags;
    const tagsArr = Array.isArray(rawTags) ? rawTags : (typeof rawTags==='string'&&rawTags ? (function(){ try{return JSON.parse(rawTags);}catch(e){return [];} })() : []);
    const tags = tagsArr.map(t => '<span class="service-tag">' + EJ.esc(t) + '</span>').join('');
    return '<div class="service-card reveal">' +
      '<div class="service-icon-wrap" style="font-size:1.6rem">' + _renderCardIcon(c.icon) + '</div>' +
      '<div class="service-title">' + EJ.esc(c.title) + '</div>' +
      '<p class="service-desc">' + EJ.esc(c.description) + '</p>' +
      '<div class="service-tags">' + tags + '</div>' +
      '</div>';
  }).join('');
}

async function loadServiceCardsOnPage() {
  // Home: carrega cards com section='both' ou section='home'
  const homeGrid = document.getElementById('service-cards-grid');
  
  const r = await api('GET', '/service-cards');
  const allCards = r.ok ? (r.data.data || r.data || []) : [];
  if (!allCards.length) return;

  // Home page grid
  if (homeGrid) {
    const homeCards = allCards.filter(c => !c.section || c.section === 'both' || c.section === 'home');
    if (homeCards.length) {
      homeGrid.innerHTML = _renderCards(homeCards);
      revealOnScroll();
    }
  }

  // Serviços page section grids
  document.querySelectorAll('[data-section-grid]').forEach(grid => {
    const section = grid.getAttribute('data-section-grid');
    const sectionCards = allCards.filter(c => c.section === section || (section === 'both' && (!c.section || c.section === 'both')));
    if (sectionCards.length) {
      grid.innerHTML = _renderCards(sectionCards);
    } else {
      grid.style.display = 'none'; // Esconde se não há cards nesta seção
    }
  });
  revealOnScroll();
}

/* ── APLICA CONFIGURAÇÕES DE TEXTO AO DOM ────────────────── */
async function applyPageSettings() {
  const local = JSON.parse(localStorage.getItem('ej_content') || '{}');

  // Tenta API primeiro (fonte mais confiável)
  const r = await api('GET', '/settings');
  if (r.ok && r.data && Object.keys(r.data).length > 0) {
    // API respondeu: usa dados do servidor (mais atualizados)
    const merged = Object.assign({}, local, r.data);
    _applySettingsToDOM(merged);
    // Atualiza localStorage com dados frescos
    localStorage.setItem('ej_content', JSON.stringify(merged));
  } else if (Object.keys(local).length > 0) {
    // API offline: usa localStorage como fallback
    _applySettingsToDOM(local);
  }
  // Se ambos vazios: mantém o HTML padrão (sem mudanças)
}

function _applySettingsToDOM(settings) {
  if (!settings || !Object.keys(settings).length) return;
  // Aplica em qualquer elemento com data-s="chave"
  document.querySelectorAll('[data-s]').forEach(function(el) {
    var key = el.getAttribute('data-s');
    if (settings[key] !== undefined && settings[key] !== '') {
      el.textContent = settings[key];
    }
  });
  // Atualiza links do WhatsApp
  if (settings.contact_whatsapp) {
    document.querySelectorAll('a[href*="wa.me"]').forEach(function(a) {
      a.href = 'https://wa.me/' + settings.contact_whatsapp;
    });
  }
  // Atualiza links de e-mail
  if (settings.contact_email) {
    document.querySelectorAll('a[href^="mailto:"]').forEach(function(a) {
      a.href = 'mailto:' + settings.contact_email;
    });
  }
  // Atualiza chips da Stack dinamicamente
  if (settings.stack_items) {
    var wrap = document.querySelector('.stack-wrap');
    if (wrap) {
      var iconMap = {
        'PHP':'#i-systems','React':'#i-systems','Python':'#i-systems','Java':'#i-systems',
        'MySQL':'#i-db','SQL':'#i-db','Docker':'#i-devops','CI/CD':'#i-devops',
        'API':'#i-api','Webhook':'#i-api','N8N':'#i-automation','Automa':'#i-automation',
        'WordPress':'#i-web','IA':'#i-chatbot','LLM':'#i-chatbot','Chatbot':'#i-chatbot',
      };
      // Suporta tanto '|' (default atual) quanto '\n' (entrada manual do admin)
      var sep = settings.stack_items.includes('|') ? '|' : '\n';
      var items = settings.stack_items.split(sep).map(function(s){return s.trim();}).filter(Boolean);
      wrap.innerHTML = items.map(function(item) {
        var iconHref = '#i-systems';
        Object.keys(iconMap).forEach(function(k){ if(item.indexOf(k)>=0) iconHref = iconMap[k]; });
        return '<div class="stack-chip"><svg class="icon"><use href="' + iconHref + '"/></svg> ' + item + '</div>';
      }).join('');
    }
  }
}

function getCatEmoji(cat) {
  const m = { Sistemas:'🖥', SaaS:'☁', ERP:'🏢', Automação:'⚙', DevOps:'🚀', APIs:'🔗', Chatbots:'💬', IA:'🧠', Mobile:'📱', Sites:'🌐' };
  return m[cat] || '📄';
}

/* ══ EQUIPE DINÂMICA ══════════════════════════════════════════ */
async function loadTeamSection() {
  const grid = document.getElementById('team-grid-home');
  if (!grid) return;

  const r = await api('GET', '/team');
  const members = r.ok ? (r.data || []) : [];
  if (!members.length) {
    // Fallback: mantém placeholder vazio — não quebra a página
    grid.innerHTML = '<p style="color:var(--text-mut);text-align:center;padding:2rem">Carregando equipe...</p>';
    return;
  }

  grid.innerHTML = members.map(m => {
    const tagsArr = Array.isArray(m.tags) ? m.tags : [];
    const tagsHtml = tagsArr.map(t => '<span class="skill-badge">' + EJ.esc(t) + '</span>').join('');
    const photoHtml = m.photo_url
      ? '<img src="' + EJ.esc(m.photo_url) + '" alt="' + EJ.esc(m.name) + '" style="width:100%;height:100%;object-fit:cover;border-radius:50%">'
      : '<svg class="svc-svg" style="width:40px;height:40px;opacity:.5"><use href="#i-user"/></svg>';
    const liHtml = m.linkedin
      ? '<a href="' + EJ.esc(m.linkedin) + '" target="_blank" class="team-li"><svg class="icon" style="width:16px;height:16px"><use href="#i-linkedin"/></svg> LinkedIn</a>'
      : '';
    return '<div class="team-card">' +
      '<div class="team-photo" id="photo-' + m.key + '">' + photoHtml + '</div>' +
      '<div class="team-name">' + EJ.esc(m.name) + '</div>' +
      '<div class="team-role">' + EJ.esc(m.role || '') + '</div>' +
      '<p class="team-bio">' + EJ.esc(m.bio || '') + '</p>' +
      (tagsHtml ? '<div class="team-skills">' + tagsHtml + '</div>' : '') +
      liHtml +
      '</div>';
  }).join('');
}

/* ══ TEMA: CORES DO ADMIN ══════════════════════════════════ */
async function loadThemeColors() {
  // CSS vars que podem ser sobrescritas pelo admin
  const THEME_VARS = [
    '--primary','--primary-light','--primary-dark',
    '--secondary','--accent','--success','--warning','--danger',
    '--bg','--surface','--surface2','--surface3',
    '--text','--text-sec','--text-mut',
    '--radius','--radius-sm','--radius-lg',
    '--font', '--wpp'
  ];

  // 1. Aplica localStorage imediatamente (zero flicker)
  const local = JSON.parse(localStorage.getItem('ej_colors') || '{}');
  if (Object.keys(local).length) {
    const root = document.documentElement;
    Object.entries(local).forEach(([k, v]) => {
      if (THEME_VARS.includes(k)) root.style.setProperty(k, v);
    });
  }

  // 2. Busca da API e sincroniza
  try {
    const r = await api('GET', '/settings');
    if (!r.ok) return;
    const settings = r.data || {};
    const root = document.documentElement;
    const saved = {};
    THEME_VARS.forEach(v => {
      if (settings[v]) {
        root.style.setProperty(v, settings[v]);
        saved[v] = settings[v];
      }
    });
    if (Object.keys(saved).length) {
      localStorage.setItem('ej_colors', JSON.stringify(saved));
    }
  } catch(e) { /* offline — usa localStorage */ }
}

/* ══ FORMULÁRIO DE CONTATO (Laravel API) ════════════════ */
(function() {
  document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('contact-form');
    if (!form) return;
    form.addEventListener('submit', async function(e) {
      e.preventDefault();
      var btn = form.querySelector('[type="submit"]');
      var ok  = document.getElementById('contact-ok');
      var err = document.getElementById('contact-err');
      if (ok) ok.style.display = 'none';
      if (err) err.style.display = 'none';
      if (btn) { btn.disabled = true; btn.textContent = 'Enviando...'; }

      var payload = {
        name:    form.querySelector('[name="name"]')?.value?.trim()    || '',
        email:   form.querySelector('[name="email"]')?.value?.trim()   || '',
        service: form.querySelector('[name="service"]')?.value?.trim() || '',
        message: form.querySelector('[name="message"]')?.value?.trim() || '',
      };

      var r = await api('POST', '/contact', payload);
      if (r.ok) {
        form.reset();
        if (ok) ok.style.display = 'block';
      } else {
        if (err) {
          err.textContent = (r.data?.message || r.data?.errors?.message?.[0] || '❌ Erro ao enviar. Tente pelo WhatsApp.');
          err.style.display = 'block';
        }
      }
      if (btn) { btn.disabled = false; btn.innerHTML = '<svg class="icon icon-sm"><use href="#i-email"/></svg> Enviar mensagem'; }
    });
  });
})();
