<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Banner;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class BannerController extends Controller
{
    /** Retorna apenas banners ativos (público) */
    public function active()
    {
        return response()->json(
            Banner::where('active', true)->orderBy('order')->get()
        );
    }

    /** Retorna todos os banners (admin) */
    public function index()
    {
        return response()->json(Banner::orderBy('order')->get());
    }

    /** Cria novo banner */
    public function store(Request $request)
    {
        $data = $request->validate([
            'title'     => 'required|string|max:255',
            'subtitle'  => 'required|string',
            'cta_text'  => 'nullable|string|max:100',
            'cta_link'  => 'nullable|string|max:500',
            'cta2_text' => 'nullable|string|max:100',
            'cta2_link' => 'nullable|string|max:500',
            'image_url' => 'nullable|string|max:1000',
            'layout'    => 'nullable|in:background,right,left',
            'stats'     => 'nullable|array',
            'active'    => 'boolean',
            'order'     => 'nullable|integer',
        ]);

        $banner = Banner::create($data);
        return response()->json($banner, 201);
    }

    /** Atualiza banner */
    public function update(Request $request, $id)
    {
        $banner = Banner::findOrFail($id);

        $data = $request->validate([
            'title'     => 'sometimes|required|string|max:255',
            'subtitle'  => 'sometimes|required|string',
            'cta_text'  => 'nullable|string|max:100',
            'cta_link'  => 'nullable|string|max:500',
            'cta2_text' => 'nullable|string|max:100',
            'cta2_link' => 'nullable|string|max:500',
            'image_url' => 'nullable|string|max:1000',
            'layout'    => 'nullable|in:background,right,left',
            'stats'     => 'nullable|array',
            'active'    => 'boolean',
            'order'     => 'nullable|integer',
        ]);

        $banner->update($data);
        return response()->json($banner);
    }

    /** Exclui banner */
    public function destroy($id)
    {
        $banner = Banner::findOrFail($id);
        if ($banner->image_path) {
            Storage::disk('public')->delete($banner->image_path);
        }
        $banner->delete();
        return response()->json(['message' => 'Banner excluído.']);
    }

    /** Upload de imagem para o banner */
    public function uploadImage(Request $request, $id)
    {
        $request->validate(['image' => 'required|image|mimes:jpg,jpeg,png,webp|max:5120']);
        $banner = Banner::findOrFail($id);

        // Remove imagem anterior
        if ($banner->image_path) {
            Storage::disk('public')->delete($banner->image_path);
        }

        $path = $request->file('image')->store('banners', 'public');
        $url  = Storage::url($path);

        $banner->update(['image_path' => $path, 'image_url' => $url]);
        return response()->json(['url' => $url, 'path' => $path]);
    }
}
