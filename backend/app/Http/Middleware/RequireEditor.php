<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class RequireEditor
{
    public function handle(Request $request, Closure $next)
    {
        if (!in_array($request->user()?->role, ['admin', 'colaborador'])) {
            return response()->json(['message' => 'Acesso negado.'], 403);
        }
        return $next($request);
    }
}
