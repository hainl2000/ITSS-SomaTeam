<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'address', 'phone', 'total_price', 'status'];

    public function order_details()
    {
        return $this->hasMany(OrderDetail::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class)->withTrashed();
    }

    public function couponCodes()
    {
        return $this->hasOne(CouponCode::class, 'coupon_codes_id', 'id');
    }
}
