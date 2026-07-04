<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;

class UserController extends Controller
{
    /** Lista todos os usuários (somente admin pode chamar) */
    public function index()
    {
        return response()->json(
            User::select('id', 'name', 'email', 'role', 'created_at')->get()
        );
    }

    /** Cria novo usuário */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name'     => 'required|string|max:150',
            'email'    => 'required|email|unique:users,email',
            'role'     => 'required|in:admin,colaborador',
            'password' => [
                'required',
                'confirmed',             // precisa de password_confirmation no body
                Password::min(8)
                    ->mixedCase()        // ao menos 1 maiúscula + 1 minúscula
                    ->symbols(),         // ao menos 1 caractere especial
            ],
        ], [
            'password.min'        => 'A senha deve ter no mínimo 8 caracteres.',
            'password.mixed_case' => 'A senha deve conter letras maiúsculas e minúsculas.',
            'password.symbols'    => 'A senha deve conter ao menos um caractere especial (!@#$%...).',
            'email.unique'        => 'Este e-mail já está cadastrado.',
        ]);

        $user = User::create([
            'name'     => $data['name'],
            'email'    => $data['email'],
            'role'     => $data['role'],
            'password' => Hash::make($data['password']),
        ]);

        return response()->json(
            $user->only('id', 'name', 'email', 'role', 'created_at'),
            201
        );
    }

    /** Atualiza usuário (não pode rebaixar o próprio papel) */
    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        // Admin não pode rebaixar a si mesmo
        if ($request->user()->id == $id && isset($request->role) && $request->role !== 'admin') {
            return response()->json(['message' => 'Você não pode alterar seu próprio nível de acesso.'], 403);
        }

        $rules = [
            'name'  => 'sometimes|required|string|max:150',
            'email' => 'sometimes|required|email|unique:users,email,' . $id,
            'role'  => 'sometimes|required|in:admin,colaborador',
        ];

        // Senha é opcional na edição — só valida se fornecida
        if ($request->filled('password')) {
            $rules['password'] = [
                'required',
                'confirmed',
                Password::min(8)->mixedCase()->symbols(),
            ];
        }

        $data = $request->validate($rules);

        if (isset($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        }

        $user->update($data);

        return response()->json($user->only('id', 'name', 'email', 'role', 'created_at'));
    }

    /** Exclui usuário (não pode excluir a si mesmo) */
    public function destroy(Request $request, $id)
    {
        if ($request->user()->id == $id) {
            return response()->json(['message' => 'Você não pode excluir a sua própria conta.'], 403);
        }

        User::findOrFail($id)->delete();
        return response()->json(['message' => 'Usuário excluído.']);
    }
}
