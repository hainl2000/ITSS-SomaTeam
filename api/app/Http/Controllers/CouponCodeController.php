<?php

namespace App\Http\Controllers;

use App\Models\CouponCode;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class CouponCodeController extends Controller
{
    public function createCoupon(Request $request)
    {
        $data = $request->all();
        $validator = Validator::make($data, [
            'code' => 'required|unique:coupon_codes',
            'sale' => 'required',
            'max_sale' => 'required',
            'quantity' => 'required',
            'start_date' => 'required',
            'end_date' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Data is not valid'
            ],400);
        }
        try {
            DB::beginTransaction();
            $loginAdminId = auth('admin')->id();
            CouponCode::create([
                'code' => $request->input('code'),
                'sale' => $request->input('sale'),
                'max_sale' => $request->input('max_sale'),
                'quantity' => $request->input('quantity'),
                'start_date' => $request->input('start_date'),
                'end_date' => $request->input('end_date'),
                'created_by' => $loginAdminId
            ]);
            DB::commit();
            return response()->json([
                'success' => true,
                'message' => 'Successfully added new coupon'
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Add new coupon failed'
            ]);
        }
    }

    public function getListCoupons(Request $request)
    {
        $listCoupons = CouponCode::all();
        return response()->json($listCoupons);
    }

    public function checkCouponCode(Request $request)
    {
        $couponCode = $request->input('couponCode');
        $now = Carbon::now()->toDateString();
        $coupon = CouponCode::where([
            ['code', '=' ,$couponCode],
            ['start_date', '<=', $now],
            ['end_date', '>=', $now],
            ['quantity', '>', 0]
        ])->first();
        if ($coupon) {
            return response()->json([
                'success' => true,
                'message' => 'Validated',
                'coupon' => $coupon
            ]);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Not existed'
            ]);
        }
    }
}
