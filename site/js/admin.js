/* ============================================================
   EJ TECNOLOGIA - ADMIN PANEL JS
   Roles: admin (tudo) | colaborador (conteúdo, sem usuários)
   ============================================================ */

/* ── Seções de conteúdo editável (definidas aqui, não no banco) ── */
const PAGE_SECTIONS = [
  // GLOBAL
  { tab:'Global', section:'Identidade',    key:'site_name',         label:'Nome do site',               type:'text',     default:'EJ Tecnologia',                       where:'footer + aba do browser' },
  { tab:'Global', section:'Contato',       key:'contact_whatsapp',  label:'WhatsApp (DDI+DDD+número)',  type:'text',     default:'5511999999999',                       hint:'Apenas números. Ex: 5511999999999', where:'todos os botões de WhatsApp' },
  { tab:'Global', section:'Contato',       key:'contact_email',     label:'E-mail de contato',          type:'text',     default:'contato@ejtecnologia.com.br',          where:'todos os links de e-mail' },
  { tab:'Global', section:'Rodapé',      key:'footer_text',       label:'Texto do rodapé',          type:'textarea', default:'Sistemas, automações, sites e APIs feitos sob medida para o seu negócio crescer.', where:'rodapé de todas as páginas' },
  // HOME





  { tab:'Home', section:'O que fazemos',  key:'home_services_title', label:'Título da seção',            type:'text',     default:'Nossas Soluções',                   where:'home: título da grade de serviços' },
  { tab:'Home', section:'O que fazemos',  key:'home_services_sub',   label:'Subtítulo da seção',          type:'textarea', default:'Do sistema mais simples ao mais complexo — tecnologia que resolve o problema certo.', where:'home: texto abaixo do título' },
  { tab:'Home', section:'Metodologia',    key:'home_method_title',   label:'Título da seção',            type:'text',     default:'Do problema à solução em 4 passos', where:'home: título da metodologia' },
  { tab:'Home', section:'Metodologia',    key:'home_step1_title',    label:'Passo 1 — Título',               type:'text',     default:'1. Diagnóstico',                  where:'home: título passo 1' },
  { tab:'Home', section:'Metodologia',    key:'home_step1_desc',     label:'Passo 1 — Descrição',        type:'textarea', default:'Entendemos a dor, o objetivo e o que precisa existir para resolver de verdade.', where:'home: descrição passo 1' },
  { tab:'Home', section:'Metodologia',    key:'home_step2_title',    label:'Passo 2 — Título',               type:'text',     default:'2. Proposta',                         where:'home: título passo 2' },
  { tab:'Home', section:'Metodologia',    key:'home_step2_desc',     label:'Passo 2 — Descrição',        type:'textarea', default:'Escopo fechado, prazo e valor definidos antes de começar. Sem surpresa.', where:'home: descrição passo 2' },
  { tab:'Home', section:'Metodologia',    key:'home_step3_title',    label:'Passo 3 — Título',               type:'text',     default:'3. Desenvolvimento',                  where:'home: título passo 3' },
  { tab:'Home', section:'Metodologia',    key:'home_step3_desc',     label:'Passo 3 — Descrição',        type:'textarea', default:'Entregas semanais com CI/CD. Você acompanha o progresso o tempo todo.', where:'home: descrição passo 3' },
  { tab:'Home', section:'Metodologia',    key:'home_step4_title',    label:'Passo 4 — Título',               type:'text',     default:'4. Entrega',                          where:'home: título passo 4' },
  { tab:'Home', section:'Metodologia',    key:'home_step4_desc',     label:'Passo 4 — Descrição',        type:'textarea', default:'Treinamento, documentação e suporte inclusos. Não sumimos depois de entregar.', where:'home: descrição passo 4' },
  { tab:'Home', section:'A Equipe',       key:'home_about_title',    label:'Título da seção',            type:'text',     default:'Dev + PM — uma combinação rara', where:'home: título da seção Sobre' },
  { tab:'Home', section:'A Equipe',       key:'home_about_sub',      label:'Subtítulo da seção',          type:'textarea', default:'Cada projeto tem um desenvolvedor que entende negócio e um PM que entende tecnologia.', where:'home: texto abaixo do título' },
  { tab:'Home', section:'Stack', key:'stack_items', label:'Tecnologias (uma por linha)', type:'textarea', default:'PHP / PHP com Laravel|React / React Native|Python / FastAPI / Django|Java com Spring Boot|MySQL - SQL Server|Docker - CI/CD|N8N - Automacoes|WordPress - WooCommerce|IA / LLMs - Chatbots', hint:'Uma tecnologia por linha (usa Enter). Aparecem como chips na Home.', where:'home: secao Stack' },
  { tab:'Home', section:'CTA Final', key:'home_cta_title', label:'Titulo do CTA', type:'text', default:'Tem um problema que a tecnologia pode resolver?', where:'home: titulo do CTA final' },
  { tab:'Home', section:'CTA Final', key:'home_cta_sub', label:'Subtitulo do CTA', type:'textarea', default:'Em 15 minutos voce sabe se temos uma solucao - e quanto vai custar. Sem enrolacao.', where:'home: texto do CTA final' },
  // SERVICOS
  { tab:'Servicos', section:'Hero', key:'serv_hero_title', label:'Titulo do topo', type:'text', default:'Tecnologia certa para cada problema', where:'servicos.html: titulo do hero' },
  { tab:'Servicos', section:'Hero', key:'serv_hero_sub', label:'Subtitulo do topo', type:'textarea', default:'Do sistema mais simples a plataforma mais complexa.', where:'servicos.html: subtitulo do hero' },
  // Secao 1 - Sistemas Web
  { tab:'Servicos', section:'Sistemas Web', key:'serv_s1_title', label:'Titulo', type:'text', default:'Desenvolvimento de Sistemas Web', where:'servicos.html: titulo secao Sistemas' },
  { tab:'Servicos', section:'Sistemas Web', key:'serv_s1_sub', label:'Subtitulo', type:'textarea', default:'Plataformas que trabalham por voce 24h por dia, construidas com PHP com Laravel, React e CI/CD desde o inicio.', where:'servicos.html: subtitulo secao Sistemas' },











  // Secao 2 - Sites
  { tab:'Servicos', section:'Sites e E-commerce', key:'serv_s2_title', label:'Titulo', type:'text', default:'Sites e E-commerce', where:'servicos.html' },
  { tab:'Servicos', section:'Sites e E-commerce', key:'serv_s2_sub', label:'Subtitulo', type:'textarea', default:'Feitos para atrair, convencer e converter - responsivos, rapidos e com SEO.', where:'servicos.html' },







  // Secoes 3-5
  { tab:'Servicos', section:'APIs e Integracoes', key:'serv_s3_title', label:'Titulo', type:'text', default:'Integracoes e APIs', where:'servicos.html' },
  { tab:'Servicos', section:'APIs e Integracoes', key:'serv_s3_sub', label:'Subtitulo', type:'textarea', default:'Seus sistemas falando a mesma lingua - conectamos tudo com PHP com Laravel, Python ou N8N.', where:'servicos.html' },
  { tab:'Servicos', section:'Automacoes', key:'serv_s4_title', label:'Titulo', type:'text', default:'Automacoes e Processos', where:'servicos.html' },
  { tab:'Servicos', section:'CI/CD', key:'serv_s5_title', label:'Titulo', type:'text', default:'CI/CD e Boas Praticas', where:'servicos.html' },
  // CTA
  { tab:'Servicos', section:'CTA Final', key:'serv_cta_title', label:'Titulo do CTA', type:'text', default:'Qual dessas solucoes faz sentido para voce?', where:'servicos.html: CTA final' },
  { tab:'Servicos', section:'CTA Final', key:'serv_cta_sub', label:'Subtitulo do CTA', type:'textarea', default:'Em 15 minutos de conversa a gente identifica o que resolve - e da uma estimativa de prazo e valor.', where:'servicos.html: CTA final' },
  // BLOG
  { tab:'Blog', section:'Hero', key:'blog_hero_title', label:'Titulo do topo', type:'text', default:'Conteudo tecnico e de negocio', where:'blog.html: titulo do hero' },
  { tab:'Blog', section:'Hero', key:'blog_hero_sub', label:'Subtitulo do topo', type:'textarea', default:'Artigos sobre sistemas, automacoes, SaaS, APIs e DevOps.', where:'blog.html: subtitulo do hero' },
];

let currentSettings = {};
let currentRole     = 'admin';
let _cachedBanners  = [];
let _cachedPosts    = [];

document.addEventListener('DOMContentLoaded', () => {
  auth();
  initNav();
  initPasswordStrength();
  initBanners();
  initPosts();
  initCards();
  initUsers();
  document.getElementById('btn-logout')?.addEventListener('click', logout);
  // Fechar image picker ao clicar fora
  document.addEventListener('click', e => {
    if (!e.target.closest('#icon-picker-panel') && !e.target.closest('[onclick*="toggleIconPicker"]')) {
      const p = document.getElementById('icon-picker-panel');
      if (p) p.style.display = 'none';
    }
  });
});

/* ══ AUTH ═════════════════════════════════════════════════════ */
async function auth() {
  const login = document.getElementById('adm-login');
  const dash  = document.getElementById('adm-dash');
  const storedToken = localStorage.getItem('ej_token');
  const storedRole  = localStorage.getItem('ej_role');

  if (storedToken && storedRole) {
    applyRole({ name: localStorage.getItem('ej_name')||'Admin', role: storedRole, email: localStorage.getItem('ej_email')||'' });
    hide(login); show(dash); loadDash();
    api('GET', '/auth/me').then(me => {
      if (me.ok && me.data.role) {
        applyRole(me.data);
        localStorage.setItem('ej_name',  me.data.name  || '');
        localStorage.setItem('ej_role',  me.data.role  || 'admin');
        localStorage.setItem('ej_email', me.data.email || '');
      }
    });
  } else {
    hide(dash); show(login);
  }

  const form = document.getElementById('login-form');
  form?.addEventListener('submit', async e => {
    e.preventDefault();
    const err = document.getElementById('login-error');
    const email = document.getElementById('adm-email').value;
    const pw    = document.getElementById('adm-pw').value;
    const r = await api('POST', '/auth/login', { email, password: pw });
    if (r.ok && r.data.token) {
      localStorage.setItem('ej_token', r.data.token);
      localStorage.setItem('ej_role',  r.data.role  || 'admin');
      localStorage.setItem('ej_name',  r.data.name  || '');
      localStorage.setItem('ej_email', r.data.email || '');
      applyRole(r.data);
      if (err) err.style.display = 'none';
      hide(login); show(dash); loadDash();
    } else {
      if (err) { err.style.display = ''; err.textContent = 'E-mail ou senha incorretos.'; }
    }
  });
}

async function logout() {
  await api('POST', '/auth/logout');
  ['ej_token','ej_role','ej_name','ej_email'].forEach(k => localStorage.removeItem(k));
  const login = document.getElementById('adm-login');
  const dash  = document.getElementById('adm-dash');
  hide(dash); show(login);
}

function applyRole(user) {
  currentRole = user.role || 'admin';
  document.getElementById('adm-user-name')?.textContent && (document.getElementById('adm-user-name').textContent = user.name || 'Admin');
  const roleEl = document.getElementById('adm-user-role');
  if (roleEl) roleEl.textContent = '• ' + (currentRole === 'admin' ? 'Admin' : 'Colaborador');
  document.querySelectorAll('.adm-admin-only').forEach(el => {
    el.style.display = currentRole === 'admin' ? '' : 'none';
  });
}

/* ══ NAV ═══════════════════════════════════════════════════════ */
function initNav() {
  document.querySelectorAll('.adm-nav-item[data-sec]').forEach(item => {
    item.addEventListener('click', () => {
      document.querySelectorAll('.adm-nav-item').forEach(n => n.classList.remove('active'));
      document.querySelectorAll('.adm-section').forEach(s => s.classList.remove('active'));
      item.classList.add('active');
      const sec = document.getElementById('sec-' + item.dataset.sec);
      if (sec) {
        sec.classList.add('active');
        const fn = {
          banners: loadBannersTable, posts: loadPostsTable,
          media: loadMediaGrid,     team: loadTeamPhotos,
          email: loadMailConfig,
          users: loadUsersTable,    content: loadContentSection,
        }[item.dataset.sec];
        if (fn) fn();
      }
    });
  });
}

/* ══ DASHBOARD ════════════════════════════════════════════ */
async function loadDash() {
  loadContentSection();
  let b = EJ.getBanners();
  let p = EJ.getPosts();
  setTxt('dash-banners', b.filter(x=>x.active).length);
  setTxt('dash-posts', p.length);
  setTxt('dash-media', (EJ._read('ej_media')||[]).length);
  const [rb, rp] = await Promise.all([api('GET','/banners/all'), api('GET','/posts')]);
  if (rb.ok) b = rb.data.data || rb.data;
  if (rp.ok) { p = rp.data.data || rp.data; _cachedPosts = p; }
  if (currentRole === 'admin') {
    api('GET','/users').then(ru => { if(ru.ok) setTxt('dash-users', (ru.data.data||ru.data||[]).length); });
  }
  setTxt('dash-banners', b.filter(x=>x.active).length);
  setTxt('dash-posts', p.length);
  const el = document.getElementById('dash-recent');
  if (el) el.innerHTML = p.slice(0,3).map(x => `
    <div style="display:flex;align-items:center;justify-content:space-between;padding:.7rem 0;border-bottom:1px solid var(--border-light)">
      <div>
        <div style="font-weight:600;font-size:.875rem;color:var(--text)">${EJ.esc(x.title)}</div>
        <div style="font-size:.75rem;color:var(--text-mut)">${EJ.esc(x.category)} · ${EJ.fmtDate(x.date||x.created_at)}</div>
      </div>
      <button class="btn btn-sm btn-outline" onclick="openPostModal(${x.id})">Editar</button>
    </div>`).join('') || '<p style="color:var(--text-mut);font-size:.875rem">Nenhum post ainda.</p>';
}


async function saveBanner(e){
  e.preventDefault();const f=e.target,id=f['bid'].value;
  // Monta stats (tags de tecnologia) a partir dos campos do modal
  const stats = [
    {val:(f['b-stat1-val']?.value||'').trim(), lbl:(f['b-stat1-lbl']?.value||'').trim()},
    {val:(f['b-stat2-val']?.value||'').trim(), lbl:(f['b-stat2-lbl']?.value||'').trim()},
    {val:(f['b-stat3-val']?.value||'').trim(), lbl:(f['b-stat3-lbl']?.value||'').trim()},
  ].filter(s=>s.val);
  const d={title:f['b-title'].value.trim(),subtitle:f['b-subtitle'].value.trim(),cta_text:f['b-cta-txt'].value.trim(),cta_link:f['b-cta-lnk'].value.trim(),cta2_text:f['b-cta2-txt'].value.trim(),cta2_link:f['b-cta2-lnk'].value.trim(),active:f['b-active'].checked,layout:f['b-layout']?.value||'background',stats};
  if(!d.title||!d.subtitle){toast('Título e subtítulo obrigatórios.','error');return;}
  const imgFile=f['b-image-file'].files[0];
  if(imgFile){
    // Novo arquivo selecionado — faz upload
    const url=await uploadImage(imgFile,'banner');
    if(url)d.image_url=url;
  } else if(f['b-image-url'].value.trim()){
    // Mantém URL existente (não trocou nem removeu)
    d.image_url=f['b-image-url'].value.trim();
  } else {
    // Sem arquivo e sem URL — imagem foi removida ou não existe
    d.image_url='';
  }
  const res=id?await api('PUT','/banners/'+id,d):await api('POST','/banners',d);
  if(res.ok){
    toast(id?'Banner atualizado!':'Banner criado!');
    // Sincroniza localStorage com o que foi salvo na API
    const saved = res.data || d;
    if(id) EJ.updBanner(id, {...d, id: parseInt(id)||id});
    else if(res.data) EJ.addBanner({...d, id: res.data.id});
  } else {
    // Offline: salva só no localStorage
    id ? EJ.updBanner(id,d) : EJ.addBanner(d);
    toast(id?'Salvo (local).':'Criado (local).');
  }
  document.getElementById('banner-modal').classList.remove('open');loadBannersTable();loadDash();
}
async function delBanner(id){
  if(!confirm('Excluir este banner?'))return;
  const r=await api('DELETE','/banners/'+id);
  // Sempre remove do localStorage também (online ou offline)
  EJ.delBanner(id);
  loadBannersTable();loadDash();toast('Banner excluído.');
}

/* ══ EDITOR WYSIWYG ════════════════════════════════════════ */
let _editorMode = 'visual';

function switchEditorTab(mode) {
  _editorMode = mode;
  const visual  = document.getElementById('post-editor-visual');
  const html    = document.getElementById('post-editor-html');
  const toolbar = document.getElementById('post-editor-toolbar');
  const tabV    = document.getElementById('editor-tab-visual');
  const tabH    = document.getElementById('editor-tab-html');
  if (!visual || !html) return;
  if (mode === 'visual') {
    visual.innerHTML = html.value;
    visual.style.display = 'block';
    toolbar.style.display = 'flex';
    html.style.display = 'none';
    tabV.style.background='var(--primary)';tabV.style.color='#fff';
    tabH.style.background='var(--bg-card)';tabH.style.color='var(--text-mut)';
  } else {
    html.value = visual.innerHTML;
    html.style.display = 'block';
    visual.style.display = 'none';
    toolbar.style.display = 'none';
    tabH.style.background='var(--primary)';tabH.style.color='#fff';
    tabV.style.background='var(--bg-card)';tabV.style.color='var(--text-mut)';
  }
}
function syncEditorToTextarea() {
  const h=document.getElementById('post-editor-html'), v=document.getElementById('post-editor-visual');
  if(h&&v)h.value=v.innerHTML;
}
function getEditorContent() {
  return _editorMode==='visual'
    ? (document.getElementById('post-editor-visual')?.innerHTML||'')
    : (document.getElementById('post-editor-html')?.value||'');
}
function setEditorContent(content) {
  const v=document.getElementById('post-editor-visual'),h=document.getElementById('post-editor-html');
  if(v)v.innerHTML=content||'';
  if(h)h.value=content||'';
  switchEditorTab('visual');
}
function efmt(cmd) {
  const v=document.getElementById('post-editor-visual');
  if(!v)return;v.focus();
  if(cmd==='bold'||cmd==='italic'||cmd==='removeFormat'){
    document.execCommand(cmd,false,null);
  } else if(cmd==='h2'||cmd==='h3'){
    document.execCommand('formatBlock',false,cmd);
  } else if(cmd==='ul'){
    document.execCommand('insertUnorderedList',false,null);
  } else if(cmd==='link'){
    const url=prompt('URL do link:');
    if(url)document.execCommand('createLink',false,url);
  }
  syncEditorToTextarea();
}

/* ══ BANNERS ═════════════════════════════════════════════ */
function initBanners(){
  document.getElementById('btn-new-banner')?.addEventListener('click',()=>openBannerModal());
  document.getElementById('banner-form')?.addEventListener('submit',saveBanner);
  document.getElementById('banner-modal')?.addEventListener('click',e=>{if(e.target.id==='banner-modal')e.target.classList.remove('open');});
}

async function loadBannersTable(){
  const tb=document.getElementById('banners-tbody');if(!tb)return;
  tb.innerHTML='<tr><td colspan="5" style="text-align:center;color:var(--text-mut);padding:2rem">Carregando...</td></tr>';
  const r=await api('GET','/banners/all');
  _cachedBanners = r.ok?(r.data.data||r.data):EJ.getBanners();
  if(!_cachedBanners.length){
    tb.innerHTML='<tr><td colspan="5" style="text-align:center;color:var(--text-mut);padding:2rem">Nenhum banner. Clique em "Novo Banner" para criar.</td></tr>';
    return;
  }
  if (r.ok) {
    try { localStorage.setItem(EJ.K.BANNERS, JSON.stringify(_cachedBanners)); } catch(e){}
  }
  tb.innerHTML=_cachedBanners.map(b=>`<tr>
    <td><div style="font-weight:600;color:var(--text);font-size:.875rem">${EJ.esc(b.title)}</div><div style="font-size:.75rem;color:var(--text-mut)">${EJ.esc((b.subtitle||'').substring(0,40))}...</div></td>
    <td>${b.image_url?`<img src="${b.image_url}" style="width:60px;height:36px;object-fit:cover;border-radius:4px">`:'<span style="color:var(--text-mut);font-size:.78rem">Sem imagem</span>'}</td>
    <td style="font-size:.82rem">${EJ.esc(b.cta_text||'')}</td>
    <td><span class="badge ${b.active?'badge-green':''}" style="${b.active?'':'background:rgba(239,68,68,.1);color:var(--danger)'}">● ${b.active?'Ativo':'Inativo'}</span></td>
    <td><div style="display:flex;gap:.4rem"><button class="btn btn-sm btn-outline" onclick="openBannerModal(${b.id})">Editar</button><button class="btn btn-sm btn-danger" onclick="delBanner(${b.id})">Excluir</button></div></td>
  </tr>`).join('');
}

/* ══ POSTS ════════════════════════════════════════════════ */
function initPosts(){
  document.getElementById('btn-new-post')?.addEventListener('click',()=>openPostModal());
  document.getElementById('post-form')?.addEventListener('submit',savePost);
  document.getElementById('post-modal')?.addEventListener('click',e=>{if(e.target.id==='post-modal')e.target.classList.remove('open');});
}
async function loadPostsTable(){
  const tb=document.getElementById('posts-tbody');if(!tb)return;
  let all=[];const r=await api('GET','/posts');
  all=r.ok?(r.data.data||r.data):EJ.getPosts();
  _cachedPosts = all; // mantém cache em memória para openPostModal
  if(!all.length){tb.innerHTML='<tr><td colspan="5" style="text-align:center;color:var(--text-mut);padding:2rem">Nenhum post.</td></tr>';return;}
  tb.innerHTML=all.map(p=>`<tr>
    <td style="font-weight:600;color:var(--text);font-size:.875rem">${EJ.esc(p.title)}</td>
    <td><span class="badge badge-primary">${EJ.esc(p.category)}</span></td>
    <td>${p.image_url?`<img src="${p.image_url}" style="width:60px;height:36px;object-fit:cover;border-radius:4px">`:'<span style="color:var(--text-mut);font-size:.78rem">Sem capa</span>'}</td>
    <td style="color:var(--text-mut);font-size:.82rem">${EJ.fmtDate(p.date||p.created_at)}</td>
    <td><div style="display:flex;gap:.4rem"><button class="btn btn-sm btn-outline" onclick="openPostModal(${p.id})">Editar</button><button class="btn btn-sm btn-danger" onclick="delPost(${p.id})">Excluir</button></div></td>
  </tr>`).join('');
}
function openPostModal(id=null){
  const m=document.getElementById('post-modal'),f=document.getElementById('post-form');
  f.reset();f['pid'].value='';f['p-author'].value='Emerson Souza';f['p-read'].value='5 min';f['p-color'].value='#6C63FF';
  document.getElementById('post-modal-title').textContent='Novo Post';
  document.getElementById('post-img-preview').classList.remove('show');
  setEditorContent(''); // limpa editor
  if(id){
    const p=_cachedPosts.find(x=>String(x.id)===String(id))||EJ.getPost(id);if(!p){toast('Recarregando posts...','info');loadPostsTable();return;}
    document.getElementById('post-modal-title').textContent='Editar Post';
    f['pid'].value=p.id;f['p-title'].value=p.title;f['p-cat'].value=p.category;
    f['p-excerpt'].value=p.excerpt;
    setEditorContent(p.content||''); // carrega no editor WYSIWYG
    f['p-author'].value=p.author;f['p-read'].value=p.read_time;f['p-color'].value=p.color||'#6C63FF';
    if(p.image_url){f['p-image-url'].value=p.image_url;const pr=document.getElementById('post-img-preview');pr.src=p.image_url;pr.classList.add('show');}
  }
  m.classList.add('open');
}
async function savePost(e){
  e.preventDefault();const f=e.target,id=f['pid'].value;
  const content = getEditorContent().trim(); // lê do editor WYSIWYG ou textarea HTML
  const d={title:f['p-title'].value.trim(),category:f['p-cat'].value,excerpt:f['p-excerpt'].value.trim(),content,author:f['p-author'].value.trim()||'Emerson Souza',read_time:f['p-read'].value.trim()||'5 min',color:f['p-color'].value,date:new Date().toISOString().split('T')[0]};
  if(!d.title||!d.content){toast('Título e conteúdo obrigatórios.','error');return;}
  const imgFile=f['p-image-file'].files[0];
  if(imgFile){
    const url=await uploadImage(imgFile,'post');
    if(url)d.image_url=url;
  } else {
    // Sempre envia image_url (vazio = remove; com valor = mantém/define)
    d.image_url=f['p-image-url'].value.trim();
  }
  const res=id?await api('PUT','/posts/'+id,d):await api('POST','/posts',d);
  if(res.ok){toast(id?'Post atualizado!':'Post publicado!');}
  else{id?EJ.updPost(id,d):EJ.addPost(d);toast(id?'Salvo (local).':'Publicado (local).');}
  document.getElementById('post-modal').classList.remove('open');await loadPostsTable();loadDash();
}
async function delPost(id){
  if(!confirm('Excluir este post permanentemente?'))return;
  const r=await api('DELETE','/posts/'+id);if(!r.ok)EJ.delPost(id);
  await loadPostsTable();loadDash();toast('Post excluído.');
}

/* ══ CONTEÚDO DAS PÁGINAS ═════════════════════════════════ */
function loadContentSection() {
  const container = document.getElementById('content-sections');
  if (!container) return;

  const saved = JSON.parse(localStorage.getItem('ej_content') || '{}');
  currentSettings = {};
  PAGE_SECTIONS.forEach(s => {
    currentSettings[s.key] = (saved[s.key] !== undefined && saved[s.key] !== '') ? saved[s.key] : (s.default || '');
  });

  // Descobre as abas disponíveis em ordem
  const tabOrder = ['Global', 'Home', 'Servicos', 'Blog'];
  const tabs = tabOrder.filter(t => PAGE_SECTIONS.some(s => s.tab === t));

  // Renderiza barra de abas
  let html = '<div style="display:flex;gap:0;margin-bottom:1.5rem;border-radius:var(--radius-sm);overflow:hidden;border:1px solid var(--border)">';
  tabs.forEach((tab, i) => {
    const isActive = i === 0;
    html += '<button type="button" id="content-tab-' + tab.replace(/\s/g,'-') + '" onclick="switchContentTab(\'' + tab + '\')" style="flex:1;padding:.5rem .75rem;background:' + (isActive ? 'var(--primary)' : 'var(--bg-card)') + ';color:' + (isActive ? '#fff' : 'var(--text-mut)') + ';border:none;cursor:pointer;font-size:.82rem;font-weight:' + (isActive ? '700' : '400') + '">' + tab + '</button>';
  });
  html += '</div>';

  // Renderiza painéis de cada aba
  tabs.forEach((tab, tabIdx) => {
    const sections = {};
    PAGE_SECTIONS.filter(s => s.tab === tab).forEach(s => {
      if (!sections[s.section]) sections[s.section] = [];
      sections[s.section].push(s);
    });

    html += '<div id="content-panel-' + tab.replace(/\s/g,'-') + '" style="display:' + (tabIdx === 0 ? 'block' : 'none') + '">';

    // Seções dentro da aba
    for (const [secName, fields] of Object.entries(sections)) {
      html += '<div class="card mb-3">';
      html += '<h4 style="font-size:.875rem;font-weight:700;color:var(--primary-light);margin:0 0 1rem;padding-bottom:.6rem;border-bottom:1px solid var(--border-light)">' + EJ.esc(secName) + '</h4>';
      html += '<div style="display:flex;flex-direction:column;gap:.85rem">';
      for (const s of fields) {
        const val = EJ.esc(currentSettings[s.key] || '');
        html += '<div class="form-group" style="margin:0">';
        html += '<label class="form-label" style="display:flex;align-items:center;gap:.4rem;flex-wrap:wrap">';
        html += '<strong>' + EJ.esc(s.label) + '</strong>';
        if (s.where) html += '<span style="font-size:.68rem;background:rgba(0,217,255,.08);color:var(--secondary);padding:.15rem .5rem;border-radius:3px;font-weight:400">\ud83d\udccd ' + EJ.esc(s.where) + '</span>';
        html += '</label>';
        if (s.key.startsWith('_')) {
          // Campo de nota/info apenas, sem data-key (não salva)
          html += '<div style="background:rgba(0,217,255,.07);border:1px solid rgba(0,217,255,.2);border-radius:6px;padding:.6rem .9rem;font-size:.82rem;color:var(--secondary)">' + EJ.esc(s.default||val) + '</div>';
        } else if (s.type === 'textarea') {
          html += '<textarea class="form-control" rows="' + (s.key==='stack_items'?'8':'3') + '" data-key="' + s.key + '">' + val + '</textarea>';
        } else {
          html += '<input type="text" class="form-control" value="' + val + '" data-key="' + s.key + '">';
        }
        if (s.hint) html += '<p class="form-hint">' + EJ.esc(s.hint) + '</p>';
        html += '</div>';
      }
      html += '</div></div>';
    }

    // Adiciona Cards de Serviços nas abas Home e Serviços
    if (tab === 'Home') {
      html += '<div id="content-cards-section" data-section="both"></div>';
    }
    if (tab === 'Servicos') {
      html += '<div style="background:rgba(0,217,255,.06);border-left:3px solid var(--secondary);border-radius:4px;padding:.6rem .9rem;margin-bottom:1rem;font-size:.82rem;color:var(--secondary)">ℹ️ Cards com "Home + Página de Serviços" aparecem aqui E na Home. Cards de seções específicas aparecem apenas nesta página.</div>';
      // Cards para cada seção
      var sectionLabels = [
        {id:'content-cards-section-serv',  section:'both',        label:'Cards na Home + Serviços', hint:'Aparecem na Home e no topo de Serviços'},
        {id:'content-cards-section-sis',   section:'sistemas',    label:'Cards — Sistemas Web',      hint:'Aparecem na seção Sistemas de Serviços'},
        {id:'content-cards-section-sit',   section:'sites',       label:'Cards — Sites e E-commerce',hint:'Aparecem na seção Sites de Serviços'},
        {id:'content-cards-section-api',   section:'apis',        label:'Cards — APIs e Integrações', hint:'Aparecem na seção APIs de Serviços'},
        {id:'content-cards-section-aut',   section:'automacoes',  label:'Cards — Automações',         hint:'Aparecem na seção Automações de Serviços'},
        {id:'content-cards-section-dev',   section:'devops',      label:'Cards — DevOps',             hint:'Aparecem na seção DevOps de Serviços'},
      ];
      sectionLabels.forEach(function(s) {
        html += '<div style="margin-bottom:1rem"><div style="font-size:.78rem;font-weight:600;color:var(--primary-light);padding:.4rem .75rem;background:rgba(108,99,255,.08);border-radius:4px 4px 0 0;border:1px solid rgba(108,99,255,.2)">' + s.label + ' <span style="font-weight:400;color:var(--text-mut)">— ' + s.hint + '</span></div>';
        html += '<div id="' + s.id + '" data-section="' + s.section + '" style="border:1px solid rgba(108,99,255,.2);border-top:none;border-radius:0 0 4px 4px"></div></div>';
      });
    }

    html += '</div>';
  });

  container.innerHTML = html;

  // Carrega cards na aba Home
  // Carrega cards para todos os containers — lê data-section de cada elemento
  ['content-cards-section','content-cards-section-serv','content-cards-section-sis','content-cards-section-sit','content-cards-section-api','content-cards-section-aut','content-cards-section-dev'].forEach(function(id) {
    var el = document.getElementById(id);
    if (el) loadContentCards(el, el.getAttribute('data-section') || 'both');
  });
}

function switchContentTab(tab) {
  const tabOrder = ['Global', 'Home', 'Servicos', 'Blog'];
  tabOrder.forEach(t => {
    const btn   = document.getElementById('content-tab-' + t.replace(/\s/g,'-'));
    const panel = document.getElementById('content-panel-' + t.replace(/\s/g,'-'));
    if (!btn || !panel) return;
    const isActive = t === tab;
    btn.style.background = isActive ? 'var(--primary)' : 'var(--bg-card)';
    btn.style.color      = isActive ? '#fff' : 'var(--text-mut)';
    btn.style.fontWeight = isActive ? '700' : '400';
    panel.style.display  = isActive ? 'block' : 'none';
  });
}


/* ══ ICON PICKER ═══════════════════════════════════════════ */
// Emojis coloridos
const CARD_ICONS_EMOJI = [
  {e:'🖥',l:'Sistema'},{e:'💻',l:'Software'},{e:'🌐',l:'Web'},{e:'📱',l:'Mobile'},
  {e:'🔌',l:'API'},{e:'🤖',l:'Automação'},{e:'☁',l:'Cloud'},{e:'💬',l:'Chat'},
  {e:'🛡',l:'Segurança'},{e:'🚀',l:'Deploy'},{e:'⚙',l:'DevOps'},{e:'🔗',l:'Integração'},
  {e:'📊',l:'Dados'},{e:'💡',l:'Solução'},{e:'🔧',l:'Manut'},{e:'📈',l:'Analytics'},
  {e:'🏢',l:'Empresa'},{e:'🎯',l:'Objetivo'},{e:'🔐',l:'Login'},{e:'📂',l:'Arquivos'},
  {e:'🧠',l:'IA/ML'},{e:'⚡',l:'Performance'},{e:'🔄',l:'Sync'},{e:'📋',l:'Gestão'},
  {e:'🎨',l:'Design'},{e:'💰',l:'Financeiro'},{e:'🛒',l:'E-commerce'},{e:'📡',l:'REST'},
  {e:'🔍',l:'Busca'},{e:'🌍',l:'Global'},{e:'📧',l:'E-mail'},{e:'📹',l:'Vídeo'},
  {e:'🏆',l:'Resultado'},{e:'✅',l:'Entrega'},{e:'📝',l:'Conteúdo'},{e:'🔔',l:'Alertas'},
];

// Ícones SVG sóbrios (sprite icons.js — preto/branco via CSS)
const CARD_ICONS_SVG = [
  {id:'i-systems',l:'Sistemas'},{id:'i-web',l:'Web/Sites'},{id:'i-mobile',l:'Mobile'},{id:'i-api',l:'API'},
  {id:'i-automation',l:'Automação'},{id:'i-chatbot',l:'Chatbot/IA'},{id:'i-devops',l:'DevOps'},{id:'i-consulting',l:'Consultoria'},
  {id:'i-check',l:'Entrega/OK'},{id:'i-post',l:'Conteúdo'},{id:'i-team',l:'Equipe'},{id:'i-user',l:'Usuário'},
  {id:'i-upload',l:'Upload'},{id:'i-palette',l:'Design'},{id:'i-arrow',l:'Seta'},{id:'i-email',l:'E-mail'},
  {id:'i-linkedin',l:'LinkedIn'},{id:'i-db',l:'Banco dados'},
];

let _iconTab = 'emoji';

function toggleIconPicker() {
  const panel = document.getElementById('icon-picker-panel');
  if (!panel) return;
  if (panel.style.display === 'none') {
    const grid = document.getElementById('icon-picker-grid');
    if (!document.getElementById('icon-picker-tabs')) {
      const bar = document.createElement('div');
      bar.id = 'icon-picker-tabs';
      bar.style = 'display:flex;gap:4px;margin-bottom:8px';
      const btnE = document.createElement('button');
      btnE.id='icon-tab-emoji'; btnE.type='button'; btnE.textContent='😀 Emojis';
      btnE.style='flex:1;padding:4px 8px;border:none;border-radius:4px;cursor:pointer;font-size:.78rem;background:var(--primary);color:#fff';
      btnE.onclick=()=>switchIconTab('emoji');
      const btnS = document.createElement('button');
      btnS.id='icon-tab-svg'; btnS.type='button'; btnS.textContent='◻ SVG sóbrios';
      btnS.style='flex:1;padding:4px 8px;border:none;border-radius:4px;cursor:pointer;font-size:.78rem;background:var(--bg-card);color:var(--text-mut)';
      btnS.onclick=()=>switchIconTab('svg');
      bar.append(btnE, btnS);
      if (grid) panel.insertBefore(bar, grid);
    }
    _renderIconPicker();
    panel.style.display = 'block';
  } else {
    panel.style.display = 'none';
  }
}

function switchIconTab(tab) {
  _iconTab = tab;
  const tabE = document.getElementById('icon-tab-emoji');
  const tabS = document.getElementById('icon-tab-svg');
  if(tabE){tabE.style.background=tab==='emoji'?'var(--primary)':'var(--bg-card)';tabE.style.color=tab==='emoji'?'#fff':'var(--text-mut)';}
  if(tabS){tabS.style.background=tab==='svg'?'var(--primary)':'var(--bg-card)';tabS.style.color=tab==='svg'?'#fff':'var(--text-mut)';}
  _renderIconPicker();
}

function _renderIconPicker() {
  const grid = document.getElementById('icon-picker-grid');
  if (!grid) return;
  if (_iconTab === 'emoji') {
    grid.innerHTML = CARD_ICONS_EMOJI.map(ic =>
      '<button type="button" title="'+ic.l+'" onclick="selectCardIcon(this.dataset.v)" data-v="'+ic.e+'" style="width:40px;height:40px;font-size:1.3rem;background:var(--bg-card);border:1px solid var(--border);border-radius:6px;cursor:pointer;display:flex;align-items:center;justify-content:center">'+ic.e+'</button>'
    ).join('');
  } else {
    grid.innerHTML = CARD_ICONS_SVG.map(ic =>
      '<button type="button" title="'+ic.l+'" onclick="selectCardIcon(this.dataset.v)" data-v="[svg:'+ic.id+']" style="width:40px;height:40px;background:var(--bg-card);border:1px solid var(--border);border-radius:6px;cursor:pointer;display:flex;align-items:center;justify-content:center;padding:8px"><svg style="width:20px;height:20px;fill:currentColor;color:var(--text)"><use href="#'+ic.id+'"/></svg></button>'
    ).join('');
  }
}

function selectCardIcon(val) {
  const input = document.getElementById('c-icon-input') || document.querySelector('[name="c-icon"]');
  if (input) input.value = val;
  const panel = document.getElementById('icon-picker-panel');
  if (panel) panel.style.display = 'none';
}

async function loadContentCards(container, filterSection) {
  if (!container) container = document.getElementById('content-cards-section');
  if (!container) return;

  container.innerHTML = '<div class="card mb-3"><p style="color:var(--text-mut);text-align:center">Carregando cards...</p></div>';

  const r = await api('GET', '/service-cards/all');
  // Fallback: usa defaults locais se API não responder
  let allCards = r.ok ? (r.data.data || r.data || []) : [];
  let cards = filterSection ? allCards.filter(c => c.section === filterSection) : allCards;
  if (!cards.length && EJ.DEFAULTS) {
    // Mostra defaults do data.js como preview (sem ações de delete já que não estão no banco)
    cards = (EJ.DEFAULTS.banners || []).length > 0 ? [] : []; // sem banners defaults para cards
  }

  let html = '<div class="card mb-3">';
  html += '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1.5rem">';
  html += '<div><h3 style="font-size:1rem;color:var(--primary-light);margin:0">Cards de Serviços</h3>';
  html += '<p style="font-size:.78rem;color:var(--text-mut);margin:.2rem 0 0">Aparecem na Home e em servicos.html</p></div>';
  html += '<button class="btn btn-primary btn-sm" onclick="openCardModal()">+ Adicionar Card</button>';
  html += '</div>';

  if (!cards.length) {
    html += '<p style="color:var(--text-mut);text-align:center;padding:1.5rem">Nenhum card. Clique em Adicionar Card.</p>';
  } else {
    cards.forEach((cd, i) => {
      // tags pode vir como array ou como string JSON do banco
      const rawTags = cd.tags;
      let tags = '';
      if (Array.isArray(rawTags)) { tags = rawTags.join(', '); }
      else if (typeof rawTags === 'string' && rawTags.trim()) {
        try { tags = JSON.parse(rawTags).join(', '); } catch(e) { tags = rawTags; }
      }
      html += '<div style="background:var(--surface2);border:1px solid var(--border-light);border-radius:var(--radius);padding:1.1rem;margin-bottom:.85rem">';
      html += '<div style="display:flex;align-items:flex-start;justify-content:space-between;gap:1rem">';
      html += '<div style="flex:1">';
      html += '<div style="display:flex;align-items:center;gap:.5rem;margin-bottom:.5rem">';
      html += '<span style="font-size:1.5rem">' + EJ.esc(cd.icon||'?') + '</span>';
      html += '<strong style="color:var(--text)">' + EJ.esc(cd.title) + '</strong>';
      html += '<span style="font-size:.68rem;background:' + (cd.active ? 'rgba(16,185,129,.1)' : 'rgba(239,68,68,.1)') + ';color:' + (cd.active ? 'var(--success)' : 'var(--danger)') + ';padding:.1rem .45rem;border-radius:3px">' + (cd.active ? 'Ativo' : 'Inativo') + '</span>';
      html += '</div>';
      html += '<p style="font-size:.835rem;color:var(--text-mut);margin:0 0 .4rem">' + EJ.esc(cd.description) + '</p>';
      if (tags) html += '<p style="font-size:.72rem;color:var(--primary-light);margin:0">Tags: ' + EJ.esc(tags) + '</p>';
      html += '</div>';
      html += '<div style="display:flex;gap:.4rem;flex-shrink:0">';
      html += '<button class="btn btn-sm btn-outline" onclick="openCardModal(' + cd.id + ')">Editar</button>';
      html += '<button class="btn btn-sm btn-danger" onclick="delCard(' + cd.id + ')">Excluir</button>';
      html += '</div></div></div>';
    });
  }
  html += '</div>';
  container.innerHTML = html;
}

async function saveAllContent() {
  const values = {};
  document.querySelectorAll('#content-sections [data-key]').forEach(el => {
    values[el.dataset.key] = el.value.trim();
  });
  const res = await api('PUT', '/settings', { group: 'content', values });
  // SEMPRE atualiza localStorage (online e offline) para site refletir imediatamente
  const prev = JSON.parse(localStorage.getItem('ej_content') || '{}');
  localStorage.setItem('ej_content', JSON.stringify({ ...prev, ...values }));
  if (res.ok) {
    toast('Conteúdo salvo! Atualize o site (Ctrl+Shift+R) para ver as mudanças.');
  } else {
    toast('Salvo localmente — altere quando o Docker estiver rodando para persistir no banco.');
  }
}

/* ══ EQUIPE ═══════════════════════════════════════════════ */
async function loadTeamPhotos(){
  // Carrega dados da API e preenche os campos do formulário
  const r = await api('GET', '/team');
  const members = r.ok ? (r.data || []) : [];
  const localTeam = JSON.parse(localStorage.getItem('ej_team') || '{}');

  members.forEach(m => {
    const k = m.key;
    const prev = document.getElementById('prev-'+k);
    if (prev) {
      // Tenta DB primeiro, depois localStorage (legado)
      const photoSrc = m.photo_url || localTeam[k]?.photo || null;
      if (photoSrc) {
        prev.innerHTML = '<img src="'+photoSrc+'" alt="'+k+'" style="width:100%;height:100%;object-fit:cover;border-radius:50%">';
        prev._localSrc = photoSrc; // guarda para salvar depois
      }
    }
    const nameEl = document.getElementById('name-'+k); if (nameEl && m.name) nameEl.value = m.name;
    const roleEl = document.getElementById('role-'+k); if (roleEl && m.role) roleEl.value = m.role;
    const bioEl  = document.getElementById('bio-'+k);  if (bioEl  && m.bio)  bioEl.value  = m.bio;
    const liEl   = document.getElementById('linkedin-'+k); if (liEl && m.linkedin) liEl.value = m.linkedin;
    const tagsEl = document.getElementById('tags-'+k);
    if (tagsEl && m.tags) tagsEl.value = Array.isArray(m.tags) ? m.tags.join(', ') : m.tags;
  });
}
function previewTeamPhoto(input,previewId){
  const f=input.files[0];if(!f)return;
  const p=document.getElementById(previewId);
  p.innerHTML='<img src="'+URL.createObjectURL(f)+'" alt="preview" style="width:100%;height:100%;object-fit:cover;border-radius:50%">';p._file=f;
}
async function saveTeamMember(key){
  const tagsRaw = (document.getElementById('tags-'+key)?.value||'').trim();
  const tagsArr = tagsRaw ? tagsRaw.split(',').map(t=>t.trim()).filter(Boolean) : [];
  const payload = {
    name:     document.getElementById('name-'+key)?.value || '',
    role:     document.getElementById('role-'+key)?.value || '',
    bio:      document.getElementById('bio-'+key)?.value  || '',
    linkedin: document.getElementById('linkedin-'+key)?.value || '',
    tags:     tagsArr,
  };
  // Faz upload da foto
  const p = document.getElementById('prev-'+key);
  if (p?._file) {
    // Novo arquivo selecionado pelo input
    const url = await uploadImage(p._file, 'team_'+key);
    if (url) { payload.photo_url = url; p._file = null; }
  } else if (p?._localSrc) {
    const src = p._localSrc;
    if (src.startsWith('http')) {
      // URL real — salva direto
      payload.photo_url = src;
    } else if (src.startsWith('data:')) {
      // Base64 — converte para arquivo e faz upload
      try {
        const res = await fetch(src);
        const blob = await res.blob();
        const file = new File([blob], 'team_'+key+'.jpg', {type: blob.type || 'image/jpeg'});
        const url = await uploadImage(file, 'team_'+key);
        if (url) { payload.photo_url = url; }
      } catch(e) { console.warn('Erro ao converter foto:', e); }
    }
  }
  const r = await api('PUT', '/team/'+key, payload);
  if (!r.ok) { toast('Erro ao salvar '+key, 'error'); return false; }
  return true;
}
async function saveAllTeam(){
  const btn = document.querySelector('[onclick="saveAllTeam()"]');
  if (btn) { btn.disabled=true; btn.textContent='Salvando...'; }
  const ok1 = await saveTeamMember('emerson');
  const ok2 = await saveTeamMember('julio');
  if (btn) { btn.disabled=false; btn.textContent='Salvar Equipe'; }
  if (ok1 && ok2) toast('Equipe salva com sucesso!');
}

/* ══ MÍDIA ════════════════════════════════════════════════ */
async function handleGlobalUpload(input){
  for(const f of Array.from(input.files)){
    const form = new FormData();
    form.append('image', f);
    form.append('context', 'general');
    const res = await api('POST', '/media/upload', form, true);
    if (res.ok) {
      if (res.data.duplicate) {
        toast('Imagem já existe na galeria: '+res.data.name, 'warning');
      } else {
        saveMediaItem({id:res.data.id, url:res.data.url, name:res.data.name, size:f.size});
      }
    }
  }
  loadMediaGrid();
}
function saveMediaItem(item){
  const list=EJ._read('ej_media');
  // Evita duplicata: verifica se já existe item com mesmo URL
  if(list.some(m=>m.url===item.url))return;
  item.id = String(Date.now());
  list.unshift(item);
  // Limita a 100 itens (evita localStorage cheio com base64 grandes)
  const trimmed = list.slice(0,100);
  localStorage.setItem('ej_media',JSON.stringify(trimmed));
  setTxt('dash-media',trimmed.length);
}
async function loadMediaGrid(){
  const grid=document.getElementById('media-grid');if(!grid)return;
  grid.innerHTML='<div style="grid-column:1/-1;text-align:center;padding:1.5rem;color:var(--text-mut)">Carregando imagens...</div>';

  const r = await api('GET', '/media');
  let list = [];
  if (r.ok && Array.isArray(r.data)) {
    list = r.data;
    // Sincroniza localStorage (formato simplificado)
    localStorage.setItem('ej_media', JSON.stringify(list.map(m => ({id:String(m.id),url:m.url,name:m.name,size:m.size}))));
  } else {
    list = EJ._read('ej_media').map(m => ({...m, in_use:false, used_in:[]}));
  }

  setTxt('dash-media', list.length);

  if(!list.length){
    grid.innerHTML='<div style="grid-column:1/-1;text-align:center;padding:2rem;color:var(--text-mut)">Nenhuma imagem ainda.</div>';
    return;
  }

  // Contador de resumo
  var totalInUse = list.filter(m => m.in_use).length;
  var totalUnused = list.length - totalInUse;
  var summaryHtml = '<div style="grid-column:1/-1;display:flex;gap:1rem;align-items:center;margin-bottom:.5rem;font-size:.8rem">'
    + '<span style="color:var(--success)">&#10003; ' + totalInUse + ' em uso</span>'
    + '<span style="color:var(--text-mut)">&#9675; ' + totalUnused + ' sem uso</span>'
    + '<span style="color:var(--text-mut);margin-left:auto">' + list.length + ' imagens no total</span>'
    + '</div>';

  grid.innerHTML = summaryHtml + list.map(function(m){
    var id   = String(m.id || m.url);
    var name = (m.name || m.url || '').split('/').pop();
    var ext  = name.split('.').pop().toUpperCase();
    var sizeStr = m.size ? (m.size > 1048576 ? (m.size/1048576).toFixed(1)+'MB' : Math.round(m.size/1024)+'KB') : '?';
    var dims = (m.width && m.height) ? m.width + 'x' + m.height : '';
    var inUse = m.in_use;
    var usedIn = Array.isArray(m.used_in) ? m.used_in : [];
    var altTxt = m.alt_text || '';

    // Badge de uso
    var useBadge = inUse
      ? '<span title="' + EJ.esc(usedIn.map(function(u){return u.label;}).join(' | ')) + '" style="position:absolute;top:.3rem;left:.3rem;background:rgba(16,185,129,.85);color:#fff;font-size:.62rem;padding:.15rem .4rem;border-radius:3px;cursor:help">&#10003; Em uso</span>'
      : '<span style="position:absolute;top:.3rem;left:.3rem;background:rgba(239,68,68,.7);color:#fff;font-size:.62rem;padding:.15rem .4rem;border-radius:3px">Sem uso</span>';

    // Tooltip de uso detalhado
    var usageDetail = inUse
      ? '<div style="font-size:.68rem;color:var(--success);padding:.2rem .5rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis" title="'+EJ.esc(usedIn.map(function(u){return u.label;}).join(' | '))+'">'
        + usedIn.slice(0,2).map(function(u){return u.label;}).join(', ')
        + (usedIn.length>2 ? ' +' + (usedIn.length-2) : '')
        + '</div>'
      : '<div style="font-size:.68rem;color:var(--text-mut);padding:.2rem .5rem">Não usada no site</div>';

    var html = '<div class="media-item" style="position:relative;border:1px solid '+(inUse?'rgba(16,185,129,.3)':'rgba(239,68,68,.15)')+';">';
    html += '<div style="position:relative">';
    html += '<img src="'+m.url+'" loading="lazy" onerror="this.style.opacity=.3" style="width:100%;height:110px;object-fit:cover">';
    html += useBadge;
    html += '<button data-del-id="'+id+'" title="Excluir" style="position:absolute;top:.3rem;right:.3rem;width:22px;height:22px;background:var(--danger);color:#fff;border:none;border-radius:50%;cursor:pointer;font-size:.8rem;line-height:1">&#10005;</button>';
    // Botão editar alt
    html += '<button data-edit-id="'+id+'" data-alt="'+EJ.esc(altTxt)+'" title="Editar alt text" style="position:absolute;bottom:.3rem;right:.3rem;width:22px;height:22px;background:rgba(0,0,0,.6);color:#fff;border:none;border-radius:50%;cursor:pointer;font-size:.75rem;line-height:1">&#9998;</button>';
    html += '</div>';
    // Metadados
    html += '<div style="padding:.35rem .5rem">';
    html += '<div style="font-size:.7rem;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-weight:600" title="'+EJ.esc(name)+'">'+EJ.esc(name.substring(0,22))+'</div>';
    html += '<div style="display:flex;gap:.4rem;align-items:center;margin-top:.2rem">'
          + '<span style="font-size:.62rem;background:var(--surface2);padding:.1rem .3rem;border-radius:3px;color:var(--text-mut)">'+ext+'</span>'
          + '<span style="font-size:.62rem;color:var(--text-mut)">'+sizeStr+'</span>'
          + (dims ? '<span style="font-size:.62rem;color:var(--text-mut)">'+dims+'</span>' : '')
          + '</div>';
    if (altTxt) html += '<div style="font-size:.62rem;color:var(--text-mut);margin-top:.2rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis" title="Alt: '+EJ.esc(altTxt)+'">Alt: '+EJ.esc(altTxt.substring(0,25))+'</div>';
    html += usageDetail;
    html += '</div>';
    html += '</div>';
    return html;
  }).join('');

  // Event delegation
  grid.onclick = function(e) {
    var delBtn = e.target.closest('[data-del-id]');
    if (delBtn) { delMedia(delBtn.getAttribute('data-del-id')); return; }
    var editBtn = e.target.closest('[data-edit-id]');
    if (editBtn) { editMediaAlt(editBtn.getAttribute('data-edit-id'), editBtn.getAttribute('data-alt')); }
  };
}

async function editMediaAlt(id, currentAlt) {
  var newAlt = prompt('Alt text da imagem (para acessibilidade e SEO):', currentAlt || '');
  if (newAlt === null) return; // cancelou
  var r = await api('PUT', '/media/' + id, { alt_text: newAlt });
  if (r.ok) { toast('Alt text salvo!'); loadMediaGrid(); }
  else toast('Erro ao salvar.', 'error');
}
async function delMedia(id){
  if(!confirm('Excluir esta imagem? Ela será removida da galeria, dos banners e dos posts que a usarem.'))return;

  const list = EJ._read('ej_media');
  const item = list.find(m=>String(m.id)===String(id));
  const deletedUrl = item ? item.url : null;

  // 1. Remove da galeria (localStorage)
  const l = list.filter(m=>String(m.id)!==String(id));
  localStorage.setItem('ej_media', JSON.stringify(l));

  if (deletedUrl) {
    // 2. Cascade: remove de TODOS os banners que usam esta URL
    const banners = EJ.getBanners();
    const updatedBanners = banners.map(b => b.image_url === deletedUrl ? {...b, image_url: ''} : b);
    localStorage.setItem(EJ.K.BANNERS, JSON.stringify(updatedBanners));
    _cachedBanners = updatedBanners;
    for (const b of banners) {
      if (b.image_url === deletedUrl) {
        await api('PUT', '/banners/' + b.id, {image_url: ''});
      }
    }

    // 3. Cascade: remove de TODOS os posts que usam esta URL
    const posts = _cachedPosts.length ? _cachedPosts : EJ.getPosts();
    const updatedPosts = posts.map(p => p.image_url === deletedUrl ? {...p, image_url: ''} : p);
    localStorage.setItem(EJ.K.POSTS, JSON.stringify(updatedPosts));
    _cachedPosts = updatedPosts;
    for (const p of posts) {
      if (p.image_url === deletedUrl) {
        await api('PUT', '/posts/' + p.id, {image_url: ''});
      }
    }
  }

  // Deleta da API (DELETE /media/{id})
  await api('DELETE', '/media/' + id);

  await loadMediaGrid();
  setTxt('dash-media', l.length);

  // Recarrega tabelas se as abas estiverem ativas
  const secBanners = document.getElementById('sec-banners');
  if (secBanners && secBanners.classList.contains('active')) loadBannersTable();
  const secPosts = document.getElementById('sec-posts');
  if (secPosts && secPosts.classList.contains('active')) loadPostsTable();

  toast('Imagem excluída — banners e posts que a usavam foram atualizados.');
}

/* ══ USUÁRIOS (admin only) ════════════════════════════════ */
function initUsers(){
  document.getElementById('btn-new-user')?.addEventListener('click',()=>openUserModal());
  document.getElementById('user-form')?.addEventListener('submit',saveUser);
  document.getElementById('user-modal')?.addEventListener('click',e=>{if(e.target.id==='user-modal')e.target.classList.remove('open');});
  document.getElementById('u-pw')?.addEventListener('input',e=>checkPasswordStrength(e.target.value));
}
async function loadUsersTable(){
  const tb=document.getElementById('users-tbody');if(!tb)return;
  tb.innerHTML='<tr><td colspan="5" style="text-align:center;color:var(--text-mut);padding:1.5rem">Carregando usuários...</td></tr>';
  const r=await api('GET','/users');
  if(!r.ok){
    // Mostra o usuário logado mesmo sem Docker
    const myName  = localStorage.getItem('ej_name')  || 'Administrador';
    const myEmail = localStorage.getItem('ej_email') || 'admin@ejtecnologia.com.br';
    const myRole  = localStorage.getItem('ej_role')  || 'admin';
    tb.innerHTML =
      '<tr style="background:rgba(108,99,255,.06)">'
      +'<td style="font-weight:600;color:var(--text)">' + EJ.esc(myName)
        + ' <span style="font-size:.65rem;background:rgba(108,99,255,.15);color:var(--primary-light);padding:.1rem .5rem;border-radius:3px">Você</span></td>'
      +'<td style="color:var(--text-sec)">' + EJ.esc(myEmail) + '</td>'
      +'<td><span class="badge badge-primary">' + EJ.esc(myRole) + '</span></td>'
      +'<td style="color:var(--text-mut);font-size:.82rem">—</td>'
      +'<td><button class="btn btn-sm btn-outline" onclick="openUserModal(-1)">Editar minha conta</button></td>'
      +'</tr>'
      +'<tr><td colspan="5" style="text-align:center;padding:1.25rem">'
      +'<div style="font-size:.82rem;color:var(--text-mut)">Inicie o Docker para ver e gerenciar outros usuários<br>'
      +'<code style="color:var(--primary-light)">docker compose up -d</code></div>'
      +'<button class="btn btn-sm btn-outline" style="margin-top:.75rem" onclick="loadUsersTable()">Tentar novamente</button>'
      +'</td></tr>';
    return;
  }
  const all=r.data.data||r.data||[];
  if(!all.length){tb.innerHTML='<tr><td colspan="5" style="text-align:center;color:var(--text-mut);padding:2rem">Nenhum usuário cadastrado ainda.</td></tr>';return;}
  // Pega o email do usuario logado para destacar
  const myEmail = localStorage.getItem('ej_email') || '';
  tb.innerHTML=all.map(u=>{
    const isMe = u.email === myEmail;
    const rowStyle = isMe ? 'background:rgba(108,99,255,.06);' : '';
    const meBadge = isMe ? '<span style="font-size:.65rem;background:rgba(108,99,255,.15);color:var(--primary-light);padding:.1rem .5rem;border-radius:3px;margin-left:.4rem">Você</span>' : '';
    return `<tr style="${rowStyle}">
      <td style="font-weight:600;color:var(--text)">${EJ.esc(u.name)}${meBadge}</td>
      <td style="color:var(--text-sec)">${EJ.esc(u.email)}</td>
      <td><span class="badge ${u.role==='admin'?'badge-primary':'badge-cyan'}">${u.role}</span></td>
      <td style="color:var(--text-mut);font-size:.82rem">${EJ.fmtDate(u.created_at)}</td>
      <td><div style="display:flex;gap:.4rem">
        <button class="btn btn-sm btn-outline" onclick="openUserModal(${u.id})">Editar</button>
        ${!isMe ? `<button class="btn btn-sm btn-danger" onclick="delUser(${u.id})">Excluir</button>` : '<span style="font-size:.75rem;color:var(--text-mut)">conta atual</span>'}
      </div></td>
    </tr>`;
  }).join('');
}
function openUserModal(id=null){
  const m=document.getElementById('user-modal'),f=document.getElementById('user-form');
  if(!m||!f)return;
  f.reset();f['uid'].value='';
  document.getElementById('user-modal-title').textContent='Novo Usuário';
  document.getElementById('pw-optional-lbl').style.display='none';
  document.getElementById('user-form-error').style.display='none';
  const strengthEl = document.getElementById('pw-strength'); if(strengthEl) strengthEl.textContent='';

  if(id && id !== null){
    // Editar usuário
    document.getElementById('user-modal-title').textContent = id === -1 ? 'Editar Minha Conta' : 'Editar Usuário';
    document.getElementById('pw-optional-lbl').style.display='';

    if(id === -1){
      // Preenche com dados do localStorage (minha conta)
      f['uid'].value = -1;
      f['u-name'].value  = localStorage.getItem('ej_name')  || '';
      f['u-email'].value = localStorage.getItem('ej_email') || '';
      f['u-role'].value  = localStorage.getItem('ej_role')  || 'admin';
    } else {
      f['uid'].value = id;
      // Busca dados do usuário na API
      api('GET','/users').then(r=>{
        const users = r.data.data||r.data||[];
        const u = users.find(x=>x.id==id);
        if(u){ f['u-name'].value=u.name; f['u-email'].value=u.email; f['u-role'].value=u.role; }
      });
    }
  }
  m.classList.add('open');
}
async function saveUser(e){
  e.preventDefault();
  const f=e.target,id=f['uid'].value;
  const errEl=document.getElementById('user-form-error');
  errEl.style.display='none';

  // Valida senha se preenchida (ou obrigatória na criação)
  const pw=f['u-pw'].value;
  if(!id||pw){
    const pwErr=validatePassword(pw);
    if(pwErr){errEl.textContent=pwErr;errEl.style.display='block';return;}
    if(pw!==f['u-pw-confirm'].value){errEl.textContent='As senhas não coincidem.';errEl.style.display='block';return;}
  }

  const d={name:f['u-name'].value.trim(),email:f['u-email'].value.trim(),role:f['u-role'].value};
  if(pw){d.password=pw;d.password_confirmation=f['u-pw-confirm'].value;}

  let res;
  if(!id){
    // Criar novo usuário
    res = await api('POST','/users',d);
  } else if(String(id)==='-1'){
    // Editar minha conta — busca meu ID real da lista de usuários
    const myEmail = localStorage.getItem('ej_email')||'';
    const usersR = await api('GET','/users');
    const me = (usersR.data.data||usersR.data||[]).find(u=>u.email===myEmail);
    if(me){ res = await api('PUT','/users/'+me.id, d); }
    else  { res = await api('PUT','/users/profile', d); } // fallback
  } else {
    res = await api('PUT','/users/'+id,d);
  }

  if(res && res.ok){
    // Atualiza localStorage se editou a própria conta
    const myEmail = localStorage.getItem('ej_email')||'';
    if(!id || String(id)==='-1' || d.email===myEmail){
      if(d.name)  localStorage.setItem('ej_name',  d.name);
      if(d.email) localStorage.setItem('ej_email', d.email);
    }
    toast(id?'Usuário atualizado!':'Usuário criado!');
    document.getElementById('user-modal').classList.remove('open');
    loadUsersTable();
    loadDash();
  } else {
    errEl.textContent=(res?.data?.message)||'Erro ao salvar usuário.';
    errEl.style.display='block';
  }
}
async function delUser(id){
  if(!confirm('Excluir este usuário?'))return;
  const r=await api('DELETE','/users/'+id);
  if(r.ok){toast('Usuário excluído.');loadUsersTable();loadDash();}
  else toast(r.data?.message||'Erro ao excluir.','error');
}

/* ══ VALIDAÇÃO DE SENHA ═══════════════════════════════════ */
function validatePassword(pw) {
  if (!pw || pw.length < 8) return 'A senha deve ter no mínimo 8 caracteres.';
  if (!/[A-Z]/.test(pw))    return 'A senha deve conter ao menos uma letra MAIÚSCULA.';
  if (!/[a-z]/.test(pw))    return 'A senha deve conter ao menos uma letra minúscula.';
  if (!/[!@#$%^&*()\-_=+[\]{};:\'",.<>?/\\|`~]/.test(pw)) return 'A senha deve conter ao menos um caractere especial (!@#$%...).';
  return null; // válida
}

function checkPasswordStrength(pw) {
  const el = document.getElementById('pw-strength');
  if (!pw) { el.textContent = ''; return; }
  const score = [pw.length>=8, /[A-Z]/.test(pw), /[a-z]/.test(pw), /[!@#$%^&*]/.test(pw), pw.length>=12].filter(Boolean).length;
  const levels = [
    {label:'Muito fraca', color:'var(--danger)'},
    {label:'Fraca',       color:'var(--danger)'},
    {label:'Razoável',    color:'var(--warning)'},
    {label:'Boa',         color:'var(--primary-light)'},
    {label:'Forte',       color:'var(--success)'},
  ];
  const l = levels[Math.min(score, 4)];
  el.innerHTML = `<span style="color:${l.color}">Força: ${l.label}</span>`;
}

function initPasswordStrength() {
  document.getElementById('u-pw')?.addEventListener('input', e => checkPasswordStrength(e.target.value));
}

/* ══ CORES ════════════════════════════════════════════════ */
const COLOR_MAP = {
  '--primary':       'c-primary',
  '--primary-light': 'c-primary-light',
  '--secondary':     'c-secondary',
  '--accent':        'c-accent',
  '--success':       'c-success',
  '--warning':       'c-warning',
  '--bg':            'c-bg',
  '--surface':       'c-surface',
  '--surface2':      'c-surface2',
  '--surface3':      'c-surface3',
  '--text':          'c-text',
  '--text-sec':      'c-text-sec',
  '--text-mut':      'c-text-mut',
  '--wpp':           'c-wpp',
};
const COLOR_DEFAULTS = {
  '--primary':'#6C63FF','--primary-light':'#8B83FF','--secondary':'#00D9FF',
  '--accent':'#FF6B6B','--success':'#10B981','--warning':'#F59E0B',
  '--bg':'#0F0F1A','--surface':'#1A1A2E','--surface2':'#16213E','--surface3':'#0D1117',
  '--text':'#F0F0FF','--text-sec':'#B0B8D0','--text-mut':'#707890',
  '--wpp':'#25D366',
};

function applyColors(){
  // Lê valores dos inputs
  const saved = {};
  Object.entries(COLOR_MAP).forEach(([v, id]) => {
    const el = document.getElementById(id);
    if (el) saved[v] = el.value;
  });
  const r = document.getElementById('c-radius');
  const rLg = document.getElementById('c-radius-lg');
  if (r)   saved['--radius']    = r.value + 'px';
  if (rLg) saved['--radius-lg'] = rLg.value + 'px';

  // Aplica APENAS no preview (não no admin inteiro)
  const preview = document.getElementById('color-preview-box');
  if (preview) {
    Object.entries(saved).forEach(([v, val]) => preview.style.setProperty(v, val));
  }

  // Salva no banco e localStorage — o SITE carregará ao recarregar
  localStorage.setItem('ej_colors', JSON.stringify(saved));
  api('PUT', '/settings', {group:'colors', values:saved}).then(() => {
    toast('Cores salvas! Recarregue o site para ver as mudanças.');
  });
}

function resetColors(){
  // Restaura inputs para os valores padrão
  Object.entries(COLOR_DEFAULTS).forEach(([v, val]) => {
    const id = COLOR_MAP[v]; if (id) { const el = document.getElementById(id); if(el) el.value = val; }
  });
  const r = document.getElementById('c-radius');
  const rLg = document.getElementById('c-radius-lg');
  if (r)   { r.value = 12;   document.getElementById('c-radius-val').textContent='12px'; }
  if (rLg) { rLg.value = 18; document.getElementById('c-radius-lg-val').textContent='18px'; }

  // Restaura preview
  const preview = document.getElementById('color-preview-box');
  if (preview) {
    Object.entries(COLOR_DEFAULTS).forEach(([v, val]) => preview.style.setProperty(v, val));
    preview.style.setProperty('--radius', '12px');
    preview.style.setProperty('--radius-lg', '18px');
  }

  const vals = {...COLOR_DEFAULTS,'--radius':'12px','--radius-lg':'18px'};
  localStorage.removeItem('ej_colors');
  api('PUT', '/settings', {group:'colors', values:vals}).then(() => {
    toast('Cores padrão restauradas no site!');
  });
}

async function loadSavedColors(){
  // Tenta API primeiro, localStorage como fallback
  const r = await api('GET', '/settings');
  const apiVals = r.ok ? (r.data || {}) : {};
  const local = JSON.parse(localStorage.getItem('ej_colors') || '{}');
  const s = Object.keys(apiVals).some(k => k.startsWith('--')) ? apiVals : local;

  // Só preenche os inputs — NÃO altera o visual do admin
  Object.entries(COLOR_MAP).forEach(([v, id]) => {
    const val = s[v]; if (!val) return;
    const el = document.getElementById(id); if(el) el.value = val;
  });
  if (s['--radius']) {
    const px = parseInt(s['--radius']);
    const el = document.getElementById('c-radius');
    if(el) { el.value = px; const lbl = document.getElementById('c-radius-val'); if(lbl) lbl.textContent=px+'px'; }
  }
  if (s['--radius-lg']) {
    const px = parseInt(s['--radius-lg']);
    const el = document.getElementById('c-radius-lg');
    if(el) { el.value = px; const lbl = document.getElementById('c-radius-lg-val'); if(lbl) lbl.textContent=px+'px'; }
  }
  // Atualiza preview com as cores salvas
  const preview = document.getElementById('color-preview-box');
  if (preview) {
    Object.entries(s).forEach(([v, val]) => preview.style.setProperty(v, val));
  }
}

/* ══ UPLOAD IMAGEM ════════════════════════════════════════ */
async function uploadImage(file, context='general') {
  const form = new FormData();
  form.append('image', file); form.append('context', context);
  const res = await api('POST', '/media/upload', form, true);
  if (res.ok && res.data.url) {
    saveMediaItem({ url: res.data.url, name: file.name, size: file.size });
    return res.data.url;
  }
  // Offline: base64 persiste — blob URL morre quando fecha o modal
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.onload = e => {
      const url = e.target.result;
      saveMediaItem({ url, name: file.name, size: file.size });
      resolve(url);
    };
    reader.readAsDataURL(file);
  });
}

function previewImg(input, previewId) {
  const f = input.files[0]; if (!f) return;
  const reader = new FileReader();
  reader.onload = e => {
    const p = document.getElementById(previewId);
    p.src = e.target.result; p.classList.add('show');
  };
  reader.readAsDataURL(f);
}


/* ══ CARDS DE SERVIÇOS ════════════════════════════════════ */
function initCards() {
  document.getElementById('btn-new-card')?.addEventListener('click', () => openCardModal());
  document.getElementById('card-form')?.addEventListener('submit', saveCard);
  document.getElementById('card-modal')?.addEventListener('click', e => { if (e.target.id === 'card-modal') e.target.classList.remove('open'); });
}

async function loadCardsTable() {
  const tb = document.getElementById('cards-tbody'); if (!tb) return;
  tb.innerHTML = '<tr><td colspan="6" style="text-align:center;color:var(--text-mut);padding:1rem">Carregando...</td></tr>';
  const r = await api('GET', '/service-cards/all');
  const all = r.ok ? (r.data.data || r.data || []) : [];
  if (!all.length) { tb.innerHTML = '<tr><td colspan="6" style="text-align:center;color:var(--text-mut);padding:2rem">Nenhum card. Clique em Novo Card.</td></tr>'; return; }
  tb.innerHTML = all.map(c => {
    const parsedTags = Array.isArray(c.tags) ? c.tags : (typeof c.tags==='string'&&c.tags?JSON.parse(c.tags):[] );
    const tags = parsedTags.map(t => '<span class="badge badge-primary" style="margin:.1rem">' + EJ.esc(t) + '</span>').join('');
    return '<tr><td style="text-align:center;width:50px">' + c.order + '</td><td style="font-size:1.5rem;text-align:center;width:50px">' + EJ.esc(c.icon||'?') + '</td><td><div style="font-weight:600;color:var(--text)">' + EJ.esc(c.title) + '</div><div style="font-size:.75rem;color:var(--text-mut)">' + EJ.esc((c.description||'').substring(0,60)) + '...</div></td><td style="font-size:.78rem">' + tags + '</td><td><span class="badge ' + (c.active?'badge-green':'') + '" style="' + (c.active?'':'background:rgba(239,68,68,.1);color:var(--danger)') + '">' + (c.active?'Ativo':'Inativo') + '</span></td><td><div style="display:flex;gap:.4rem"><button class="btn btn-sm btn-outline" onclick="openCardModal(' + c.id + ')">Editar</button><button class="btn btn-sm btn-danger" onclick="delCard(' + c.id + ')">Excluir</button></div></td></tr>';
  }).join('');
}

function openCardModal(id=null) {
  const m=document.getElementById('card-modal'),f=document.getElementById('card-form');
  f.reset(); f['cid'].value=''; f['c-active'].checked=true; f['c-icon'].value='🖥';
  document.getElementById('card-modal-title').textContent='Novo Card';
  if (id) {
    api('GET','/service-cards/all').then(r => {
      const all=r.ok?(r.data.data||r.data||[]):[];
      const card=all.find(x=>x.id==id); if(!card)return;
      document.getElementById('card-modal-title').textContent='Editar Card';
      f['cid'].value=card.id; f['c-icon'].value=card.icon||''; f['c-title'].value=card.title;
      f['c-desc'].value=card.description;
      const cardTags = Array.isArray(card.tags) ? card.tags : (typeof card.tags==='string'&&card.tags ? JSON.parse(card.tags) : []);
      f['c-tags'].value=cardTags.join(', ');
      f['c-order'].value=card.order||0; f['c-active'].checked=card.active;
      if(f['c-section']) f['c-section'].value=card.section||'both';
    });
  }
  m.classList.add('open');
}

async function saveCard(e) {
  e.preventDefault();
  const f=e.target, id=f['cid'].value;
  const d={ icon:f['c-icon'].value.trim()||'🖥', title:f['c-title'].value.trim(),
    description:f['c-desc'].value.trim(), tags:f['c-tags'].value.split(',').map(t=>t.trim()).filter(Boolean),
    order:parseInt(f['c-order'].value)||0, active:f['c-active'].checked,
    section:f['c-section']?.value||'both' };
  if(!d.title||!d.description){toast('Titulo e descricao obrigatorios.','error');return;}
  const res=id?await api('PUT','/service-cards/'+id,d):await api('POST','/service-cards',d);
  toast(res.ok?(id?'Card atualizado!':'Card criado!'):'Erro ao salvar.', res.ok?'success':'error');
  document.getElementById('card-modal').classList.remove('open');
  await loadCardsTable();
  // Atualiza também a view de cards na aba Conteúdo das Páginas
  const ccSection = document.getElementById('content-cards-section');
  if (ccSection) loadContentCards(ccSection);
  // Recarrega todas as seções de cards
  ['content-cards-section','content-cards-section-serv','content-cards-section-sis','content-cards-section-sit','content-cards-section-api','content-cards-section-aut','content-cards-section-dev'].forEach(function(id) {
    var el = document.getElementById(id);
    if (el) loadContentCards(el, el.getAttribute('data-section') || undefined);
  });
}

async function delCard(id) {
  if(!confirm('Excluir este card?'))return;
  const r=await api('DELETE','/service-cards/'+id);
  toast(r.ok?'Card excluido.':'Erro.', r.ok?'success':'error');
  if(r.ok) {
    await loadCardsTable();
    const ccSection = document.getElementById('content-cards-section');
    if (ccSection) loadContentCards(ccSection);
  }
}

/* ══ UTILS ════════════════════════════════════════════════ */
function show(el){if(el)el.style.display='';}
function hide(el){if(el)el.style.display='none';}
function setTxt(id,v){const el=document.getElementById(id);if(el)el.textContent=v;}
function toast(msg,type='success'){
  document.querySelector('.toast')?.remove();
  const t=document.createElement('div');t.className=`toast toast-${type}`;t.textContent=msg;
  document.body.appendChild(t);setTimeout(()=>t.remove(),3500);
}

// Aplica cores salvas ao abrir o painel
loadSavedColors();

/* ══ E-MAIL / SMTP ════════════════════════════════════════ */
const SMTP_PRESETS = {
  gmail:    { host:'smtp.gmail.com',       port:587, enc:'tls' },
  outlook:  { host:'smtp.office365.com',   port:587, enc:'tls' },
  yahoo:    { host:'smtp.mail.yahoo.com',  port:587, enc:'tls' },
  hostinger:{ host:'smtp.hostinger.com',   port:587, enc:'tls' },
  custom:   { host:'',                     port:587, enc:'tls' },
};

function setSmtpPreset(key) {
  const p = SMTP_PRESETS[key]; if(!p) return;
  const h = document.getElementById('mail-host');
  const po = document.getElementById('mail-port');
  const e = document.getElementById('mail-encryption');
  if(h && p.host) h.value = p.host;
  if(po) po.value = p.port;
  if(e) e.value = p.enc;
}

async function loadMailConfig() {
  const r = await api('GET', '/settings');
  if (!r.ok) return;
  const s = r.data;
  const fields = {
    'mail-host':       s.mail_host       || 'smtp.gmail.com',
    'mail-port':       s.mail_port       || '587',
    'mail-encryption': s.mail_encryption || 'tls',
    'mail-username':   s.mail_username   || '',
    'mail-from-name':  s.mail_from_name  || 'EJ Tecnologia',
    'mail-from-email': s.mail_from_email || '',
    'mail-to-emails':  s.mail_to_emails  || '',
  };
  Object.entries(fields).forEach(([id, val]) => {
    const el = document.getElementById(id);
    if (el) el.value = val;
  });
  // Senha: não preenche por segurança, só indica se existe
  const pwEl = document.getElementById('mail-password');
  if (pwEl && s.mail_password) pwEl.placeholder = '••••••• (salva — deixe em branco para manter)';
}

async function saveMailConfig() {
  const values = {
    mail_host:       document.getElementById('mail-host')?.value?.trim()       || '',
    mail_port:       document.getElementById('mail-port')?.value?.trim()       || '587',
    mail_encryption: document.getElementById('mail-encryption')?.value         || 'tls',
    mail_username:   document.getElementById('mail-username')?.value?.trim()   || '',
    mail_from_name:  document.getElementById('mail-from-name')?.value?.trim()  || 'EJ Tecnologia',
    mail_from_email: document.getElementById('mail-from-email')?.value?.trim() || '',
    mail_to_emails:  document.getElementById('mail-to-emails')?.value?.trim()  || '',
  };
  // Senha: só salva se foi digitada algo novo
  const pw = document.getElementById('mail-password')?.value;
  if (pw && pw.trim()) values.mail_password = pw.trim();

  const r = await api('PUT', '/settings', { group: 'mail', values });
  if (r.ok) toast('Configurações de e-mail salvas!');
  else toast('Erro ao salvar configurações.', 'error');
}

async function testSmtp() {
  const toEl = document.getElementById('mail-test-to');
  const resultEl = document.getElementById('mail-test-result');
  const to = toEl?.value?.trim();
  if (!to) { if(toEl) toEl.focus(); return; }
  if (resultEl) { resultEl.textContent = 'Enviando...'; resultEl.style.color = 'var(--text-mut)'; }
  const r = await api('POST', '/contact/test', { to });
  if (resultEl) {
    resultEl.textContent = r.ok ? '✅ ' + r.data.message : '❌ ' + (r.data?.message || 'Erro ao enviar');
    resultEl.style.color = r.ok ? 'var(--success)' : 'var(--danger)';
  }
}
