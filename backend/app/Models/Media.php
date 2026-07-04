<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Media extends Model
{
    protected $fillable = ['name', 'path', 'url', 'size', 'context', 'alt_text', 'file_hash', 'width', 'height'];
    protected $casts = ['width' => 'integer', 'height' => 'integer'];
}
