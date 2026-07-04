#!/usr/bin/env python3
import sys
if hasattr(sys.stdout, "reconfigure"): sys.stdout.reconfigure(encoding="utf-8")
"""
Build script — EJ Tecnologia
Minifica CSS, JS e HTML para produção.
Uso: python3 build.py

Saída: pasta dist/ pronta para upload no cPanel.
"""

import os, re, shutil, gzip, json
from pathlib import Path

SRC  = Path(__file__).parent / 'site'
DIST = Path(__file__).parent / 'dist'
BACKEND_SRC = Path(__file__).parent / 'backend'

# ─────────────────────────────────────────────────────────────
# Utilidades
# ─────────────────────────────────────────────────────────────

def read(path):
    with open(path, 'r', encoding='utf-8') as f:
        return f.read()

def write(path, content):
    path.parent.mkdir(parents=True, exist_ok=True)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

def write_bytes(path, data):
    path.parent.mkdir(parents=True, exist_ok=True)
    with open(path, 'wb') as f:
        f.write(data)

def size_kb(path):
    return round(os.path.getsize(path) / 1024, 1)

def gzip_file(src_path):
    """Gera .gz do arquivo para servidores que servem gzip estático."""
    with open(src_path, 'rb') as f_in:
        gz_path = str(src_path) + '.gz'
        with gzip.open(gz_path, 'wb', compresslevel=9) as f_out:
            f_out.write(f_in.read())
    return gz_path

# ─────────────────────────────────────────────────────────────
# Minificação CSS
# ─────────────────────────────────────────────────────────────

def minify_css(css):
    # Remove comentários /* ... */
    css = re.sub(r'/\*.*?\*/', '', css, flags=re.DOTALL)
    # Remove linhas em branco e espaços desnecessários
    css = re.sub(r'\s+', ' ', css)
    # Remove espaços ao redor de :;{}(),>+~
    css = re.sub(r'\s*([{};:,>+~()])\s*', r'\1', css)
    css = re.sub(r';\s*}', '}', css)  # remove ; antes de }
    css = re.sub(r'\s*!\s*important', '!important', css)
    # Remove zeros desnecessários: 0.5 → .5
    css = re.sub(r'(?<!\w)0\.(\d)', r'.\1', css)
    # Remove unidades de 0: 0px → 0
    css = re.sub(r':0(px|em|rem|%)', ':0', css)
    css = re.sub(r'\s+0(px|em|rem|%)', ' 0', css)
    return css.strip()

# ─────────────────────────────────────────────────────────────
# Minificação JS (conservadora — mantém strings intactas)
# ─────────────────────────────────────────────────────────────

def minify_js(js):
    # Remove comentários de linha // (mas não URLs)
    js = re.sub(r'(?<!:)//(?!/).*?(?=\n|$)', '', js)
    # Remove comentários de bloco /* ... */
    js = re.sub(r'/\*.*?\*/', '', js, flags=re.DOTALL)
    # Compacta múltiplos espaços/tabs
    js = re.sub(r'[ \t]+', ' ', js)
    # Remove linhas em branco múltiplas
    js = re.sub(r'\n\s*\n+', '\n', js)
    # Remove espaços ao redor de operadores simples
    js = re.sub(r' *(=|\+|-|\*|\/|%|&&|\|\||!|;|,|\{|\}|\(|\)|\[|\]|<|>|:|\?) *', r'\1', js)
    # Remove espaços no início/fim de linhas
    js = re.sub(r'^\s+|\s+$', '', js, flags=re.MULTILINE)
    # Junta linhas (cuidado: não une onde há strings multi-linha)
    lines = [l.strip() for l in js.split('\n') if l.strip()]
    return '\n'.join(lines)

# ─────────────────────────────────────────────────────────────
# Minificação HTML
# ─────────────────────────────────────────────────────────────

def minify_html(html):
    # Remove comentários HTML (mas não IE conditionals)
    html = re.sub(r'<!--(?!\[if).*?-->', '', html, flags=re.DOTALL)
    # Compacta espaços dentro de tags mas não em pre/script/style
    html = re.sub(r'[ \t]+', ' ', html)
    html = re.sub(r'\n\s*\n+', '\n', html)
    return html.strip()

# ─────────────────────────────────────────────────────────────
# Atualiza referências de versão nos HTMLs
# ─────────────────────────────────────────────────────────────

def update_asset_refs(html, prod=True):
    """Atualiza referências CSS/JS para versões minificadas + cache bust."""
    if prod:
        html = html.replace('css/style.css', 'css/style.min.css')
        html = html.replace('js/config.js', 'js/config.min.js')
        html = html.replace('js/data.js', 'js/data.min.js')
        html = html.replace('js/icons.js', 'js/icons.min.js')
        html = html.replace('js/main.js', 'js/main.min.js')
        html = html.replace('js/admin.js', 'js/admin.min.js')
        # Remove cache-bust params (desnecessários em produção com .htaccess)
        html = re.sub(r'\.(min\.(css|js))\?v=\d+', r'.\1', html)
        html = re.sub(r'\.(css|js)\?v=\d+', r'.\1', html)
    return html

# ─────────────────────────────────────────────────────────────
# .htaccess para gzip + cache
# ─────────────────────────────────────────────────────────────

HTACCESS = """\
# EJ Tecnologia — Configurações de performance para cPanel

# ── Compressão GZIP ──────────────────────────────────────────
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css application/javascript
  AddOutputFilterByType DEFLATE text/plain application/json text/xml
</IfModule>

# ── Gzip estático (arquivos .gz pré-gerados) ─────────────────
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteCond %{HTTP:Accept-Encoding} gzip
  RewriteCond %{REQUEST_FILENAME}.gz -f
  RewriteRule ^(.*)$ $1.gz [L]
</IfModule>

# ── Cache de assets estáticos ────────────────────────────────
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/css              "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType image/png             "access plus 6 months"
  ExpiresByType image/jpeg            "access plus 6 months"
  ExpiresByType image/webp            "access plus 6 months"
  ExpiresByType image/svg+xml        "access plus 1 month"
  ExpiresByType text/html             "access plus 1 hour"
</IfModule>

# ── Headers de cache ─────────────────────────────────────────
<IfModule mod_headers.c>
  <FilesMatch r"\.(css|js)$">
    Header set Cache-Control "public, max-age=2592000"
  </FilesMatch>
  <FilesMatch r"\.(png|jpg|jpeg|gif|webp|svg|ico)$">
    Header set Cache-Control "public, max-age=15552000"
  </FilesMatch>
  # Segurança
  Header always set X-Content-Type-Options "nosniff"
  Header always set X-Frame-Options "SAMEORIGIN"
  Header always set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>

# ── Bloqueia acesso direto a arquivos sensíveis ──────────────
<FilesMatch r"\.(env|log|sql|md|json|lock|sh)$">
  Order Allow,Deny
  Deny from all
</FilesMatch>

# ── Protege o diretório do backend ───────────────────────────
RedirectMatch 403 ^/backend/.*$

# ── Remoção de index.html da URL ─────────────────────────────
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteCond %{THE_REQUEST} /index\.html
  RewriteRule ^(.*)index\.html$ /$1 [R=301,L]
</IfModule>
"""

# ─────────────────────────────────────────────────────────────
# BUILD
# ─────────────────────────────────────────────────────────────

def build():
    print("=" * 50)
    print("  EJ Tecnologia — Build de Produção")
    print("=" * 50)

    if DIST.exists():
        shutil.rmtree(DIST)
    DIST.mkdir()

    stats = {'css': {}, 'js': {}, 'html': {}}

    # ── CSS ──────────────────────────────────────────────────
    print("\n[PKG] Minificando CSS...")
    css_src = SRC / 'css' / 'style.css'
    css_min = minify_css(read(css_src))
    out_css = DIST / 'css' / 'style.min.css'
    write(out_css, css_min)
    orig_kb = size_kb(css_src)
    min_kb  = size_kb(out_css)
    gz_path = gzip_file(out_css)
    gz_kb   = size_kb(gz_path)
    pct = round((1 - min_kb/orig_kb)*100)
    print(f"  style.css: {orig_kb}KB → {min_kb}KB min → {gz_kb}KB gzip  (-{pct}%)")
    stats['css']['style'] = {'orig': orig_kb, 'min': min_kb, 'gz': gz_kb}

    # ── JS ───────────────────────────────────────────────────
    print("\n[PKG] Minificando JS...")
    js_files = ['config.js', 'data.js', 'icons.js', 'main.js', 'admin.js']
    for jsf in js_files:
        src_path = SRC / 'js' / jsf
        if not src_path.exists():
            continue
        js_min = minify_js(read(src_path))
        out_js = DIST / 'js' / jsf.replace('.js', '.min.js')
        write(out_js, js_min)
        orig_kb = size_kb(src_path)
        min_kb  = size_kb(out_js)
        gz_path = gzip_file(out_js)
        gz_kb   = size_kb(gz_path)
        pct = round((1 - min_kb/orig_kb)*100)
        print(f"  {jsf}: {orig_kb}KB → {min_kb}KB min → {gz_kb}KB gzip  (-{pct}%)")
        stats['js'][jsf] = {'orig': orig_kb, 'min': min_kb, 'gz': gz_kb}

    # ── HTML ─────────────────────────────────────────────────
    print("\n[PKG] Minificando HTML...")
    html_files = ['index.html', 'servicos.html', 'blog.html', 'post.html', 'admin.html']
    for hf in html_files:
        src_path = SRC / hf
        if not src_path.exists():
            continue
        html = read(src_path)
        html = update_asset_refs(html, prod=True)
        html = minify_html(html)
        out_html = DIST / hf
        write(out_html, html)
        orig_kb = size_kb(src_path)
        min_kb  = size_kb(out_html)
        pct = round((1 - min_kb/orig_kb)*100) if orig_kb > 0 else 0
        print(f"  {hf}: {orig_kb}KB → {min_kb}KB  (-{pct}%)")
        stats['html'][hf] = {'orig': orig_kb, 'min': min_kb}

    # ── Outros arquivos estáticos ────────────────────────────
    print("\n[PKG] Copiando arquivos estáticos...")
    extras = ['sitemap.xml', 'robots.txt', 'favicon.ico']
    for f in extras:
        src = SRC / f
        if src.exists():
            shutil.copy2(src, DIST / f)
            print(f"  ✓ {f}")

    # Copia imagens/uploads (se existirem na pasta local)
    for folder in ['images', 'uploads']:
        src_dir = SRC / folder
        if src_dir.exists():
            shutil.copytree(src_dir, DIST / folder)
            print(f"  ✓ {folder}/ (copiado)")

    # ── .htaccess ────────────────────────────────────────────
    write(DIST / '.htaccess', HTACCESS)
    print(f"  ✓ .htaccess (gzip + cache + segurança)")

    # ── Resumo ───────────────────────────────────────────────
    print("\n" + "=" * 50)
    print("  [OK] Build concluído! → pasta dist/")
    print("=" * 50)

    total_orig = sum(v['orig'] for d in stats.values() for v in d.values())
    total_min  = sum(v['min']  for d in stats.values() for v in d.values())
    if total_orig > 0:
        pct_total = round((1 - total_min/total_orig)*100)
        print(f"\n  Total: {total_orig}KB → {total_min}KB  (-{pct_total}% em média)")

    print("\n  [LIST] Para subir ao cPanel:")
    print("     1. Faça upload de tudo em dist/ para public_html/")
    print("     2. Configure o backend Laravel separadamente (ver COMO-RODAR.md)")
    print("     3. Atualize CFG.API em config.min.js com a URL de produção")

    return stats

if __name__ == '__main__':
    build()
