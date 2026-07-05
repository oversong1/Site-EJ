@extends('layouts.app')

@php
function blogCatEmoji($cat) {
    $map = [
        'sistemas' => '🖥', 'sistema' => '🖥', 'saas' => '🖥', 'erp' => '🏢',
        'automação' => '🤖', 'automacoes' => '🤖', 'automação' => '🤖',
        'devops' => '🚀', 'ci/cd' => '🚀', 'docker' => '🐳',
        'api' => '🔌', 'integração' => '🔗', 'webhook' => '📡',
        'mobile' => '📱', 'app' => '📱',
        'site' => '🌐', 'web' => '🌐', 'wordpress' => '🌐',
        'ia' => '🧠', 'chatbot' => '💬', 'inteligência' => '🧠',
        'consultoria' => '💡', 'negócio' => '💡',
        'segurança' => '🛡',
    ];
    $key = strtolower($cat ?? '');
    foreach($map as $k => $v) { if(str_contains($key, $k)) return $v; }
    return '📝';
}
@endphp
@section('title', 'Blog — ' . $settings->get('site_name','EJ Tecnologia'))
@section('description', 'Artigos técnicos sobre PHP, Laravel, automações, IA, DevOps e tecnologia para negócios.')

@section('content')
<section class="hero-sm">
  <div class="container">
    <span class="section-tag">Blog Técnico</span>
    <h1 class="hero-title">{{ $settings->get('blog_hero_title', 'Conteúdo técnico e de negócio') }}</h1>
    <p class="hero-sub">{{ $settings->get('blog_hero_sub', '') }}</p>
  </div>
</section>

<section class="section">
  <div class="container">
    {{-- Filtros por categoria (JS) --}}
    <div id="blog-controls"></div>

    <div class="blog-grid" id="blog-grid">
      @forelse($posts as $post)
        @php $color = $post->color ?? '#6C63FF'; @endphp
        <article class="blog-card reveal" style="border-top:3px solid {{ $color }}"
                 onclick="location.href='{{ route('post', $post->slug) }}'">
          @if($post->image_url)
            <div class="blog-thumb">
              <img src="{{ $post->image_url }}" alt="{{ $post->title }}" loading="lazy" style="width:100%;height:100%;object-fit:cover">
            </div>
          @else
            <div class="blog-thumb" style="background:linear-gradient(135deg,{{ $color }}28,{{ $color }}18);display:flex;align-items:center;justify-content:center">
              <span style="font-size:3rem">{{ blogCatEmoji($post->category) }}</span>
            </div>
          @endif
          <div class="blog-body">
            <span class="blog-cat" style="background:{{ $color }}22;color:{{ $color }}">{{ $post->category }}</span>
            <h3 class="blog-title">{{ $post->title }}</h3>
            <p class="blog-exc">{{ $post->excerpt }}</p>
            <div class="blog-meta">
              <span>✍️ {{ $post->author }}</span>
              <span>📖 {{ $post->read_time ?? '5 min' }}</span>
            </div>
          </div>
        </article>
      @empty
        <p class="text-muted text-center" style="padding:4rem;grid-column:1/-1">Nenhum artigo publicado ainda.</p>
      @endforelse
    </div>

    <div id="blog-pagination"></div>
  </div>
</section>
@endsection

@section('scripts')
<script src="/js/data.js" defer></script>
<script src="/js/main.js?v=20" defer></script>
@endsection
