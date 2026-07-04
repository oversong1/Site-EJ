<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    /**
     * Login — cria token Sanctum real (salvo na tabela personal_access_tokens).
     * Isso é necessário para que auth:sanctum funcione corretamente.
     */
    public function login(Request $request)
    {
        $request->validate([
            'password' => 'required|string',
            'email'    => 'nullable|string|email',
        ]);

        // Suporta login por email (novo padrão) ou fallback para ADMIN_EMAIL do .env (legado)
        $email = $request->input('email') ?: env('ADMIN_EMAIL', 'admin@ejtecnologia.com.br');
        $user  = User::where('email', $email)->first();

        if (!$user) {
            return response()->json(['message' => 'E-mail ou senha incorretos.'], 401);
        }

        // Verifica senha com bcrypt
        if (!Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'E-mail ou senha incorretos.'], 401);
        }

        // Revoga todos os tokens anteriores (uma sessão ativa por vez)
        $user->tokens()->delete();

        // Cria token Sanctum REAL — salvo na tabela personal_access_tokens
        $token = $user->createToken(
            name:      'admin-panel',
            abilities: ['*'],
            expiresAt: now()->addHours(8),
        );

        return response()->json([
            'message' => 'Login realizado com sucesso.',
            'token'   => $token->plainTextToken,
            'role'    => $user->role,
            'name'    => $user->name,
            'email'   => $user->email,
        ]);
    }

    /**
     * Logout — invalida o token atual no banco.
     */
    public function logout(Request $request)
    {
        $request->user()?->currentAccessToken()?->delete();
        return response()->json(['message' => 'Logout realizado.']);
    }
}
