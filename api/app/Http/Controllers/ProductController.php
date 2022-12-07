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

    public function adminGetAllProducts() {
        $products = Product::orderBy('created_at', 'desc')
            ->simplePaginate(6);

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

    public function approveProduct(Request $request) {
        try {
            DB::beginTransaction();
            $id = $request->input('product_id');
            Product::where('id', $id)
                ->update([
                    'is_approved' => 2
                ]);
            DB::commit();
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
                $datas[] = Product::where('id', $key)->get();
                if ($count == 5) {
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
