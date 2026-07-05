@php
  $wpp      = $settings->get('contact_whatsapp', '5511999999999');
  $wppUrl   = 'https://wa.me/' . preg_replace('/\D/', '', $wpp);
  $email    = $settings->get('contact_email', 'contato@ejtecnologia.com.br');
  $siteName = $settings->get('site_name', 'EJ Tecnologia');
  $footerTxt = $settings->get('footer_text', '');
@endphp
<footer class="footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <a href="{{ route('home') }}" class="logo">
          <div class="logo-icon">EJ</div>
          <span class="logo-text">{{ $siteName }}</span>
        </a>
        <p>Sistemas, automações, sites e APIs feitos sob medida para o seu negócio crescer com tecnologia de verdade.</p>
      </div>
      <div class="footer-col">
        <h4>Soluções</h4>
        <div class="footer-links">
          <a href="{{ route('servicos') }}">Sistemas e SaaS</a>
          <a href="{{ route('servicos') }}">Sites e E-commerce</a>
          <a href="{{ route('servicos') }}">Aplicativos</a>
          <a href="{{ route('servicos') }}">APIs e Integrações</a>
          <a href="{{ route('servicos') }}">Automações</a>
        </div>
      </div>
      <div class="footer-col">
        <h4>Empresa</h4>
        <div class="footer-links">
          <a href="{{ route('home') }}#sobre">Quem somos</a>
          <a href="{{ route('blog') }}">Blog</a>
          <a href="{{ route('home') }}#contato">Contato</a>
          <a href="{{ route('ejadmin') }}">Admin</a>
        </div>
      </div>
      <div class="footer-col">
        <h4>Contato</h4>
        <div class="footer-links">
          <a href="{{ $wppUrl }}" target="_blank">WhatsApp</a>
          <a href="mailto:{{ $email }}">E-mail</a>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <p>{{ $siteName }} — Emerson Souza &amp; Julio Cesar Leal. <span style="color:var(--text-mut);font-size:.85em">{{ $footerTxt }}</span></p>
    </div>
  </div>
</footer>
