<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class OrderController extends Controller
{
    public function adminGetAllOrders() {
        $orders = Order::with(['user', 'order_details','order_details.product:id,name,image'])
            ->orderBy('created_at', 'desc')
            ->simplePaginate(10);
        return response()->json($orders);
    }

    public function adminGetOrderDetail($id) {
        $order_detail = Order::with([
            'order_details.product:id,name,image'
        ])
            ->find($id);
        return response()->json($order_detail);
    }

    public function userGetAllOrders() {
        $orders = Order::with([
            'order_details.product:id,name,image'
        ])
            ->where('user_id', auth()->id())->simplePaginate(10);
        return response()->json($orders);
    }

    public function userGetOrderDetail($id) {
        $order_detail = Order::with([
            'order_details.product:id,name,image'
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
            'message' => 'Change order status successfully'
        ]);
    }

    public function createOrder(Request $request) {
        $dataToValidate = [
            'address' => $request['address'],
            'phone' => $request['phoneNumber']
        ];
        $validator = Validator::make($dataToValidate, [
            'address' => 'required|string',
            'phone' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Data is not valid'
            ]);
        }

        DB::beginTransaction();
        try {
            $order = new Order();
            $order->user_id = auth()->id();
            $order->address = $request['address'];
            $order->phone = $request['phoneNumber'];
            $order->total_price = $request['totalPrice'];
            $order->save();

            foreach ($request['products'] as $product) {
                $orderDetail = new OrderDetail;
                $orderDetail->order_id = $order->id;
                $orderDetail->product_id = $product['id'];
                $orderDetail->quantity = $product['quantity'];
                $orderDetail->price = $product['price'];
                $orderDetail->save();
            }
            DB::commit();
            return response()->json([
                'success' => true,
                'message' => 'Successfully created order'
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            throw new \Exception($e->getMessage());
        }

    }
}
