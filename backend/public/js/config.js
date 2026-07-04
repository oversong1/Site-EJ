/* ============================================================
   EJ TECNOLOGIA — CONFIGURAÇÃO DA API
   Timeout de 3s para não travar quando Docker está offline
   ============================================================ */
const CFG = {
  API: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost/api'
    : '/api',
  OFFLINE: false,
  TIMEOUT: 6000, // 6s leitura, 12s escrita (adaptativo)
};

/* Helper: fetch com Bearer token + timeout de 3 segundos */
async function api(method, path, body = null, isForm = false) {
  const ctrl = new AbortController();
  const isWrite = ['POST','PUT','DELETE','PATCH'].includes(method.toUpperCase());
  const timeoutMs = isWrite ? 12000 : CFG.TIMEOUT;
  const tid  = setTimeout(() => ctrl.abort(), timeoutMs);

  const token = localStorage.getItem('ej_token') || sessionStorage.getItem('ej_token');
  const headers = { 'Accept': 'application/json' };
  if (token)            headers['Authorization']  = 'Bearer ' + token;
  if (!isForm && body)  headers['Content-Type']   = 'application/json';

  const opts = { method, headers, signal: ctrl.signal };
  if (body) opts.body = isForm ? body : JSON.stringify(body);

  try {
    const res  = await fetch(CFG.API + path, opts);
    clearTimeout(tid);
    const json = await res.json().catch(() => ({}));
    // Detecta token inválido/expirado em qualquer chamada autenticada
    if (res.status === 401 && token && path !== '/auth/login') {
      // Token expirado: limpa e mostra tela de login automaticamente
      ['ej_token','ej_role','ej_name','ej_email'].forEach(k => localStorage.removeItem(k));
      const loginEl = document.getElementById('adm-login');
      const dashEl  = document.getElementById('adm-dash');
      if (loginEl && dashEl) {
        dashEl.style.display = 'none';
        loginEl.style.display = '';
        if (typeof toast === 'function') toast('Sess\u00e3o expirada. Fa\u00e7a login novamente.', 'error');
      }
    }
    return { ok: res.ok, status: res.status, data: json };
  } catch (e) {
    clearTimeout(tid);
    if (e.name === 'AbortError' && isWrite) {
      // Timeout numa escrita: operação PODE ter sido concluída no servidor
      return { ok: false, status: 0, data: { message: 'Operação demorou — verifique com F5 se foi salvo.' }, timeout: true };
    }
    CFG.OFFLINE = true;
    return { ok: false, status: 0, data: {}, offline: true };
  }
}

/* Retorna o role do usuário logado (lido do token decodificado ou sessionStorage) */
function getUserRole() {
  return sessionStorage.getItem('ej_role') || 'admin';
}
