<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'name',
        'description',
        'image',
        'price',
        'category_id',
        'quantity',
        'created_by',
        'is_approve',
        'priority'
    ];

    public function categories()
    {
        return $this->hasOne(Category::class,'id','category_id');
    }

    public function users()
    {
        return $this->belongsTo(User::class, 'created_by', 'id');
    }

    public function comments()
    {
        return $this->hasMany(Comment::class, 'comment_in', 'id');
    }
}
