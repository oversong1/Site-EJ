@php
  $wpp     = $settings->get('contact_whatsapp', '5511999999999');
  $wppUrl  = 'https://wa.me/' . preg_replace('/\D/', '', $wpp);
  $siteName = $settings->get('site_name', 'EJ Tecnologia');
@endphp
<header class="header">
  <div class="container">
    <div class="header-inner">
      <a href="{{ route('home') }}" class="logo">
        <div class="logo-icon">EJ</div>
        <span class="logo-text">{{ $siteName }}</span>
      </a>
      <nav class="nav">
        <a href="{{ route('home') }}"     class="nav-link {{ request()->is('/') ? 'active' : '' }}">Home</a>
        <a href="{{ route('servicos') }}" class="nav-link {{ request()->is('servicos') ? 'active' : '' }}">Serviços</a>
        <a href="{{ route('blog') }}"     class="nav-link {{ request()->is('blog*') ? 'active' : '' }}">Blog</a>
        <a href="{{ route('home') }}#sobre"   class="nav-link">Sobre</a>
        <a href="{{ route('home') }}#contato" class="nav-link">Contato</a>
      </nav>
      <div class="header-actions">
        <a href="{{ $wppUrl }}" class="btn btn-whatsapp btn-sm" target="_blank">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style="flex-shrink:0;display:inline-block;vertical-align:middle"><path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326z"/></svg> WhatsApp
        </a>
      </div>
      <button class="hamburger" aria-label="Menu"><span></span><span></span><span></span></button>
    </div>
  </div>
</header>
<nav class="mobile-nav">
  <a href="{{ route('home') }}"     class="nav-link">Home</a>
  <a href="{{ route('servicos') }}" class="nav-link">Serviços</a>
  <a href="{{ route('blog') }}"     class="nav-link">Blog</a>
  <a href="{{ route('home') }}#sobre"   class="nav-link">Sobre</a>
  <a href="{{ route('home') }}#contato" class="nav-link">Contato</a>
  <a href="{{ $wppUrl }}" class="btn btn-whatsapp" target="_blank">WhatsApp</a>
</nav>
