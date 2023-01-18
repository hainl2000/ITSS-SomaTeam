<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TransactionAdvertise extends Model
{
    use HasFactory;

    protected $table = "tracsaction_advertise";

    protected $fillable = [
        'user_id',
        'advertise_package_id',
        'bank',
        'credit_number'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function advertise_package()
    {
        return $this->belongsTo(AdvertisePackage::class, 'advertise_package_id', 'id');
    }
}
