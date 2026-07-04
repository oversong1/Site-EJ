<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class TeamMember extends Model
{
    protected $fillable = [
        'key', 'name', 'role', 'bio', 'linkedin', 'tags',
        'photo_path', 'photo_url', 'order', 'active',
    ];
    protected $casts = ['active' => 'boolean', 'tags' => 'array'];
}
