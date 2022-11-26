<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
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
            ->simplePaginate(12);
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

    public function adminAddProduct(Request $request) {
        try {
            Product::create($request->all());
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

    public function adminUpdateProduct(Request $request) {
        $product = Product::find($request['id']);

        $product->name = $request['name'];
        $product->price = $request['price'];
        $product->description = $request['description'];
        $product->image = $request['image'];

        try {
            $product->save();
            return response()->json([
                'success' => true,
                'message' => 'Successfully updated product'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Update product failed'
            ]);
        }
    }
}
