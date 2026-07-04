<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><?php echo $__env->yieldContent('title', 'EJ Tecnologia'); ?></title>
  <meta name="description" content="<?php echo $__env->yieldContent('description', 'Desenvolvemos sistemas SaaS, ERPs, automações, APIs, sites e aplicativos.'); ?>">
  <?php echo $__env->yieldContent('og'); ?>
  <link rel="preload" href="/css/style.css" as="style">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/css/style.css">
  <link rel="icon" type="image/png" href="/favicon.png">
  <meta name="theme-color" content="<?php echo e($settings->get('--primary', '#6C63FF')); ?>">
  
  <style>
    :root {
      <?php $__currentLoopData = ['--primary','--primary-light','--secondary','--accent','--success','--bg','--surface','--surface2','--text','--text-sec','--text-mut']; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $var): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
        <?php if($settings->get($var)): ?> <?php echo e($var); ?>: <?php echo e($settings->get($var)); ?>; <?php endif; ?>
      <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
    }
  </style>
</head>
<body>

<?php echo $__env->make('partials.header', array_diff_key(get_defined_vars(), ['__data' => 1, '__path' => 1]))->render(); ?>

<?php echo $__env->yieldContent('content'); ?>

<?php echo $__env->make('partials.footer', array_diff_key(get_defined_vars(), ['__data' => 1, '__path' => 1]))->render(); ?>

<script src="/js/icons.js" defer></script>
<script src="/js/config.js" defer></script>
<?php echo $__env->yieldContent('scripts'); ?>
</body>
</html>
<?php /**PATH /var/www/app/resources/views/layouts/app.blade.php ENDPATH**/ ?>