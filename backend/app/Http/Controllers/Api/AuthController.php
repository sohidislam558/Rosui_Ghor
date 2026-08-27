<?php

namespace App\Http\Controllers\Api;

use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    /**
     * Register a new user account.
     */
    public function register(RegisterRequest $request): JsonResponse
    {
        $validated = $request->validated();

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => 'user',
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'User registered successfully.',
            'token' => $token,
            'user' => $user,
        ], 201);
    }

    /**
     * Authenticate an existing user.
     */
    public function login(LoginRequest $request): JsonResponse
    {
        $validated = $request->validated();

        $user = User::where('email', $validated['email'])->first();

        if (! $user || ! Hash::check($validated['password'], $user->password)) {
            return response()->json([
                'message' => 'These credentials do not match our records.',
            ], 401);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Login successful.',
            'token' => $token,
            'user' => $user,
        ]);
    }

    /**
     * Invalidate the current access token.
     */
    public function logout(Request $request): JsonResponse
    {
        $request->user()?->currentAccessToken()?->delete();

        return response()->json([
            'message' => 'Successfully logged out.',
        ]);
    }
    
    /**
     * Forgot Password Request.
     * Always returns 200 to avoid revealing whether an email is registered.
     */
    public function forgotPassword(Request $request): JsonResponse
    {
        $request->validate([
            'email' => ['required', 'email'],
        ]);

        // Attempt to send the reset link. We intentionally ignore whether the
        // user was found so we don't leak which emails are registered.
        Password::sendResetLink($request->only('email'));

        return response()->json([
            'message' => 'If an account with that email exists, a password reset link has been sent.',
        ], 200);
    }

/**
     * Reset Password Request 
     */

public function resetPassword(Request $request)
{
    $request->validate([
        'token' => ['required'],
        'email' => ['required', 'email'],
        'password' => ['required', 'confirmed', 'min:8'],
    ]);

    $status = Password::reset(
        $request->only(
            'email',
            'password',
            'password_confirmation',
            'token'
        ),
        function ($user, $password) {
            $user->forceFill([
                'password' => Hash::make($password),
                'remember_token' => Str::random(60),
            ])->save();
        }
    );

    if ($status === Password::PASSWORD_RESET) {
        return response()->json([
            'message' => 'Password has been reset successfully.'
        ], 200);
    }

    return response()->json([
        'message' => __($status)
    ], 400);
}
} 
