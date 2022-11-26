<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AdminAuthController extends Controller
{
    public function login()
    {
        $credentials = request(['email', 'password']);
        $validator = Validator::make($credentials, [
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        if (!$token = auth('admin')->attempt($credentials)) {
            return response()->json([
                'success' => false,
                'message' => 'Email or password is incorrect'
            ]);
        }

        return $this->respondWithToken($token);
    }

    protected function respondWithToken($token)
    {
        return response()->json([
            'success' => true,
            'token' => [
                'admin_access_token' => $token,
                'expires_in' => auth()->factory()->getTTL() * 60
            ],
            'admin' => auth('admin')->user()
        ]);
    }

    public function me()
    {
        return response()->json(auth('admin')->user());
    }

    public function logout()
    {
        auth('admin')->logout();

        return response()->json([
            'success' => true,
            'message' => 'Successfully logged out'
        ]);
    }
}
