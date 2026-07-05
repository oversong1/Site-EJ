<?php
  $wpp      = $settings->get('contact_whatsapp', '5511999999999');
  $wppUrl   = 'https://wa.me/' . preg_replace('/\D/', '', $wpp);
  $email    = $settings->get('contact_email', 'contato@ejtecnologia.com.br');
  $siteName = $settings->get('site_name', 'EJ Tecnologia');
  $footerTxt = $settings->get('footer_text', '');
?>
<footer class="footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <a href="<?php echo e(route('home')); ?>" class="logo">
          <div class="logo-icon">EJ</div>
          <span class="logo-text"><?php echo e($siteName); ?></span>
        </a>
        <p>Sistemas, automações, sites e APIs feitos sob medida para o seu negócio crescer com tecnologia de verdade.</p>
      </div>
      <div class="footer-col">
        <h4>Soluções</h4>
        <div class="footer-links">
          <a href="<?php echo e(route('servicos')); ?>">Sistemas e SaaS</a>
          <a href="<?php echo e(route('servicos')); ?>">Sites e E-commerce</a>
          <a href="<?php echo e(route('servicos')); ?>">Aplicativos</a>
          <a href="<?php echo e(route('servicos')); ?>">APIs e Integrações</a>
          <a href="<?php echo e(route('servicos')); ?>">Automações</a>
        </div>
      </div>
      <div class="footer-col">
        <h4>Empresa</h4>
        <div class="footer-links">
          <a href="<?php echo e(route('home')); ?>#sobre">Quem somos</a>
          <a href="<?php echo e(route('blog')); ?>">Blog</a>
          <a href="<?php echo e(route('home')); ?>#contato">Contato</a>
          <a href="<?php echo e(route('ejadmin')); ?>">Admin</a>
        </div>
      </div>
      <div class="footer-col">
        <h4>Contato</h4>
        <div class="footer-links">
          <a href="<?php echo e($wppUrl); ?>" target="_blank">WhatsApp</a>
          <a href="mailto:<?php echo e($email); ?>">E-mail</a>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <p><?php echo e($siteName); ?> — Emerson Souza &amp; Julio Cesar Leal. <span style="color:var(--text-mut);font-size:.85em"><?php echo e($footerTxt); ?></span></p>
    </div>
  </div>
</footer>
<?php /**PATH /var/www/app/resources/views/partials/footer.blade.php ENDPATH**/ ?>