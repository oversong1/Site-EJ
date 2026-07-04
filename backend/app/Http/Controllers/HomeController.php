<?php

namespace App\Http\Controllers;

use App\Models\Banner;
use App\Models\ServiceCard;
use App\Models\TeamMember;
use App\Models\Post;
use App\Models\Setting;

class HomeController extends Controller
{
    public function index()
    {
        $banners = Banner::where('active', true)->orderBy('order')->get();
        $cards   = ServiceCard::whereIn('section', ['both', 'home'])->where('active', true)->orderBy('order')->get();
        $team    = TeamMember::where('active', true)->orderBy('order')->get();
        $posts   = Post::where('published', true)->orderByDesc('created_at')->take(3)->get();
        $settings = Setting::all()->pluck('value', 'key');

        return view('home', compact('banners', 'cards', 'team', 'posts', 'settings'));
    }
}
