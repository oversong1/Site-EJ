<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Banner extends Model
{
    protected $fillable = [
        'title', 'subtitle', 'cta_text', 'cta_link',
        'cta2_text', 'cta2_link', 'image_path', 'image_url',
        'layout', 'stats', 'active', 'order',
    ];

    protected $casts = ['active' => 'boolean', 'stats' => 'array'];
}
