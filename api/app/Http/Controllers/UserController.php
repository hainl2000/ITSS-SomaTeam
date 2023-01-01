<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use App\Models\SellerInformations;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use PHPUnit\Exception;

class UserController extends Controller
{
    public function registerSeller(Request $request)
    {
        try {
            DB::beginTransaction();
            $loginUserId = auth()->id();
            User::where('id', $loginUserId)
                ->update([
                    'is_seller' => 1
                ]);
            SellerInformations::create([
                'seller_id' => $loginUserId,
                'credit_number' => $request->input('credit_number'),
                'bank' => $request->input('bank'),
                'address' => $request->input('address'),
                'phone_number' => $request->input('phone_number'),
            ]);
            DB::commit();
            return response()->json([
                'success' => true,
                'message' => 'register seller successfully'
            ]);
        } catch(Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'register seller fail'
            ]);
        }
    }

    public function approveOrRefuseSellerRequest(Request $request)
    {
        try {
            DB::beginTransaction();
            $status = $request->input('status');
            $requestorId = $request->input('user_id');
            User::where('id', $requestorId)
                ->update([
                    'is_seller' => $status
                ]);
            if ($status == 0) {
                SellerInformations::where('seller_id',$requestorId)
                    ->delete();
            }
            DB::commit();
            return response()->json([
                'success' => true,
                'message' => 'approve seller successfully'
            ]);
        } catch(Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'approve seller fail'
            ]);
        }
    }

    public function checkIsSeller(Request $request)
    {
        try {
            $loginUser = auth()->user();
            return response()->json([
                'success' => true,
                'sellerStatus' => $loginUser->is_seller,
                'message' => 'register seller successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'get seller fail'
            ]);
        }
    }

    public function getListSellerRequests(Request $request)
    {
        try {
            $listSellerRequests = SellerInformations::select([
                'seller_informations.id',
                'seller_informations.credit_number',
                'seller_informations.bank',
                'seller_informations.address',
                'seller_informations.phone_number',
                'users.id AS user_id',
                'users.name AS user_name',
                'users.email AS user_email',
            ])
            ->join('users', function ($join){
                $join->on('users.id', '=', 'seller_informations.seller_id');
            })->where('users.is_seller', '=', 1)->get();
            return response()->json([
                'success' => true,
                'listSellerRequests' => $listSellerRequests,
                'message' => 'get list seller request successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'get list seller request fail'
            ]);
        }
    }

    public function getListUsers(Request $request)
    {
        try {
            $listUsers = User::all();
            $listAdmins = Admin::all();
            return response()->json([
                'success' => true,
                'listUsers' => $listUsers,
                'listAdmins' => $listAdmins,
                'message' => 'get list users successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'get list users fail'
            ]);
        }
    }

    public function lockUser(Request $request)
    {
        try {
            DB::beginTransaction();
            $user_id = $request->input('user_id');
            User::where('id', $user_id)->delete();
            DB::commit();
            return response()->json([
                'success' => true,
                'message' => 'lock users success'
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'lock users fail'
            ]);
        }
    }

    public function profile(Request $request)
    {
        $loginUser = auth()->user();
        if ($loginUser->is_seller == 2) {
            $sellerInfo = SellerInformations::select('credit_number','bank','address','phone_number')->where('seller_id', $loginUser->id)->first();
            $loginUser['sellerInfo'] = $sellerInfo->toArray();
        }
        return response()->json([
            'success' => true,
            'info' => $loginUser
        ]);
    }

    public function updateProfile(Request $request)
    {
        try {
            DB::beginTransaction();
            $loginUserId = auth()->id();
            $userInfo = $request->input('userInfo');
            if (isset($userInfo)) {
                User::update([
                    'name' => $userInfo->name,
                    'email' => $userInfo->email,
                    'image' => $userInfo->image
                ])->where('id',$loginUserId);
            }
            $sellerInfo = $request->input('sellerInfo');
            if (isset($sellerInfo)) {
                SellerInformations::update([
                    'credit_number' => $sellerInfo->credit_number,
                    'bank' => $sellerInfo->bank,
                    'address' => $sellerInfo->address,
                    'phone_number' => $sellerInfo->phone_number,
                ])->where('seller_id',$loginUserId);
            }
            DB::commit();
            return response()->json([
                'success' => true,
                'msg' => "update successfully"
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'msg' => "update fail"
            ]);
        }
    }
}
