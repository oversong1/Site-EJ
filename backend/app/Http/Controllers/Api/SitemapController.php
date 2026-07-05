<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Models\Setting;
use Illuminate\Http\Request;

class SitemapController extends Controller
{
    /**
     * Gera sitemap.xml dinâmico com todas as páginas + posts publicados.
     * Rota pública: GET /sitemap.xml
     */
    public function index()
    {
        $baseUrl = rtrim(env('APP_URL', 'https://ejtecnologia.com.br'), '/');
        $today   = now()->format('Y-m-d');

        // Busca posts publicados (active = true)
        $posts = Post::where('published', true)
            ->orderByDesc('created_at')
            ->get(['id', 'slug', 'title', 'updated_at', 'created_at']);

        $urls = [];

        // Páginas estáticas
        $staticPages = [
            ['loc' => $baseUrl . '/',               'lastmod' => $today, 'freq' => 'weekly',  'prio' => '1.0'],
            ['loc' => $baseUrl . '/servicos',  'lastmod' => $today, 'freq' => 'monthly', 'prio' => '0.9'],
            ['loc' => $baseUrl . '/blog',       'lastmod' => $today, 'freq' => 'weekly',  'prio' => '0.8'],
        ];

        foreach ($staticPages as $p) {
            $urls[] = $p;
        }

        // Posts do blog
        foreach ($posts as $post) {
            $lastmod = $post->updated_at
                ? $post->updated_at->format('Y-m-d')
                : $post->created_at->format('Y-m-d');

            $urls[] = [
                'loc'     => $baseUrl . '/blog/' . $post->slug,
                'lastmod' => $lastmod,
                'freq'    => 'monthly',
                'prio'    => '0.7',
            ];
        }

        $xml = $this->buildXml($urls);

        return response($xml, 200)
            ->header('Content-Type', 'application/xml; charset=UTF-8')
            ->header('Cache-Control', 'public, max-age=3600'); // cache 1h
    }

    /**
     * Retorna o sitemap como JSON (para o admin baixar/visualizar).
     */
    public function json()
    {
        $baseUrl = rtrim(env('APP_URL', 'https://ejtecnologia.com.br'), '/');
        $posts   = Post::where('published', true)->orderByDesc('created_at')->get(['id', 'updated_at', 'created_at', 'title']);

        return response()->json([
            'generated_at' => now()->toIso8601String(),
            'base_url'     => $baseUrl,
            'total_urls'   => 3 + $posts->count(),
            'posts_count'  => $posts->count(),
            'posts'        => $posts->map(fn($p) => [
                'id'      => $p->id,
                'title'   => $p->title,
                'url'     => $baseUrl . '/blog/' . $p->slug,
                'lastmod' => optional($p->updated_at)->format('Y-m-d'),
            ]),
        ]);
    }

    private function buildXml(array $urls): string
    {
        $entries = '';
        foreach ($urls as $u) {
            $entries .= "  <url>\n";
            $entries .= "    <loc>" . htmlspecialchars($u['loc']) . "</loc>\n";
            $entries .= "    <lastmod>{$u['lastmod']}</lastmod>\n";
            $entries .= "    <changefreq>{$u['freq']}</changefreq>\n";
            $entries .= "    <priority>{$u['prio']}</priority>\n";
            $entries .= "  </url>\n";
        }

        return '<?xml version="1.0" encoding="UTF-8"?>' . "\n"
            . '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n"
            . $entries
            . '</urlset>';
    }
}
