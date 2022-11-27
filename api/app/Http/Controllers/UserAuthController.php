<?php

namespace App\Http\Controllers;

use App\Mail\ForgetpasswordMail;
use App\Mail\SignupMail;
use App\Models\PasswordReset;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class UserAuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = request(['email', 'password']);
        $validator = Validator::make($credentials, [
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        if (!$token = auth()->attempt($credentials)) {
            return response()->json([
                'success' => false,
                'message' => 'Email or password is incorrect'
            ]);
        }

        return $this->respondWithToken($token);
    }

    /**
     * Register new User
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request)
    {
        $data = $request->all();
        $validator = Validator::make($data, [
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Data is not valid'
            ],400);
        }

        $data['password'] = Hash::make($request['password']);

        try {
            DB::beginTransaction();
            $user = User::create($data);
            if ($this->sendSignupMail($user->email) == false) {
                throw new \Exception();
            }
            DB::commit();
            return response()->json([
                'success' => true,
                'message' => 'Registered successfully'
            ],200);
        } catch (\Exception $e) {
            DB::rollBack();
            dd($e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Registration error'
            ],400);
        }
    }

    private function sendSignupMail($email)
    {
        try {
            $mailable = new SignupMail();
            Mail::to($email)->send($mailable);
            return true;
        } catch (\Exception $e) {
            return false;
        }
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return response()->json(auth()->user());
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();

        return response()->json([
            'success' => true,
            'message' => 'Successfully logged out'
        ]);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    protected function respondWithToken($token)
    {
        return response()->json([
            'success' => true,
            'token' => [
                'user_access_token' => $token,
                'expires_in' => auth()->factory()->getTTL() * 60
            ],
            'user' => auth()->user()
        ]);
    }

    public function sendForgetPasswordMail(Request $request)
    {
        $data = $request->all();
        $validator = Validator::make($data, [
            'email' => 'required|email'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Data is not valid'
            ],400);
        }
        $user = User::where('email', $data["email"])->first();
        if (!$user) {
            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Data is not valid'
                ],400);
            }
        }
        try {
            DB::beginTransaction();
            $pwReset = PasswordReset::where('email', $user->email)->first();
            if ($pwReset) {
                $token = $pwReset->token;
            } else {
                $token = Str::uuid()->toString();
                PasswordReset::create([
                    "email" => $data["email"],
                    "token" => $token,
                    "created_at" => Carbon::now()
                ]);
            }
            $link = "http://localhost:3000/forget/" . $token;
            $mailable = new ForgetpasswordMail($link);
            Mail::to($data["email"])->send($mailable);
            DB::commit();
            return response()->json([
                'success' => true,
                'message' => 'Send mail successfully'
            ],200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Something went wrong'
            ],400);
        }
    }

    public function checkForgetPasswordToken(Request $request, $token)
    {
        $pwReset = PasswordReset::where('token', $token)->first();
        if ($pwReset) {
            return response()->json([
                'success' => true,
                'message' => 'Valid'
            ],200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Something went wrong'
            ],400);
        }
    }

    public function updatePassword(Request $request, $token)
    {
        $data = $request->all();
        $pwReset = PasswordReset::where('token', $token)->first();
        DB::beginTransaction();
        try {
            if ($pwReset) {
                $updated = User::where('email', $pwReset->email)
                    ->update(['password' => Hash::make($data["password"])]);
                $pwReset = PasswordReset::where('token', $token)->delete();
                DB::commit();
                return response()->json([
                    'success' => true,
                    'message' => 'Update sucessfully'
                ],200);
            } else {
                throw new \Exception();
            }
        } catch (\Exception $e) {
            dd($e->getMessage());
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Something went wrong'
            ],400);
        }
    }
}
