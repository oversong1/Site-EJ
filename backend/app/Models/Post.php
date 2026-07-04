<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $fillable = [
        'title', 'slug', 'category', 'excerpt', 'content',
        'author', 'read_time', 'color', 'image_path', 'image_url',
        'published', 'date',
    ];

    protected $casts = ['published' => 'boolean'];
}
