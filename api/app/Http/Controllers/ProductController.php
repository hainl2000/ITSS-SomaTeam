<?php

namespace App\Http\Controllers;

use App\Models\OrderDetail;
use App\Models\Product;
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

        $products = Product::when(strlen($searchString) >= 3, function ($query) use ($searchString) {
            return $query->where('name', 'like', '%'.$searchString.'%');
        })
            ->when($sortType and $sortType === 'high-to-low', function ($query) use ($sortType) {
                return $query->orderBy('price', 'desc');
            })
            ->when($sortType and $sortType === 'low-to-high', function ($query) use ($sortType) {
                return $query->orderBy('price');
            })
            ->where('is_approve', 2)
            ->paginate(12);
        return response()->json($products);
    }

    public function getProducts(Request $request) {
        $query = Product::orderBy('created_at', 'desc');
        $loginUser = auth()->user();
        if (isset($loginUser->is_seller) && $loginUser->is_seller == 2) {
            $query->where('created_by', auth()->id());
        }
        $products = $query->withTrashed()->paginate(6);

        return response()->json($products);
    }

    public function getSingleProduct($id) {
        $product = Product::findOrFail($id);
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
            if ($status == 0) {
                Product::where('id', $id)->delete();
            }
            DB::commit();
            return response()->json([
                'success' => true,
                'message' => 'Approve product successfully'
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

    public function getInSaleProduct() {

    }
}
