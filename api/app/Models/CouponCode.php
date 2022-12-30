<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CouponCode extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'code',
        'sale',
        'start_date',
        'end_date',
        'quantity ',
        'created_by'
    ];

    public function admin()
    {
        return $this->belongsTo(Admin::class,'id','created_by');
    }

}
