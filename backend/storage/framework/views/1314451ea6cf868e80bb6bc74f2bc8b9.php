<?php $__env->startSection('title', ($settings->get('site_name','EJ Tecnologia') . ' — Sistemas, Automações e Sites Sob Medida')); ?>
<?php $__env->startSection('description', 'Desenvolvemos sistemas SaaS, ERPs, automações, APIs, sites e aplicativos. Emerson Souza + Julio Cesar Leal.'); ?>

<?php $__env->startSection('og'); ?>
<meta property="og:type"        content="website">
<meta property="og:url"         content="<?php echo e(url('/')); ?>">
<meta property="og:title"       content="<?php echo e($settings->get('site_name','EJ Tecnologia')); ?> — Sistemas, Automações e Sites Sob Medida">
<meta property="og:description" content="Desenvolvemos sistemas SaaS, ERPs, automações, APIs, sites e aplicativos.">
<meta property="og:image"       content="<?php echo e(url('/og-image.png')); ?>">
<meta property="og:locale"      content="pt_BR">
<?php $__env->stopSection(); ?>

<?php $__env->startSection('content'); ?>


<section id="slider-wrap" class="hero-slider">
  <div id="slider-slides">
    <?php $__currentLoopData = $banners; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $i => $b): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
      <?php
        $stats = is_array($b->stats) ? $b->stats : (json_decode($b->stats ?? '[]', true) ?: []);
        $statsHtml = '';
        foreach($stats as $s) {
          if(!empty($s['val'])) $statsHtml .= '<div><div class="hero-stat-val gradient-text">'.e($s['val']).'</div><div class="hero-stat-lbl">'.e($s['lbl'] ?? '').'</div></div>';
        }
      ?>
      <div class="hero-slide <?php echo e($b->layout ?? 'bg'); ?> <?php echo e($i === 0 ? 'active' : ''); ?>"
           <?php if($b->image_url && ($b->layout ?? 'bg') === 'bg'): ?>
             style="background-image:url('<?php echo e($b->image_url); ?>')"
           <?php endif; ?>>
        <div class="container hero-inner">
          <div class="hero-text">
            <?php if($b->tag): ?> <span class="section-tag"><?php echo e($b->tag); ?></span> <?php endif; ?>
            <h1 class="hero-title anim-fiu d1"><?php echo e($b->title); ?></h1>
            <p class="hero-sub anim-fiu d2"><?php echo e($b->subtitle); ?></p>
            <?php if($statsHtml): ?>
              <div class="hero-stats anim-fiu d3"><?php echo $statsHtml; ?></div>
            <?php endif; ?>
            <div class="hero-acts anim-fiu d4">
              <?php if($b->cta_text): ?>
                <a href="<?php echo e($b->cta_link ?? '#contato'); ?>" class="btn btn-primary btn-lg"><?php echo e($b->cta_text); ?></a>
              <?php endif; ?>
              <?php if($b->cta2_text): ?>
                <a href="<?php echo e($b->cta2_link ?? '#servicos'); ?>" class="btn btn-secondary btn-lg"><?php echo e($b->cta2_text); ?> &rarr;</a>
              <?php endif; ?>
            </div>
          </div>
          <?php if($b->image_url && in_array($b->layout ?? 'bg', ['right','left'])): ?>
            <div class="hero-img-side">
              <img src="<?php echo e($b->image_url); ?>" alt="<?php echo e($b->title); ?>" loading="lazy">
            </div>
          <?php endif; ?>
        </div>
      </div>
    <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
  </div>
  <?php if($banners->count() > 1): ?>
    <div class="slider-controls" id="slider-dots">
      <?php $__currentLoopData = $banners; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $i => $b): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
        <button class="slider-dot <?php echo e($i === 0 ? 'active' : ''); ?>" data-slide="<?php echo e($i); ?>"></button>
      <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
    </div>
    <div class="slider-arrows">
      <button class="slider-arrow" id="btn-prev" aria-label="Anterior">&#8592;</button>
      <button class="slider-arrow" id="btn-next" aria-label="Próximo">&#8594;</button>
    </div>
  <?php endif; ?>
</section>


<section class="section" id="servicos">
  <div class="container">
    <div class="section-header">
      <span class="section-tag">O que fazemos</span>
      <h2 class="section-title"><?php echo e($settings->get('home_services_title', 'Nossas Soluções')); ?></h2>
      <p class="section-subtitle"><?php echo e($settings->get('home_services_sub', 'Do sistema mais simples ao mais complexo.')); ?></p>
    </div>
    <div class="services-grid">
      <?php $__currentLoopData = $cards; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $card): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
        <?php
          $tags = is_array($card->tags) ? $card->tags : (json_decode($card->tags ?? '[]', true) ?: []);
          $icon = $card->icon ?? '🖥';
          $isSvg = str_starts_with($icon, '[svg:');
          $svgId = $isSvg ? substr($icon, 5, -1) : '';
        ?>
        <div class="service-card reveal">
          <div class="service-icon-wrap" style="font-size:1.6rem">
            <?php if($isSvg): ?>
              <svg style="width:28px;height:28px;fill:currentColor"><use href="#<?php echo e($svgId); ?>"/></svg>
            <?php else: ?>
              <?php echo e($icon); ?>

            <?php endif; ?>
          </div>
          <div class="service-title"><?php echo e($card->title); ?></div>
          <p class="service-desc"><?php echo e($card->description); ?></p>
          <?php if($tags): ?>
            <div class="service-tags">
              <?php $__currentLoopData = $tags; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $tag): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                <span class="service-tag"><?php echo e($tag); ?></span>
              <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
            </div>
          <?php endif; ?>
        </div>
      <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
    </div>
    <div style="text-align:center;margin-top:2.5rem">
      <a href="<?php echo e(route('servicos')); ?>" class="btn btn-outline btn-lg">Ver todos os serviços &rarr;</a>
    </div>
  </div>
</section>


<section class="section cta-section">
  <div class="container cta-inner">
    <span class="section-tag">Metodologia</span>
    <h2 class="section-title cta-title"><?php echo e($settings->get('home_method_title', 'Do problema à solução em 4 passos')); ?></h2>
    <div class="grid-4 reveal" style="margin-top:2.5rem;text-align:left">
      <?php $__currentLoopData = [
        ['home_step1_title','home_step1_desc','1. Diagnóstico','Entendemos a dor, o objetivo e o que precisa existir.'],
        ['home_step2_title','home_step2_desc','2. Proposta','Escopo fechado, prazo e valor definidos antes de começar.'],
        ['home_step3_title','home_step3_desc','3. Desenvolvimento','Entregas semanais com CI/CD. Você acompanha o progresso.'],
        ['home_step4_title','home_step4_desc','4. Entrega','Treinamento, documentação e suporte inclusos.'],
      ]; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $step): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
        <div class="card">
          <div class="card-title"><?php echo e($settings->get($step[0], $step[2])); ?></div>
          <p class="card-text"><?php echo e($settings->get($step[1], $step[3])); ?></p>
        </div>
      <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
    </div>
  </div>
</section>


<section class="section" id="sobre">
  <div class="container">
    <div class="section-header">
      <span class="section-tag">A equipe</span>
      <h2 class="section-title"><?php echo e($settings->get('home_about_title', 'Dev + PM — uma combinação rara')); ?></h2>
      <p class="section-subtitle"><?php echo e($settings->get('home_about_sub', '')); ?></p>
    </div>
    <div class="team-grid reveal">
      <?php $__currentLoopData = $team; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $member): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
        <?php $tags = is_array($member->tags) ? $member->tags : (json_decode($member->tags ?? '[]', true) ?: []); ?>
        <div class="team-card">
          <div class="team-photo">
            <?php if($member->photo_url): ?>
              <img src="<?php echo e($member->photo_url); ?>" alt="<?php echo e($member->name); ?>" loading="lazy" style="width:100%;height:100%;object-fit:cover;border-radius:50%">
            <?php else: ?>
              <svg class="svc-svg" style="width:40px;height:40px;opacity:.5"><use href="#i-user"/></svg>
            <?php endif; ?>
          </div>
          <div class="team-name"><?php echo e($member->name); ?></div>
          <div class="team-role"><?php echo e($member->role); ?></div>
          <p class="team-bio"><?php echo e($member->bio); ?></p>
          <?php if($tags): ?>
            <div class="team-skills">
              <?php $__currentLoopData = $tags; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $tag): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?><span class="skill-badge"><?php echo e($tag); ?></span><?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
            </div>
          <?php endif; ?>
          <?php if($member->linkedin): ?>
            <a href="<?php echo e($member->linkedin); ?>" target="_blank" class="team-li">
              <svg class="icon" style="width:16px;height:16px"><use href="#i-linkedin"/></svg> LinkedIn
            </a>
          <?php endif; ?>
        </div>
      <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
    </div>
  </div>
</section>


<?php
  $stackRaw = $settings->get('stack_items', '');
  $stackItems = $stackRaw ? array_filter(array_map('trim', explode('|', $stackRaw))) : [];
?>
<?php if($stackItems): ?>
<section class="section-sm" style="background:var(--surface3);border-top:1px solid var(--border-light);border-bottom:1px solid var(--border-light)">
  <div class="container">
    <div class="section-header" style="margin-bottom:2rem">
      <span class="section-tag">Stack</span>
      <h3 class="section-title">Tecnologias que dominamos</h3>
    </div>
    <div class="stack-wrap reveal">
      <?php $__currentLoopData = $stackItems; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $item): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
        <div class="stack-chip"><?php echo e($item); ?></div>
      <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
    </div>
  </div>
</section>
<?php endif; ?>


<?php if($posts->count()): ?>
<section class="section">
  <div class="container">
    <div class="section-header">
      <span class="section-tag">Blog Técnico</span>
      <h2 class="section-title">Últimos artigos</h2>
    </div>
    <div class="blog-grid">
      <?php $__currentLoopData = $posts; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $post): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
        <?php $color = $post->color ?? '#6C63FF'; ?>
        <article class="blog-card reveal" style="border-top:3px solid <?php echo e($color); ?>" onclick="location.href='<?php echo e(route('post', $post->id)); ?>'">
          <?php if($post->image_url): ?>
            <div class="blog-thumb"><img src="<?php echo e($post->image_url); ?>" alt="<?php echo e($post->title); ?>" loading="lazy" style="width:100%;height:100%;object-fit:cover"></div>
          <?php else: ?>
            <div class="blog-thumb" style="background:linear-gradient(135deg,<?php echo e($color); ?>28,<?php echo e($color); ?>18)"></div>
          <?php endif; ?>
          <div class="blog-body">
            <span class="blog-cat" style="background:<?php echo e($color); ?>22;color:<?php echo e($color); ?>"><?php echo e($post->category); ?></span>
            <h3 class="blog-title"><?php echo e($post->title); ?></h3>
            <p class="blog-exc"><?php echo e($post->excerpt); ?></p>
          </div>
        </article>
      <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
    </div>
    <div style="text-align:center;margin-top:2.5rem">
      <a href="<?php echo e(route('blog')); ?>" class="btn btn-outline">Ver todos os artigos &rarr;</a>
    </div>
  </div>
</section>
<?php endif; ?>


<?php
  $wpp    = $settings->get('contact_whatsapp', '5511999999999');
  $wppUrl = 'https://wa.me/' . preg_replace('/\D/', '', $wpp);
  $email  = $settings->get('contact_email', 'contato@ejtecnologia.com.br');
?>
<section class="section cta-section" id="contato">
  <div class="container">
    <div class="cta-inner">
      <span class="section-tag">Vamos conversar</span>
      <h2 class="section-title cta-title"><?php echo e($settings->get('home_cta_title', 'Tem um problema que a tecnologia pode resolver?')); ?></h2>
      <p class="cta-sub"><?php echo e($settings->get('home_cta_sub', 'Em 15 minutos você sabe se temos uma solução.')); ?></p>

      
      <form id="contact-form" data-api="/contact" style="background:rgba(255,255,255,.04);border:1px solid var(--border-light);border-radius:var(--radius);padding:1.75rem;margin:1.5rem auto 2rem;max-width:520px;text-align:left">
        <?php echo csrf_field(); ?>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1rem">
          <div>
            <label style="font-size:.8rem;color:var(--text-mut);display:block;margin-bottom:.35rem">Nome</label>
            <input name="name" type="text" required placeholder="Seu nome" class="form-control" style="background:var(--surface);border:1px solid var(--border-light);border-radius:var(--radius-sm);padding:.65rem .9rem;color:var(--text);width:100%;box-sizing:border-box">
          </div>
          <div>
            <label style="font-size:.8rem;color:var(--text-mut);display:block;margin-bottom:.35rem">E-mail</label>
            <input name="email" type="email" required placeholder="seu@email.com" class="form-control" style="background:var(--surface);border:1px solid var(--border-light);border-radius:var(--radius-sm);padding:.65rem .9rem;color:var(--text);width:100%;box-sizing:border-box">
          </div>
        </div>
        <div style="margin-bottom:1rem">
          <label style="font-size:.8rem;color:var(--text-mut);display:block;margin-bottom:.35rem">O que precisa?</label>
          <select name="service" style="background:var(--surface);border:1px solid var(--border-light);border-radius:var(--radius-sm);padding:.65rem .9rem;color:var(--text);width:100%;box-sizing:border-box">
            <option value="">Selecione (opcional)</option>
            <option>Sistema / SaaS</option><option>Site ou E-commerce</option>
            <option>API / Integração</option><option>Automação</option>
            <option>Chatbot / IA</option><option>DevOps / CI/CD</option>
            <option>Consultoria</option><option>Outro</option>
          </select>
        </div>
        <div style="margin-bottom:1.25rem">
          <label style="font-size:.8rem;color:var(--text-mut);display:block;margin-bottom:.35rem">Mensagem</label>
          <textarea name="message" rows="3" required placeholder="Descreva brevemente o seu projeto..." style="background:var(--surface);border:1px solid var(--border-light);border-radius:var(--radius-sm);padding:.65rem .9rem;color:var(--text);width:100%;box-sizing:border-box;resize:vertical"></textarea>
        </div>
        <button type="submit" class="btn btn-primary" style="width:100%;justify-content:center">
          <svg class="icon icon-sm"><use href="#i-email"/></svg> Enviar mensagem
        </button>
        <p id="contact-ok"  style="display:none;color:var(--success);text-align:center;margin-top:.75rem">✅ Mensagem enviada! Retornamos em até 24h.</p>
        <p id="contact-err" style="display:none;color:var(--danger);text-align:center;margin-top:.75rem">❌ Erro ao enviar. Tente pelo WhatsApp.</p>
      </form>

      <div class="cta-acts">
        <a href="<?php echo e($wppUrl); ?>" class="btn btn-whatsapp btn-lg" target="_blank">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style="flex-shrink:0;display:inline-block;vertical-align:middle"><path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/></svg> Falar no WhatsApp
        </a>
        <a href="mailto:<?php echo e($email); ?>" class="btn btn-secondary btn-lg">
          <svg class="icon"><use href="#i-email"/></svg> Enviar e-mail
        </a>
      </div>
    </div>
  </div>
</section>

<?php $__env->stopSection(); ?>

<?php $__env->startSection('scripts'); ?>
<script src="/js/data.js" defer></script>
<script src="/js/main.js?v=18" defer></script>
<?php $__env->stopSection(); ?>

<?php echo $__env->make('layouts.app', array_diff_key(get_defined_vars(), ['__data' => 1, '__path' => 1]))->render(); ?><?php /**PATH /var/www/app/resources/views/home.blade.php ENDPATH**/ ?>