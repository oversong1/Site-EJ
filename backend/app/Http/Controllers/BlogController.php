<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Setting;

class BlogController extends Controller
{
    public function index()
    {
        $posts    = Post::where('published', true)->orderByDesc('created_at')->get();
        $settings = Setting::all()->pluck('value', 'key');
        return view('blog', compact('posts', 'settings'));
    }

    public function show($slug)
    {
        // Aceita slug ou ID (compatibilidade)
        $post = Post::where('published', true)
            ->where(function($q) use ($slug) {
                $q->where('slug', $slug)->orWhere('id', is_numeric($slug) ? $slug : 0);
            })
            ->firstOrFail();
        $settings = Setting::all()->pluck('value', 'key');
        return view('post', compact('post', 'settings'));
    }
}
