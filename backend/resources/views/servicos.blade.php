@extends('layouts.app')
@section('title', 'Serviços — ' . $settings->get('site_name','EJ Tecnologia'))
@section('description', 'Sistemas, sites, e-commerce, APIs, automações, chatbots, CI/CD e consultoria de TI.')

@php
function renderCards($cardList) {
    $html = '';
    foreach($cardList as $card) {
        $tags = is_array($card->tags) ? $card->tags : (json_decode($card->tags ?? '[]', true) ?: []);
        $icon = $card->icon ?? '🖥';
        $isSvg = str_starts_with($icon, '[svg:');
        $svgId = $isSvg ? substr($icon, 5, -1) : '';
        $tagsHtml = '';
        foreach($tags as $t) $tagsHtml .= '<span class="service-tag">'.e($t).'</span>';
        $iconHtml = $isSvg
            ? '<svg style="width:28px;height:28px;fill:currentColor"><use href="#'.$svgId.'"/></svg>'
            : e($icon);
        $html .= '<div class="service-card reveal">'
            . '<div class="service-icon-wrap" style="font-size:1.6rem">'.$iconHtml.'</div>'
            . '<div class="service-title">'.e($card->title).'</div>'
            . '<p class="service-desc">'.e($card->description).'</p>'
            . ($tagsHtml ? '<div class="service-tags">'.$tagsHtml.'</div>' : '')
            . '</div>';
    }
    return $html;
}
@endphp

@section('content')
{{-- Hero --}}
<section class="hero-sm">
  <div class="container">
    <h1 class="hero-title">{{ $settings->get('serv_hero_title', 'Tecnologia certa para cada problema') }}</h1>
    <p class="hero-sub">{{ $settings->get('serv_hero_sub', '') }}</p>
  </div>
</section>

{{-- Cards topo (both) --}}
@if($cards['both']->count())
<section class="section" id="servicos">
  <div class="container">
    <div class="services-grid">{!! renderCards($cards['both']) !!}</div>
  </div>
</section>
@endif

@foreach([
  ['sistemas',   'serv_s1_title', 'Desenvolvimento de Sistemas Web',   'serv_s1_sub'],
  ['sites',      'serv_s2_title', 'Sites e E-commerce',                'serv_s2_sub'],
  ['apis',       'serv_s3_title', 'Integrações e APIs',                'serv_s3_sub'],
  ['automacoes', 'serv_s4_title', 'Automações e Processos',            null],
  ['devops',     'serv_s5_title', 'CI/CD e Boas Práticas',             null],
] as [$sec, $tKey, $tDefault, $sKey])
  @if($cards[$sec]->count())
  <section class="section" style="background:var(--surface3)">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">{{ $settings->get($tKey, $tDefault) }}</h2>
        @if($sKey && $settings->get($sKey))
          <p class="section-subtitle">{{ $settings->get($sKey) }}</p>
        @endif
      </div>
      <div class="services-grid">{!! renderCards($cards[$sec]) !!}</div>
    </div>
  </section>
  @endif
@endforeach

{{-- CTA --}}
@php $wppUrl = 'https://wa.me/' . preg_replace('/\D/', '', $settings->get('contact_whatsapp','5511999999999')); @endphp
<section class="section cta-section">
  <div class="container cta-inner">
    <h2 class="section-title cta-title">{{ $settings->get('serv_cta_title','Qual dessas soluções faz sentido para você?') }}</h2>
    <p class="cta-sub">{{ $settings->get('serv_cta_sub','Em 15 minutos a gente identifica o que resolve.') }}</p>
    <div class="cta-acts">
      <a href="{{ $wppUrl }}" class="btn btn-whatsapp btn-lg" target="_blank">Falar no WhatsApp</a>
      <a href="{{ route('home') }}#contato" class="btn btn-secondary btn-lg">Enviar mensagem</a>
    </div>
  </div>
</section>
@endsection

@section('scripts')
<script src="/js/main.js?v=18" defer></script>
@endsection
