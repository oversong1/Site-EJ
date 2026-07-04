<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class PostController extends Controller
{
    /** Lista todos os posts publicados */
    public function index()
    {
        return response()->json(
            Post::where('published', true)->orderByDesc('created_at')->get()
        );
    }

    /** Retorna um post pelo ID */
    public function show($id)
    {
        $post = Post::where('published', true)->findOrFail($id);
        return response()->json($post);
    }

    /** Cria novo post */
    public function store(Request $request)
    {
        $data = $request->validate([
            'title'     => 'required|string|max:500',
            'category'  => 'required|string|max:100',
            'excerpt'   => 'nullable|string',
            'content'   => 'required|string',
            'author'    => 'nullable|string|max:150',
            'read_time' => 'nullable|string|max:20',
            'color'     => 'nullable|string|max:20',
            'image_url' => 'nullable|string|max:1000',
            'published' => 'boolean',
        ]);

        $data['slug']      = Str::slug($data['title']);
        $data['published'] = $data['published'] ?? true;
        $data['date']      = now()->toDateString();

        $post = Post::create($data);
        return response()->json($post, 201);
    }

    /** Atualiza post */
    public function update(Request $request, $id)
    {
        $post = Post::findOrFail($id);

        $data = $request->validate([
            'title'     => 'sometimes|required|string|max:500',
            'category'  => 'sometimes|required|string|max:100',
            'excerpt'   => 'nullable|string',
            'content'   => 'sometimes|required|string',
            'author'    => 'nullable|string|max:150',
            'read_time' => 'nullable|string|max:20',
            'color'     => 'nullable|string|max:20',
            'image_url' => 'nullable|string|max:1000',
            'published' => 'boolean',
        ]);

        if (isset($data['title'])) {
            $data['slug'] = Str::slug($data['title']);
        }

        $post->update($data);
        return response()->json($post);
    }

    /** Exclui post */
    public function destroy($id)
    {
        $post = Post::findOrFail($id);
        if ($post->image_path) {
            Storage::disk('public')->delete($post->image_path);
        }
        $post->delete();
        return response()->json(['message' => 'Post excluído.']);
    }

    /** Upload imagem de capa */
    public function uploadImage(Request $request, $id)
    {
        $request->validate(['image' => 'required|image|mimes:jpg,jpeg,png,webp|max:5120']);
        $post = Post::findOrFail($id);

        if ($post->image_path) {
            Storage::disk('public')->delete($post->image_path);
        }

        $path = $request->file('image')->store('posts', 'public');
        $url  = Storage::url($path);
        $post->update(['image_path' => $path, 'image_url' => $url]);
        return response()->json(['url' => $url]);
    }
}
