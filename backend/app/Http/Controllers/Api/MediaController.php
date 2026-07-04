<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Media;
use App\Models\Banner;
use App\Models\Post;
use App\Models\TeamMember;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class MediaController extends Controller
{
    /** Upload genérico de imagem com detecção de duplicatas */
    public function upload(Request $request)
    {
        $request->validate([
            'image'    => 'required|image|mimes:jpg,jpeg,png,webp,gif|max:5120',
            'context'  => 'nullable|string|max:50',
            'alt_text' => 'nullable|string|max:300',
        ]);

        $file    = $request->file('image');
        $context = $request->context ?? 'general';

        // Detecta duplicata por hash MD5 do conteúdo
        $hash = md5_file($file->getRealPath());
        $existing = Media::where('file_hash', $hash)->first();
        if ($existing) {
            return response()->json([
                'duplicate' => true,
                'message'   => 'Esta imagem já foi enviada antes.',
                'url'       => $existing->url,
                'id'        => $existing->id,
                'name'      => $existing->name,
            ], 200);
        }

        $path = $file->store("uploads/{$context}", 'public');
        $url  = Storage::url($path);

        // Tenta obter dimensões
        [$width, $height] = @getimagesize($file->getRealPath()) ?: [null, null];

        $media = Media::create([
            'name'     => $file->getClientOriginalName(),
            'path'     => $path,
            'url'      => $url,
            'size'     => $file->getSize(),
            'context'  => $context,
            'alt_text' => $request->alt_text ?? null,
            'file_hash'=> $hash,
            'width'    => $width,
            'height'   => $height,
        ]);

        return response()->json([
            'url'  => $url,
            'id'   => $media->id,
            'name' => $media->name,
        ], 201);
    }

    /** Lista todas as mídias com info de uso */
    public function index()
    {
        $medias = Media::orderByDesc('created_at')->get();
        $usage  = $this->buildUsageMap();

        return response()->json($medias->map(function ($m) use ($usage) {
            $used_in = $usage[$m->url] ?? [];
            return [
                'id'        => $m->id,
                'name'      => $m->name,
                'url'       => $m->url,
                'size'      => $m->size,
                'alt_text'  => $m->alt_text,
                'file_hash' => $m->file_hash,
                'width'     => $m->width,
                'height'    => $m->height,
                'context'   => $m->context,
                'created_at'=> $m->created_at,
                'used_in'   => $used_in,          // array com onde está sendo usada
                'in_use'    => count($used_in) > 0,
            ];
        }));
    }

    /** Atualiza alt_text de uma mídia */
    public function update(Request $request, $id)
    {
        $media = Media::findOrFail($id);
        $data  = $request->validate(['alt_text' => 'nullable|string|max:300']);
        $media->update($data);
        return response()->json($media);
    }

    /** Exclui mídia */
    public function destroy($id)
    {
        $media = Media::findOrFail($id);
        Storage::disk('public')->delete($media->path);
        $media->delete();
        return response()->json(['message' => 'Imagem excluída.']);
    }

    /**
     * Constrói um mapa de uso: url → [lista de onde é usada]
     * Varre banners, posts, team_members e settings.
     */
    private function buildUsageMap(): array
    {
        $map = [];

        // Banners
        foreach (Banner::all() as $b) {
            if ($b->image_url) {
                $map[$b->image_url][] = ['type' => 'banner', 'label' => 'Banner: ' . mb_substr($b->title, 0, 40)];
            }
        }

        // Posts
        foreach (Post::all() as $p) {
            if ($p->image_url) {
                $map[$p->image_url][] = ['type' => 'post', 'label' => 'Post: ' . mb_substr($p->title, 0, 40)];
            }
        }

        // Equipe
        foreach (TeamMember::all() as $t) {
            if ($t->photo_url) {
                $map[$t->photo_url][] = ['type' => 'team', 'label' => 'Equipe: ' . $t->name];
            }
        }

        // Settings (URLs que podem referenciar imagens)
        foreach (Setting::where('value', 'LIKE', '%/storage/uploads/%')->get() as $s) {
            $map[$s->value][] = ['type' => 'setting', 'label' => 'Config: ' . $s->key];
        }

        return $map;
    }
}
