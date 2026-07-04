<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\TeamMember;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class TeamController extends Controller
{
    public function index()
    {
        return response()->json(TeamMember::where('active', true)->orderBy('order')->get());
    }

    public function update(Request $request, $key)
    {
        $member = TeamMember::where('key', $key)->firstOrFail();

        $data = $request->validate([
            'name'      => 'nullable|string|max:200',
            'role'      => 'nullable|string|max:200',
            'bio'       => 'nullable|string',
            'linkedin'  => 'nullable|string|max:500',
            'photo_url' => 'nullable|string|max:1000',
            'tags'      => 'nullable|array',
            'tags.*'    => 'string|max:50',
        ]);

        $member->update($data);
        return response()->json($member);
    }

    public function uploadPhoto(Request $request, $key)
    {
        $request->validate(['image' => 'required|image|mimes:jpg,jpeg,png,webp|max:5120']);
        $member = TeamMember::where('key', $key)->firstOrFail();

        if ($member->photo_path) {
            Storage::disk('public')->delete($member->photo_path);
        }

        $path = $request->file('image')->store('team', 'public');
        $url  = Storage::url($path);
        $member->update(['photo_path' => $path, 'photo_url' => $url]);
        return response()->json(['url' => $url]);
    }
}
