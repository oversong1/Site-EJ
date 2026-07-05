<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>@yield('title', 'EJ Tecnologia')</title>
  <meta name="description" content="@yield('description', 'Desenvolvemos sistemas SaaS, ERPs, automações, APIs, sites e aplicativos.')">
  @yield('og')
  <link rel="preload" href="/css/style.css?v=2" as="style">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/css/style.css?v=2">
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

{{-- Botão WhatsApp flutuante (visível só no mobile) --}}
@php $wppFloat = $settings->get('contact_whatsapp', '5511999999999'); $wppFloatUrl = 'https://wa.me/' . preg_replace('/\D/', '', $wppFloat); @endphp
<a href="{{ $wppFloatUrl }}" class="wpp-float" target="_blank" aria-label="WhatsApp">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"><path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/></svg>
</a>
</body>
</html>
