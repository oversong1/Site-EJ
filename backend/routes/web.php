<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ServicosController;
use App\Http\Controllers\BlogController;

/*
|--------------------------------------------------------------------------
| EJ Tecnologia — Web Routes (server-side rendering com Blade)
|--------------------------------------------------------------------------
*/

// Páginas públicas — PHP lê o banco e entrega HTML pronto
Route::get('/',          [HomeController::class,     'index'])->name('home');
Route::get('/servicos',  [ServicosController::class, 'index'])->name('servicos');
Route::get('/blog',      [BlogController::class,     'index'])->name('blog');
Route::get('/blog/{slug}', [BlogController::class,    'show'])->name('post');

// Admin panel — SPA em HTML/JS que usa a API
Route::get('/admin', function () {
    return response()->file(public_path('admin.html'));
})->name('admin');

// Health check
Route::get('/up', function () {
    return response()->json(['status' => 'ok']);
});
