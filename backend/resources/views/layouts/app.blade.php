<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>@yield('title', 'EJ Tecnologia')</title>
  <meta name="description" content="@yield('description', 'Desenvolvemos sistemas SaaS, ERPs, automações, APIs, sites e aplicativos.')">
  @yield('og')
  <link rel="preload" href="/css/style.css" as="style">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/css/style.css">
  <link rel="icon" type="image/png" href="/favicon.png">
  <meta name="theme-color" content="{{ $settings->get('--primary', '#6C63FF') }}">
  {{-- Cores do banco aplicadas diretamente no :root — sem JS, sem flash --}}
  <style>
    :root {
      @foreach(['--primary','--primary-light','--secondary','--accent','--success','--bg','--surface','--surface2','--text','--text-sec','--text-mut'] as $var)
        @if($settings->get($var)) {{ $var }}: {{ $settings->get($var) }}; @endif
      @endforeach
    }
  </style>
</head>
<body>

@include('partials.header')

@yield('content')

@include('partials.footer')

<script src="/js/icons.js" defer></script>
<script src="/js/config.js" defer></script>
@yield('scripts')
</body>
</html>
