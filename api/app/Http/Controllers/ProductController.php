<?php

namespace App\Http\Controllers;

use App\Models\OrderDetail;
use App\Models\Product;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    public function getAllProducts(Request $request) {
        $sortType = $request->sortType;
        $searchString = $request->searchString;
        $category_id = $request->input('category');
        $seller_id = $request->input('seller_id');

        $products = Product::with('categories')
            ->when(strlen($searchString) >= 3, function ($query) use ($searchString) {
                return $query->where('name', 'like', '%'.$searchString.'%');
            })
            ->when($sortType and $sortType === 'high-to-low', function ($query) use ($sortType) {
                return $query->orderBy('price', 'desc');
            })
            ->when($sortType and $sortType === 'low-to-high', function ($query) use ($sortType) {
                return $query->orderBy('price');
            })
            ->orderByDesc('priority')
            ->where('is_approve', 2);
        if (isset($category_id)) {
            $products->where('category_id', $category_id);
        }
        if (isset($seller_id)) {
            $products->where('created_by', $seller_id);
        }
        $products = $products->paginate(12);
//        $products = $products->get();
        return response()->json($products);
    }

    public function getProducts(Request $request) {
        $query = Product::with('categories')->orderBy('created_at', 'desc');
        $loginUser = auth()->user();
        if (isset($loginUser->is_seller) && $loginUser->is_seller == 2) {
            User::where('id', auth()->id())
                ->update([
                'last_login' => Carbon::now()
            ]);
            $query->where('created_by', auth()->id());
        }
        $products = $query->paginate(6);

        return response()->json($products);
    }

    public function getSingleProduct($id) {
        $product = Product::with('categories','users','comments.user')->where('is_approve', 2)->find($id);
        return response()->json($product);
    }

    public function getSimilarProduct($id) {
        $product = Product::findOrFail($id);
        $similiarProduct = Product::whereNotIn('id', [$product->id])
            ->where('category_id', $product->category_id)
            ->where('is_approve', 2)
            ->limit(4)->get();
        return response()->json($similiarProduct);
    }

    public function getAllProductsByCategory($id) {
        $product = Product::where('category_id', $id)->get();
        return response()->json($product);
    }

    public function addProduct(Request $request) {
        try {
            Product::create([
                'name' => $request->input('name'),
                'price' => $request->input('price'),
                'image' => $request->input('image'),
                'description' => $request->input('description'),
                'quantity' => $request->input('quantity'),
                'is_approve' => 1,
                'category_id' => $request->input('category'),
                'created_by' => auth()->id()
            ]);
            return response()->json([
                'success' => true,
                'message' => 'Successfully added new product'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Add new product failed'
            ]);
        }
    }

    public function updateProduct(Request $request) {
        $product = Product::find($request['id']);

        $product->name = $request['name'];
        $product->price = $request['price'];
        $product->description = $request['description'];
        $product->image = $request['image'];
        $product->quantity = $request['quantity'];
        $product->category_id = $request['category'];

        try {
            DB::beginTransaction();
            $product->save();
            DB::commit();
            return response()->json([
                'success' => true,
                'message' => 'Successfully updated product'
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Update product failed'
            ]);
        }
    }

    public function approveOrRefuseProduct(Request $request) {
        try {
            DB::beginTransaction();
            $id = $request->input('product_id');
            $status = $request->input('status');
            Product::where('id', $id)
                ->update([
                    'is_approve' => $status
                ]);
//            if ($status == 0) {
//                Product::where('id', $id)->delete();
//            }
            DB::commit();
            return response()->json([
                'success' => true,
                'message' => 'Phê duyệt sản phẩm thành công'
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Approve product failed'
            ]);
        }
    }


    public function getBestSeller() {
        try {
            $totalOrders = OrderDetail::all();
            $bestSellerItems = [];
            foreach ($totalOrders as $total) {
                if (isset($bestSellerItems[$total->product_id])) {
                    $bestSellerItems[$total->product_id] += $total->quantity;
                } else {
                    $bestSellerItems[$total->product_id] = 0;
                    $bestSellerItems[$total->product_id] = $total->quantity;
                }
            }
            arsort($bestSellerItems);
            $datas = [];
            $count = 0;
            foreach ($bestSellerItems as $key => $item){
                $count++;
                $datas = array_merge($datas, Product::where('id', $key)->get()->toArray());
                if ($count == 8) {
                    break;
                }
            }
            return response()->json([
                'success' => true,
                'bestSellerItems' => $datas
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error when getBesller'
            ]);
        }
    }

    public function getTotalRevenue(Request $request) {
        $isSeller = $request->input('isSeller');
        $orders = OrderDetail::join('products', function ($join){
            $join->on('products.id', 'order_details.product_id');
            $join->whereNull('products.deleted_at');
        });

        $orders = $orders->select(DB::raw('sum(order_details.price) as `prices`'),
            DB::raw("DATE_FORMAT(order_details.created_at,'%m') as monthKey"));
        if ($isSeller)
        {
            $orders = $orders->where('products.created_by', auth()->id());
        }
        $orders = $orders->whereYear('order_details.created_at', date('Y'))
        ->groupBy('monthKey')
        ->orderBy('monthKey', 'ASC')
        ->get();
        $data = [0,0,0,0,0,0,0,0,0,0,0,0];

        foreach($orders as $order){
            $data[$order->monthKey-1] = $order->prices;
        }
        return response()->json($data);
    }

    public function getTotalProduct(Request $request) {
        $isSeller = $request->input('isSeller');
        $products = Product::select(DB::raw('count(id) as `products`'),
            DB::raw("DATE_FORMAT(created_at,'%m') as monthKey"))
            ->whereYear('created_at', date('Y'));
        if ($isSeller) {
            $products->where('created_by', auth()->id());
        }
        $products = $products->groupBy('monthKey')
        ->orderBy('monthKey', 'ASC')
        ->get();
        $data = [0,0,0,0,0,0,0,0,0,0,0,0];

        foreach($products as $product){
            $data[$product->monthKey-1] = $product->products;
        }
        return response()->json($data);
    }

    public function deleteProduct(Request $request)
    {
        $product_id = $request->input('product_id');
        try {
            DB::beginTransaction();
            Product::where('id', $product_id)->delete();
            DB::commit();
            return response()->json([
                'success' => true,
                'message' => "delete product successfully"
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => "delete product fail"
            ]);
        }
    }

}
