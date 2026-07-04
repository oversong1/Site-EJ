<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class RequireAdmin
{
    public function handle(Request $request, Closure $next)
    {
        if ($request->user()?->role !== 'admin') {
            return response()->json(['message' => 'Acesso negado. Apenas administradores.'], 403);
        }
        return $next($request);
    }
}
