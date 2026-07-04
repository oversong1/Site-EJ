<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BannerController;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\SettingsController;
use App\Http\Controllers\Api\TeamController;
use App\Http\Controllers\Api\MediaController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\ServiceCardController;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\SitemapController;
use App\Http\Middleware\RequireAdmin;
use App\Http\Middleware\RequireEditor;

/*
|--------------------------------------------------------------------------
| EJ Tecnologia — API Routes
| Roles: admin (tudo) | colaborador (conteúdo, sem usuários)
|--------------------------------------------------------------------------
*/

// ── Públicas
Route::post('/auth/login',  [AuthController::class, 'login']);
Route::post('/contact',      [ContactController::class, 'send']);
Route::get('/sitemap.xml',   [SitemapController::class, 'index']);  // Sitemap dinâmico
Route::get('/sitemap/info',  [SitemapController::class, 'json']);   // Info para o admin        // Formulário de contato público

// ── Autenticadas
Route::middleware('auth:sanctum')->group(function () {

    Route::post('/auth/logout', [AuthController::class, 'logout']);

    Route::get('/auth/me', function (\Illuminate\Http\Request $req) {
        return response()->json($req->user()->only('id', 'name', 'email', 'role'));
    });

    // Admin e colaborador — conteúdo do site
    Route::middleware(RequireEditor::class)->group(function () {
        Route::get   ('/banners/all',        [BannerController::class, 'index']);
        Route::post  ('/banners',            [BannerController::class, 'store']);
        Route::put   ('/banners/{id}',       [BannerController::class, 'update']);
        Route::delete('/banners/{id}',       [BannerController::class, 'destroy']);
        Route::post  ('/banners/{id}/image', [BannerController::class, 'uploadImage']);

        Route::post  ('/posts',              [PostController::class, 'store']);
        Route::put   ('/posts/{id}',         [PostController::class, 'update']);
        Route::delete('/posts/{id}',         [PostController::class, 'destroy']);
        Route::post  ('/posts/{id}/image',   [PostController::class, 'uploadImage']);

        Route::put   ('/settings',           [SettingsController::class, 'update']);

        Route::put   ('/team/{key}',         [TeamController::class, 'update']);
        Route::post  ('/team/{key}/photo',   [TeamController::class, 'uploadPhoto']);

        Route::post  ('/media/upload',       [MediaController::class, 'upload']);
        Route::get   ('/media',              [MediaController::class, 'index']);
        Route::delete('/media/{id}',         [MediaController::class, 'destroy']);
        Route::put   ('/media/{id}',         [MediaController::class, 'update']);  // Atualiza alt_text

        // Cards de serviços dinâmicos (all já é público acima, só escrita requer auth)
        Route::post  ('/service-cards',         [ServiceCardController::class, 'store']);
        Route::put   ('/service-cards/reorder', [ServiceCardController::class, 'reorder']);
        Route::put   ('/service-cards/{id}',    [ServiceCardController::class, 'update']);
        Route::delete('/service-cards/{id}',    [ServiceCardController::class, 'destroy']);
    });

    // Somente Admin — gerenciar usuários
    Route::middleware(RequireAdmin::class)->group(function () {
        Route::post('/contact/test', [ContactController::class, 'test']); // Teste SMTP
        Route::get   ('/users',      [UserController::class, 'index']);
        Route::post  ('/users',      [UserController::class, 'store']);
        Route::put   ('/users/{id}', [UserController::class, 'update']);
        Route::delete('/users/{id}', [UserController::class, 'destroy']);
    });
});

// ── Cards de serviços (público)
Route::get('/service-cards',     [ServiceCardController::class, 'index']);
Route::get('/service-cards/all', [ServiceCardController::class, 'all']);   // público: admin usa mas não é sensível

// ── Públicas (sem token)
Route::get('/banners',      [BannerController::class, 'active']);
Route::get('/posts',        [PostController::class, 'index']);
Route::get('/posts/{id}',   [PostController::class, 'show']);
Route::get('/settings',     [SettingsController::class, 'index']);
Route::get('/team',         [TeamController::class, 'index']);
