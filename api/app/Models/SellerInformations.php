<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class SellerInformations extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'seller_id',
        'credit_number',
        'bank',
        'address',
        'phone_number'
    ];

    public function seller()
    {
        return $this->belongsTo(User::class,'seller_id','id');
    }
}
