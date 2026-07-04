<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| EJ Tecnologia — Web Routes
|--------------------------------------------------------------------------
| As rotas da API estão em routes/api.php.
| Deixe uma rota simples para confirmar que o Laravel está funcionando.
|--------------------------------------------------------------------------
*/

Route::get('/', function () {
    return response()->json([
        'app'    => 'EJ Tecnologia API',
        'status' => 'online',
        'docs'   => 'Use /api/* para as rotas da API.',
    ]);
});

Route::get('/up', function () {
    return response()->json(['status' => 'ok', 'timestamp' => now()->toISOString()]);
});
