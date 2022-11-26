<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserAuthController;
use App\Http\Controllers\AdminAuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\OrderController;

Route::prefix('user')->group(function () {
    Route::post('login', [UserAuthController::class, 'login']);
    Route::post('register', [UserAuthController::class, 'register']);

    Route::middleware('auth:api')->group(function () {
        Route::get('me', [UserAuthController::class, 'me']);
        Route::get('logout', [UserAuthController::class, 'logout']);
        Route::post('/createOrder', [OrderController::class, 'createOrder']);
        Route::get('/orders', [OrderController::class, 'userGetAllOrders']);
        Route::get('/orders/{id}', [OrderController::class, 'userGetOrderDetail']);

    });
});

Route::get('/products', [ProductController::class, 'getAllProducts']);
Route::get('/products/{id}', [ProductController::class, 'getSingleProduct']);
Route::prefix('admin')->group(function () {
    Route::post('login', [AdminAuthController::class, 'login']);
    Route::middleware('auth:admin')->group(function () {
        Route::get('me', [AdminAuthController::class, 'me']);
        Route::get('logout', [AdminAuthController::class, 'logout']);
        Route::get('/orders', [OrderController::class, 'adminGetAllOrders']);
        Route::get('/orders/{id}', [OrderController::class, 'adminGetOrderDetail']);
        Route::get('/products', [ProductController::class, 'adminGetAllProducts']);
        Route::post('/addProduct', [ProductController::class, 'adminAddProduct']);
        Route::post('/updateProduct', [ProductController::class, 'adminUpdateProduct']);
        Route::post('/changeOrderStatus', [OrderController::class, 'changeOrderStatus']);
    });
});
