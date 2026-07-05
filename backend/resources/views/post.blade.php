@extends('layouts.app')

@php
function blogCatEmoji($cat) {
    $map = ['sistemas'=>'🖥','sistema'=>'🖥','saas'=>'🖥','erp'=>'🏢','automação'=>'🤖','automacoes'=>'🤖','devops'=>'🚀','api'=>'🔌','integração'=>'🔗','mobile'=>'📱','site'=>'🌐','web'=>'🌐','ia'=>'🧠','chatbot'=>'💬','consultoria'=>'💡'];
    $key = strtolower($cat ?? '');
    foreach($map as $k=>$v){if(str_contains($key,$k))return $v;}return '📝';
}
@endphp
@section('title', $post->title . ' — ' . $settings->get('site_name','EJ Tecnologia'))
@section('description', $post->excerpt ?? '')

@section('og')
<meta property="og:type"        content="article">
<meta property="og:url"         content="{{ url()->current() }}">
<meta property="og:title"       content="{{ $post->title }}">
<meta property="og:description" content="{{ $post->excerpt }}">
@if($post->image_url)
<meta property="og:image"       content="{{ $post->image_url }}">
@endif
@endsection

@section('content')
<div class="container" style="max-width:800px;margin:5rem auto">
  <div class="post-wrap">
    <a href="{{ route('blog') }}" style="display:inline-flex;align-items:center;gap:.4rem;color:var(--text-mut);font-size:.875rem;margin-bottom:2rem">← Voltar ao blog</a>

    <span class="post-cat-big">{{ $post->category }}</span>
    <h1 style="font-size:clamp(1.75rem,4vw,2.8rem);margin-bottom:1.25rem;line-height:1.15">{{ $post->title }}</h1>

    <div style="display:flex;gap:1.5rem;flex-wrap:wrap;margin-bottom:2.5rem;font-size:.82rem;color:var(--text-mut)">
      <span>✍️ {{ $post->author }}</span>
      <span>📅 {{ \Carbon\Carbon::parse($post->date ?? $post->created_at)->format('d/m/Y') }}</span>
      <span>📖 {{ $post->read_time ?? '5 min' }} de leitura</span>
    </div>

    @if($post->image_url)
      <img src="{{ $post->image_url }}" alt="{{ $post->title }}" loading="lazy"
           style="width:100%;border-radius:var(--radius-lg);margin-bottom:2.5rem;max-height:320px;object-fit:cover">
    @else
      @php $color = $post->color ?? '#6C63FF'; @endphp
      <div class="blog-thumb" style="border-radius:var(--radius-lg);margin-bottom:2.5rem;height:220px;background:linear-gradient(135deg,{{ $color }}28,{{ $color }}18);display:flex;align-items:center;justify-content:center">
        <span style="font-size:4rem">{{ blogCatEmoji($post->category) }}</span>
      </div>
    @endif

    <div class="post-content">{!! $post->content !!}</div>

    <div class="divider"></div>
    <div style="text-align:center;padding:1rem 0 2rem">
      <a href="{{ route('blog') }}" class="btn btn-secondary">← Ver todos os artigos</a>
    </div>
  </div>
</div>
@endsection
