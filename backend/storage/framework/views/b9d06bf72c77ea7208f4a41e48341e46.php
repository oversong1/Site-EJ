<?php
function blogCatEmoji($cat) {
    $map = ['sistemas'=>'🖥','sistema'=>'🖥','saas'=>'🖥','erp'=>'🏢','automação'=>'🤖','automacoes'=>'🤖','devops'=>'🚀','api'=>'🔌','integração'=>'🔗','mobile'=>'📱','site'=>'🌐','web'=>'🌐','ia'=>'🧠','chatbot'=>'💬','consultoria'=>'💡'];
    $key = strtolower($cat ?? '');
    foreach($map as $k=>$v){if(str_contains($key,$k))return $v;}return '📝';
}
?>
<?php $__env->startSection('title', $post->title . ' — ' . $settings->get('site_name','EJ Tecnologia')); ?>
<?php $__env->startSection('description', $post->excerpt ?? ''); ?>

<?php $__env->startSection('og'); ?>
<meta property="og:type"        content="article">
<meta property="og:url"         content="<?php echo e(url()->current()); ?>">
<meta property="og:title"       content="<?php echo e($post->title); ?>">
<meta property="og:description" content="<?php echo e($post->excerpt); ?>">
<?php if($post->image_url): ?>
<meta property="og:image"       content="<?php echo e($post->image_url); ?>">
<?php endif; ?>
<?php $__env->stopSection(); ?>

<?php $__env->startSection('content'); ?>
<div class="container" style="max-width:800px;margin:5rem auto">
  <div class="post-wrap">
    <a href="<?php echo e(route('blog')); ?>" style="display:inline-flex;align-items:center;gap:.4rem;color:var(--text-mut);font-size:.875rem;margin-bottom:2rem">← Voltar ao blog</a>

    <span class="post-cat-big"><?php echo e($post->category); ?></span>
    <h1 style="font-size:clamp(1.75rem,4vw,2.8rem);margin-bottom:1.25rem;line-height:1.15"><?php echo e($post->title); ?></h1>

    <div style="display:flex;gap:1.5rem;flex-wrap:wrap;margin-bottom:2.5rem;font-size:.82rem;color:var(--text-mut)">
      <span>✍️ <?php echo e($post->author); ?></span>
      <span>📅 <?php echo e(\Carbon\Carbon::parse($post->date ?? $post->created_at)->format('d/m/Y')); ?></span>
      <span>📖 <?php echo e($post->read_time ?? '5 min'); ?> de leitura</span>
    </div>

    <?php if($post->image_url): ?>
      <img src="<?php echo e($post->image_url); ?>" alt="<?php echo e($post->title); ?>" loading="lazy"
           style="width:100%;border-radius:var(--radius-lg);margin-bottom:2.5rem;max-height:320px;object-fit:cover">
    <?php else: ?>
      <?php $color = $post->color ?? '#6C63FF'; ?>
      <div class="blog-thumb" style="border-radius:var(--radius-lg);margin-bottom:2.5rem;height:220px;background:linear-gradient(135deg,<?php echo e($color); ?>28,<?php echo e($color); ?>18);display:flex;align-items:center;justify-content:center">
        <span style="font-size:4rem"><?php echo e(blogCatEmoji($post->category)); ?></span>
      </div>
    <?php endif; ?>

    <div class="post-content"><?php echo $post->content; ?></div>

    <div class="divider"></div>
    <div style="text-align:center;padding:1rem 0 2rem">
      <a href="<?php echo e(route('blog')); ?>" class="btn btn-secondary">← Ver todos os artigos</a>
    </div>
  </div>
</div>
<?php $__env->stopSection(); ?>

<?php echo $__env->make('layouts.app', array_diff_key(get_defined_vars(), ['__data' => 1, '__path' => 1]))->render(); ?><?php /**PATH /var/www/app/resources/views/post.blade.php ENDPATH**/ ?>