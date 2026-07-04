<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Models\ServiceCard;
use Illuminate\Http\Request;

class ServiceCardController extends Controller
{
    public function index()
    {
        return response()->json(ServiceCard::where('active', true)->orderBy('order')->get());
    }

    public function all()
    {
        return response()->json(ServiceCard::orderBy('order')->get());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'icon'        => 'nullable|string|max:50',
            'title'       => 'required|string|max:200',
            'description' => 'required|string',
            'tags'        => 'nullable|array',
            'tags.*'      => 'string|max:50',
            'link'        => 'nullable|string|max:500',
            'active'      => 'boolean',
            'order'       => 'nullable|integer',
            'section'     => 'nullable|string|max:50',
        ]);
        return response()->json(ServiceCard::create($data), 201);
    }

    public function update(Request $request, $id)
    {
        $card = ServiceCard::findOrFail($id);
        $data = $request->validate([
            'icon'        => 'nullable|string|max:50',
            'title'       => 'sometimes|required|string|max:200',
            'description' => 'sometimes|required|string',
            'tags'        => 'nullable|array',
            'tags.*'      => 'string|max:50',
            'link'        => 'nullable|string|max:500',
            'active'      => 'boolean',
            'order'       => 'nullable|integer',
            'section'     => 'nullable|string|max:50',
        ]);
        $card->update($data);
        return response()->json($card);
    }

    public function destroy($id)
    {
        ServiceCard::findOrFail($id)->delete();
        return response()->json(['message' => 'Card excluído.']);
    }

    public function reorder(Request $request)
    {
        $request->validate(['order' => 'required|array', 'order.*' => 'integer']);
        foreach ($request->order as $idx => $id) {
            ServiceCard::where('id', $id)->update(['order' => $idx]);
        }
        return response()->json(['message' => 'Ordem salva.']);
    }
}
