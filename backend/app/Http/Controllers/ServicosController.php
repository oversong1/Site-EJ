<?php

namespace App\Http\Controllers;

use App\Models\ServiceCard;
use App\Models\Setting;

class ServicosController extends Controller
{
    public function index()
    {
        $sections = ['both', 'sistemas', 'sites', 'apis', 'automacoes', 'devops'];
        $cards = [];
        foreach ($sections as $s) {
            $cards[$s] = ServiceCard::where('section', $s)->where('active', true)->orderBy('order')->get();
        }
        $settings = Setting::all()->pluck('value', 'key');

        return view('servicos', compact('cards', 'settings'));
    }
}
