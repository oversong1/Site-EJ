<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;

class SettingsController extends Controller
{
    /** Retorna todas as configurações como key => value */
    public function index()
    {
        return response()->json(
            Setting::all()->pluck('value', 'key')
        );
    }

    /** Salva/atualiza configurações */
    public function update(Request $request)
    {
        $request->validate([
            'group'  => 'nullable|string',
            'values' => 'required|array',
        ]);

        foreach ($request->values as $key => $value) {
            Setting::updateOrCreate(
                ['key' => $key],
                ['value' => $value, 'group' => $request->group ?? 'general']
            );
        }

        return response()->json(['message' => 'Configurações salvas.']);
    }
}
