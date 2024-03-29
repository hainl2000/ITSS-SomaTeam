<?php

namespace App\Http\Controllers;

use App\Models\CouponCode;
use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\Product;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class OrderController extends Controller
{
    public function adminGetAllOrders() {
        $orders = Order::with(['user', 'order_details','order_details.product:id,name,image','couponCodes:id,code'])
            ->orderBy('created_at', 'desc')
            ->simplePaginate(10);
        return response()->json($orders);
    }

    public function adminGetOrderDetail($id) {
        $order_detail = Order::with([
            'order_details.product:id,name,image',
            'couponCodes:id,code'
        ])
            ->find($id);
        return response()->json($order_detail);
    }

    public function userGetAllOrders() {
        $orders = Order::with([
            'order_details.product:id,name,image',
            'couponCodes:id,code'
        ])
            ->where('user_id', auth()->id())->simplePaginate(10);
        return response()->json($orders);
    }

    public function userGetOrderDetail($id) {
        $order_detail = Order::with([
            'order_details.product:id,name,image,quantity',
            'couponCodes:id,code'
        ])
        ->find($id);
        return response()->json($order_detail);
    }

    public function changeOrderStatus(Request $request) {
        $order = Order::find($request['id'])->update([
            'status' =>  $request['status'],
        ]);
        return response()->json([
            'success' => true,
            'message' => 'Đổi trạng thái thành công'
        ]);
    }

    public function createOrder(Request $request) {
        $dataToValidate = [
            'address' => $request['address'],
            'phone' => $request['phoneNumber'],
            'credit_number' => $request['credit_number'],
            'bank' => $request['bank']
        ];
        $validator = Validator::make($dataToValidate, [
            'address' => 'required|string',
            'phone' => 'required',
            'credit_number' => 'required',
            'bank' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()
            ]);
        }

        DB::beginTransaction();
        try {
            $order = new Order();
            $order->user_id = auth()->id();
            $order->address = $request['address'];
            $order->phone = $request['phoneNumber'];
            $order->credit_number = $request['credit_number'];
            $order->bank = $request['bank'];
            $order->total_price = $request['totalPrice'];
            if (isset($request['coupon'])) {
                $order->coupon_codes_id = $request['coupon'];
            }
            $order->save();
            foreach ($request['products'] as $product) {
                $orderDetail = new OrderDetail;
                $productQuantity = Product::where('id',$product['id'])->first()->quantity;
                if ($product['quantity_order'] > $productQuantity) {
                    throw new \Exception("Order quantity exceed available quantity");
                }
                Product::where('id',$product['id'])->update([
                    'quantity' => $productQuantity - $product['quantity_order']
                ]);
                $orderDetail->order_id = $order->id;
                $orderDetail->product_id = $product['id'];
                $orderDetail->quantity = $product['quantity_order'];
                $orderDetail->price = $product['price'];
                $orderDetail->save();
            }
            if (isset($request['coupon'])) {
                $coupon = CouponCode::find($request['coupon']);
                if ($coupon->quantity <= 0 || $coupon->end_date < Carbon::now() || $coupon->start_date > Carbon::now()) {
                    throw new \Exception("Counpon not valid");
                }
                $coupon->quantity = $coupon->quantity - 1;
                $coupon->save();
            }
            DB::commit();
            return response()->json([
                'success' => true,
                'message' => 'Đặt đơn hàng thành công'
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ]);
        }

    }
}
