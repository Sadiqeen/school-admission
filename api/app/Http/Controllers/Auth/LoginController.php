<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\Request;

class LoginController extends Controller
{
    public function __invoke(LoginRequest $request)
    {
        if (!auth()->attempt($request->only('email', 'password'))) {
            throw new HttpResponseException(response()->json([
                'message' => "Login fail",
                'errors' => [],
            ], 422));
        } else {
            return response([
                'status' => 200,
                'message' => 'Login Successfully',
            ]);
        }
    }
}
