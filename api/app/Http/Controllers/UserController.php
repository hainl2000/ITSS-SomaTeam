<?php

namespace App\Http\Controllers;

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
            User::where('id', auth()->id())
                ->update([
                    'is_seller' => 1
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

    public function approveSeller(Request $request)
    {
        try {
            DB::beginTransaction();
            User::where('id', $request->input('user_id'))
                ->update([
                    'is_seller' => 2
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
}
