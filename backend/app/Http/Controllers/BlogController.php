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

    public function show($id)
    {
        $post     = Post::where('published', true)->findOrFail($id);
        $settings = Setting::all()->pluck('value', 'key');
        return view('post', compact('post', 'settings'));
    }
}
