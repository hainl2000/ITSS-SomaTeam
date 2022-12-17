<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserAuthController;
use App\Http\Controllers\AdminAuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\CategoryController;


Route::prefix('user')->group(function () {
    Route::post('login', [UserAuthController::class, 'login']);
    Route::post('register', [UserAuthController::class, 'register']);
    Route::get('/forget/{token}', [UserAuthController::class, 'checkForgetPasswordToken']);
    Route::post('/sendForgetPasswordMail', [UserAuthController::class, 'sendForgetPasswordMail']);
    Route::post('/updatePassword/{token}', [UserAuthController::class, 'updatePassword']);
    Route::middleware('auth:api')->group(function () {
        Route::get('profile',[UserController::class, 'profile']);
        Route::get('me', [UserAuthController::class, 'me']);
        Route::get('logout', [UserAuthController::class, 'logout']);
        Route::post('/createOrder', [OrderController::class, 'createOrder']);
        Route::get('/orders', [OrderController::class, 'userGetAllOrders']);
        Route::get('/orders/{id}', [OrderController::class, 'userGetOrderDetail']);
        Route::post('/addProduct', [ProductController::class, 'addProduct']);
        Route::post('/updateProduct', [ProductController::class, 'updateProduct']);
        Route::post('/registerSeller', [UserController::class, 'registerSeller']);
        Route::get('/checkIsSeller',[UserController::class, 'checkIsSeller']);
        Route::get('/products', [ProductController::class, 'getProducts']);
    });
});
Route::get('/getBestSeller',[ProductController::class, 'getBestSeller']);
Route::get('/products', [ProductController::class, 'getAllProducts']);
Route::get('/products/{id}', [ProductController::class, 'getSingleProduct']);
Route::get('/allCategories', [CategoryController::class, 'getAllCategories']);
Route::prefix('admin')->group(function () {
    Route::post('login', [AdminAuthController::class, 'login']);
    Route::middleware('auth:admin')->group(function () {
        Route::get('/getUsers',[UserController::class, 'getListUsers']);
        Route::get('me', [AdminAuthController::class, 'me']);
        Route::get('logout', [AdminAuthController::class, 'logout']);
        Route::get('/orders', [OrderController::class, 'adminGetAllOrders']);
        Route::get('/orders/{id}', [OrderController::class, 'adminGetOrderDetail']);
        Route::get('/products', [ProductController::class, 'getProducts']);
        Route::post('/changeOrderStatus', [OrderController::class, 'changeOrderStatus']);
        Route::post('/approveSeller', [UserController::class, 'approveOrRefuseSellerRequest']);
        Route::post('/approveProduct', [ProductController::class, 'approveOrRefuseProduct']);
        Route::get('/getListSellerRequests',[UserController::class, 'getListSellerRequests']);
        Route::post('/registerAdmin',[UserAuthController::class, 'registerAdmin']);
        Route::post('/lockUser',[UserController::class, 'lockUser']);
    });
});
