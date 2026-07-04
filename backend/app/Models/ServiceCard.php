<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class ServiceCard extends Model
{
    protected $fillable = ['icon', 'title', 'description', 'tags', 'link', 'active', 'order', 'section'];
    protected $casts    = ['active' => 'boolean', 'tags' => 'array'];
}
