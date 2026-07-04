<?php $__env->startSection('title', 'Blog — ' . $settings->get('site_name','EJ Tecnologia')); ?>
<?php $__env->startSection('description', 'Artigos técnicos sobre PHP, Laravel, automações, IA, DevOps e tecnologia para negócios.'); ?>

<?php $__env->startSection('content'); ?>
<section class="hero-sm">
  <div class="container">
    <span class="section-tag">Blog Técnico</span>
    <h1 class="hero-title"><?php echo e($settings->get('blog_hero_title', 'Conteúdo técnico e de negócio')); ?></h1>
    <p class="hero-sub"><?php echo e($settings->get('blog_hero_sub', '')); ?></p>
  </div>
</section>

<section class="section">
  <div class="container">
    
    <div id="blog-controls"></div>

    <div class="blog-grid" id="blog-grid">
      <?php $__empty_1 = true; $__currentLoopData = $posts; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $post): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); $__empty_1 = false; ?>
        <?php $color = $post->color ?? '#6C63FF'; ?>
        <article class="blog-card reveal" style="border-top:3px solid <?php echo e($color); ?>"
                 onclick="location.href='<?php echo e(route('post', $post->id)); ?>'">
          <?php if($post->image_url): ?>
            <div class="blog-thumb">
              <img src="<?php echo e($post->image_url); ?>" alt="<?php echo e($post->title); ?>" loading="lazy" style="width:100%;height:100%;object-fit:cover">
            </div>
          <?php else: ?>
            <div class="blog-thumb" style="background:linear-gradient(135deg,<?php echo e($color); ?>28,<?php echo e($color); ?>18)"></div>
          <?php endif; ?>
          <div class="blog-body">
            <span class="blog-cat" style="background:<?php echo e($color); ?>22;color:<?php echo e($color); ?>"><?php echo e($post->category); ?></span>
            <h3 class="blog-title"><?php echo e($post->title); ?></h3>
            <p class="blog-exc"><?php echo e($post->excerpt); ?></p>
            <div class="blog-meta">
              <span>✍️ <?php echo e($post->author); ?></span>
              <span>📖 <?php echo e($post->read_time ?? '5 min'); ?></span>
            </div>
          </div>
        </article>
      <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); if ($__empty_1): ?>
        <p class="text-muted text-center" style="padding:4rem;grid-column:1/-1">Nenhum artigo publicado ainda.</p>
      <?php endif; ?>
    </div>

    <div id="blog-pagination"></div>
  </div>
</section>
<?php $__env->stopSection(); ?>

<?php $__env->startSection('scripts'); ?>
<script src="/js/data.js" defer></script>
<script src="/js/main.js?v=18" defer></script>
<?php $__env->stopSection(); ?>

<?php echo $__env->make('layouts.app', array_diff_key(get_defined_vars(), ['__data' => 1, '__path' => 1]))->render(); ?><?php /**PATH /var/www/app/resources/views/blog.blade.php ENDPATH**/ ?>