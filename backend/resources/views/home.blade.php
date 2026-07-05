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

@section('title', ($settings->get('site_name','EJ Tecnologia') . ' — Sistemas, Automações e Sites Sob Medida'))
@section('description', 'Desenvolvemos sistemas SaaS, ERPs, automações, APIs, sites e aplicativos. Emerson Souza + Julio Cesar Leal.')

@section('og')
<meta property="og:type"        content="website">
<meta property="og:url"         content="{{ url('/') }}">
<meta property="og:title"       content="{{ $settings->get('site_name','EJ Tecnologia') }} — Sistemas, Automações e Sites Sob Medida">
<meta property="og:description" content="Desenvolvemos sistemas SaaS, ERPs, automações, APIs, sites e aplicativos.">
<meta property="og:image"       content="{{ url('/og-image.png') }}">
<meta property="og:locale"      content="pt_BR">
@endsection

@section('content')

{{-- ── HERO SLIDER ─────────────────────────────────────────── --}}
<section id="slider-wrap" class="hero-slider">
  <div id="slider-slides">
    @foreach($banners as $i => $b)
      @php
        $stats = is_array($b->stats) ? $b->stats : (json_decode($b->stats ?? '[]', true) ?: []);
        $statsHtml = '';
        foreach($stats as $s) {
          if(!empty($s['val'])) $statsHtml .= '<div><div class="hero-stat-val gradient-text">'.e($s['val']).'</div><div class="hero-stat-lbl">'.e($s['lbl'] ?? '').'</div></div>';
        }
      @endphp
      <div class="hero-slide {{ $b->layout ?? 'bg' }} {{ $i === 0 ? 'active' : '' }}"
           @if($b->image_url && ($b->layout ?? 'bg') === 'bg')
             style="background-image:url('{{ $b->image_url }}')"
           @endif>
        <div class="container hero-inner">
          <div class="hero-text">
            @if($b->tag) <span class="section-tag">{{ $b->tag }}</span> @endif
            <h1 class="hero-title anim-fiu d1">{{ $b->title }}</h1>
            <p class="hero-sub anim-fiu d2">{{ $b->subtitle }}</p>
            @if($statsHtml)
              <div class="hero-stats anim-fiu d3">{!! $statsHtml !!}</div>
            @endif
            <div class="hero-acts anim-fiu d4">
              @if($b->cta_text)
                <a href="{{ $b->cta_link ?? '#contato' }}" class="btn btn-primary btn-lg">{{ $b->cta_text }}</a>
              @endif
              @if($b->cta2_text)
                <a href="{{ $b->cta2_link ?? '#servicos' }}" class="btn btn-secondary btn-lg">{{ $b->cta2_text }} &rarr;</a>
              @endif
            </div>
          </div>
          @if($b->image_url && in_array($b->layout ?? 'bg', ['right','left']))
            <div class="hero-img-side">
              <img src="{{ $b->image_url }}" alt="{{ $b->title }}" loading="lazy">
            </div>
          @endif
        </div>
      </div>
    @endforeach
  </div>
  @if($banners->count() > 1)
    <div class="slider-controls" id="slider-dots">
      @foreach($banners as $i => $b)
        <button class="slider-dot {{ $i === 0 ? 'active' : '' }}" data-slide="{{ $i }}"></button>
      @endforeach
    </div>
    <div class="slider-arrows">
      <button class="slider-arrow" id="btn-prev" aria-label="Anterior">&#8592;</button>
      <button class="slider-arrow" id="btn-next" aria-label="Próximo">&#8594;</button>
    </div>
  @endif
</section>

{{-- ── SERVIÇOS ──────────────────────────────────────────────── --}}
<section class="section" id="servicos">
  <div class="container">
    <div class="section-header">
      <span class="section-tag">O que fazemos</span>
      <h2 class="section-title">{{ $settings->get('home_services_title', 'Nossas Soluções') }}</h2>
      <p class="section-subtitle">{{ $settings->get('home_services_sub', 'Do sistema mais simples ao mais complexo.') }}</p>
    </div>
    <div class="services-grid">
      @foreach($cards as $card)
        @php
          $tags = is_array($card->tags) ? $card->tags : (json_decode($card->tags ?? '[]', true) ?: []);
          $icon = $card->icon ?? '🖥';
          $isSvg = str_starts_with($icon, '[svg:');
          $svgId = $isSvg ? substr($icon, 5, -1) : '';
        @endphp
        <div class="service-card reveal">
          <div class="service-icon-wrap" style="font-size:1.6rem">
            @if($isSvg)
              <svg style="width:28px;height:28px;fill:currentColor"><use href="#{{ $svgId }}"/></svg>
            @else
              {{ $icon }}
            @endif
          </div>
          <div class="service-title">{{ $card->title }}</div>
          <p class="service-desc">{{ $card->description }}</p>
          @if($tags)
            <div class="service-tags">
              @foreach($tags as $tag)
                <span class="service-tag">{{ $tag }}</span>
              @endforeach
            </div>
          @endif
        </div>
      @endforeach
    </div>
    <div style="text-align:center;margin-top:2.5rem">
      <a href="{{ route('servicos') }}" class="btn btn-outline btn-lg">Ver todos os serviços &rarr;</a>
    </div>
  </div>
</section>

{{-- ── METODOLOGIA ──────────────────────────────────────────── --}}
<section class="section cta-section">
  <div class="container cta-inner">
    <span class="section-tag">Metodologia</span>
    <h2 class="section-title cta-title">{{ $settings->get('home_method_title', 'Do problema à solução em 4 passos') }}</h2>
    <div class="grid-4 reveal" style="margin-top:2.5rem;text-align:left">
      @foreach([
        ['home_step1_title','home_step1_desc','1. Diagnóstico','Entendemos a dor, o objetivo e o que precisa existir.'],
        ['home_step2_title','home_step2_desc','2. Proposta','Escopo fechado, prazo e valor definidos antes de começar.'],
        ['home_step3_title','home_step3_desc','3. Desenvolvimento','Entregas semanais com CI/CD. Você acompanha o progresso.'],
        ['home_step4_title','home_step4_desc','4. Entrega','Treinamento, documentação e suporte inclusos.'],
      ] as $step)
        <div class="card">
          <div class="card-title">{{ $settings->get($step[0], $step[2]) }}</div>
          <p class="card-text">{{ $settings->get($step[1], $step[3]) }}</p>
        </div>
      @endforeach
    </div>
  </div>
</section>

{{-- ── EQUIPE ───────────────────────────────────────────────── --}}
<section class="section" id="sobre">
  <div class="container">
    <div class="section-header">
      <span class="section-tag">A equipe</span>
      <h2 class="section-title">{{ $settings->get('home_about_title', 'Dev + PM — uma combinação rara') }}</h2>
      <p class="section-subtitle">{{ $settings->get('home_about_sub', '') }}</p>
    </div>
    <div class="team-grid reveal">
      @foreach($team as $member)
        @php $tags = is_array($member->tags) ? $member->tags : (json_decode($member->tags ?? '[]', true) ?: []); @endphp
        <div class="team-card">
          <div class="team-photo">
            @if($member->photo_url)
              <img src="{{ $member->photo_url }}" alt="{{ $member->name }}" loading="lazy" style="width:100%;height:100%;object-fit:cover;border-radius:50%">
            @else
              <svg class="svc-svg" style="width:40px;height:40px;opacity:.5"><use href="#i-user"/></svg>
            @endif
          </div>
          <div class="team-name">{{ $member->name }}</div>
          <div class="team-role">{{ $member->role }}</div>
          <p class="team-bio">{{ $member->bio }}</p>
          @if($tags)
            <div class="team-skills">
              @foreach($tags as $tag)<span class="skill-badge">{{ $tag }}</span>@endforeach
            </div>
          @endif
          @if($member->linkedin)
            <a href="{{ $member->linkedin }}" target="_blank" class="team-li">
              <svg class="icon" style="width:16px;height:16px"><use href="#i-linkedin"/></svg> LinkedIn
            </a>
          @endif
        </div>
      @endforeach
    </div>
  </div>
</section>

{{-- ── STACK ────────────────────────────────────────────────── --}}
@php
  $stackRaw = $settings->get('stack_items', '');
  $stackItems = $stackRaw ? array_filter(array_map('trim', explode('|', $stackRaw))) : [];
@endphp
@if($stackItems)
<section class="section-sm" style="background:var(--surface3);border-top:1px solid var(--border-light);border-bottom:1px solid var(--border-light)">
  <div class="container">
    <div class="section-header" style="margin-bottom:2rem">
      <span class="section-tag">Stack</span>
      <h3 class="section-title">Tecnologias que dominamos</h3>
    </div>
    <div class="stack-wrap reveal">
      @foreach($stackItems as $item)
        <div class="stack-chip">{{ $item }}</div>
      @endforeach
    </div>
  </div>
</section>
@endif

{{-- ── BLOG PREVIEW ─────────────────────────────────────────── --}}
@if($posts->count())
<section class="section">
  <div class="container">
    <div class="section-header">
      <span class="section-tag">Blog Técnico</span>
      <h2 class="section-title">Últimos artigos</h2>
    </div>
    <div class="blog-grid">
      @foreach($posts as $post)
        @php $color = $post->color ?? '#6C63FF'; @endphp
        <article class="blog-card reveal" style="border-top:3px solid {{ $color }}" onclick="location.href='{{ route('post', $post->slug) }}'">
          @if($post->image_url)
            <div class="blog-thumb"><img src="{{ $post->image_url }}" alt="{{ $post->title }}" loading="lazy" style="width:100%;height:100%;object-fit:cover"></div>
          @else
            <div class="blog-thumb" style="background:linear-gradient(135deg,{{ $color }}28,{{ $color }}18);display:flex;align-items:center;justify-content:center">
              <span style="font-size:3rem">{{ blogCatEmoji($post->category) }}</span>
            </div>
          @endif
          <div class="blog-body">
            <span class="blog-cat" style="background:{{ $color }}22;color:{{ $color }}">{{ $post->category }}</span>
            <h3 class="blog-title">{{ $post->title }}</h3>
            <p class="blog-exc">{{ $post->excerpt }}</p>
          </div>
        </article>
      @endforeach
    </div>
    <div style="text-align:center;margin-top:2.5rem">
      <a href="{{ route('blog') }}" class="btn btn-outline">Ver todos os artigos &rarr;</a>
    </div>
  </div>
</section>
@endif

{{-- ── CTA / CONTATO ────────────────────────────────────────── --}}
@php
  $wpp    = $settings->get('contact_whatsapp', '5511999999999');
  $wppUrl = 'https://wa.me/' . preg_replace('/\D/', '', $wpp);
  $email  = $settings->get('contact_email', 'contato@ejtecnologia.com.br');
@endphp
<section class="section cta-section" id="contato">
  <div class="container">
    <div class="cta-inner">
      <span class="section-tag">Vamos conversar</span>
      <h2 class="section-title cta-title">{{ $settings->get('home_cta_title', 'Tem um problema que a tecnologia pode resolver?') }}</h2>
      <p class="cta-sub">{{ $settings->get('home_cta_sub', 'Em 15 minutos você sabe se temos uma solução.') }}</p>

      {{-- Formulário de contato --}}
      <form id="contact-form" data-api="/contact" style="background:rgba(255,255,255,.04);border:1px solid var(--border-light);border-radius:var(--radius);padding:1.75rem;margin:1.5rem auto 2rem;max-width:520px;text-align:left">
        @csrf
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
        <a href="{{ $wppUrl }}" class="btn btn-whatsapp btn-lg" target="_blank">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style="flex-shrink:0;display:inline-block;vertical-align:middle"><path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/></svg> Falar no WhatsApp
        </a>
        <a href="mailto:{{ $email }}" class="btn btn-secondary btn-lg">
          <svg class="icon"><use href="#i-email"/></svg> Enviar e-mail
        </a>
      </div>
    </div>
  </div>
</section>

@endsection

@section('scripts')
<script src="/js/data.js" defer></script>
<script src="/js/main.js?v=18" defer></script>
@endsection
