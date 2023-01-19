<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use App\Models\AdvertisePackage;
use App\Models\Comment;
use App\Models\Notification;
use App\Models\Product;
use App\Models\SellerInformations;
use App\Models\TransactionAdvertise;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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
        $getOnlyEmail = $request->input('getEmail');
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
                User::where('id',$loginUserId)
                ->update([
                    'name' => $userInfo["name"],
                    'email' => $userInfo["email"],
                    'image' => $userInfo["image"]
                ]);
            }
            $sellerInfo = $request->input('sellerInfo');
            if (isset($sellerInfo)) {
                SellerInformations::where('seller_id',$loginUserId)
                ->update([
                    'credit_number' => $sellerInfo["credit_number"],
                    'bank' => $sellerInfo["bank"],
                    'address' => $sellerInfo["address"],
                    'phone_number' => $sellerInfo["phone_number"],
                ]);
            }
            DB::commit();
            return response()->json([
                'success' => true,
                'msg' => "update successfully"
            ]);
        } catch (\Exception $e) {
            dd($e->getMessage());
            DB::rollBack();
            return response()->json([
                'success' => false,
                'msg' => "update fail"
            ]);
        }
    }

    public function deleteShop(Request $request)
    {
        try {
            DB::beginTransaction();
            $sellerId = $request->input('seller_id');
            $seller = User::find($sellerId);
            $seller->is_seller = 0;
            $seller->save();
            SellerInformations::where('seller_id', $sellerId)->delete();
            DB::commit();
            return response()->json([
                'success' => true,
                'msg' => "delete shop successfully"
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'msg' => "delete shop fail"
            ]);
        }
    }

    public function comment(Request $request)
    {
        try {
            DB::beginTransaction();
            $loginUserId = Auth::id();
            Comment::create([
                'content' => $request->input('content'),
                'rating' => $request->input('rating'),
                'comment_in' => $request->input('comment_in'),
                'comment_by' => $loginUserId
            ]);
            DB::commit();
            return response()->json([
                'success' => true,
                'msg' => "comment successfully"
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'msg' => "comment fail"
            ]);
        }
    }

    public function sendNotifications(Request $request)
    {
        try {
            $emails = $request->input('emails');
            DB::beginTransaction();
            foreach ($emails as $email) {
                Notification::create([
                    'email' => $email,
                    'content' => $request->input('content'),
                    'send_time' => $request->input('send_time'),
                    'status' => 0
                ]);
            }
            DB::commit();
            return response()->json([
                'success' => true,
                'msg' => "send notification successfully"
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            dd($e->getMessage());
            return response()->json([
                'success' => false,
                'msg' => "send notification fail"
            ]);
        }
    }

    public function registerAdvertisePackage(Request $request)
    {
        $loginUserId = Auth::id();
        try{
            DB::beginTransaction();
            $package = AdvertisePackage::find($request->input('advertise_id'));
            TransactionAdvertise::create([
                'user_id' => $loginUserId,
                'advertise_package_id' => $request->input('advertise_id'),
                'bank' => $request->input('bank'),
                'credit_number' => $request->input('credit_number')
            ]);
            Product::where('created_by', $loginUserId)
                ->update([
                    'priority' => 1
                ]);
            $user = User::find($loginUserId);
            $user->end_advertise = Carbon::now()->addMonths($package->time)->endOfDay();
            $user->save();
            DB::commit();
            return response()->json([
                'success' => true,
                'msg' => "buy package successfully"
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            dd($e->getMessage());
            return response()->json([
                'success' => false,
                'msg' => "buy package fail"
            ]);
        }
    }

    public function getAllAdvertisePackages()
    {
        $allPackages = AdvertisePackage::all();
        return response()->json($allPackages);
    }

    public function getRegisteredPackage()
    {
        $loginUserId = Auth::id();
        $registeredPackages = User::with('package')->where('id', $loginUserId)
            ->where('end_advertise', '>=', Carbon::now())->first();
        return response()->json($registeredPackages);
    }

    public function getAllPackageTransactions()
    {
        $allTransaction = TransactionAdvertise::with('user','advertise_package')->get();
        return response()->json($allTransaction);
    }

    public function getAllNotifications()
    {
        $allNotifications = Notification::with('users')->groupBy('created_at')->get();
        return response()->json($allNotifications);
    }

    public function updateAdvertisePackage(Request $request)
    {
        try {
            DB::beginTransaction();
            AdvertisePackage::where('id', $request->input('advertise_id'))->update([
                'name' => $request->input('name'),
                'price' => $request->input('price'),
                'time' => $request->input('time'),
            ]);
            DB::commit();
            return response()->json([
                'success' => true,
                'msg' => "update package successfully"
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            dd($e->getMessage());
            return response()->json([
                'success' => false,
                'msg' => "update package fail"
            ]);
        }
    }
}
