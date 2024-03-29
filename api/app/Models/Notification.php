<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    use HasFactory;

    protected $fillable = [
        'email',
        'content',
        'send_time',
        'status'
    ];

    public function users()
    {
        return $this->belongsTo(User::class, 'email', 'email');
    }
}
