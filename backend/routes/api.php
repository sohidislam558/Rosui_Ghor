<?php

use App\Http\Controllers\Api\AdminStatisticsController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\RecipeController;
use App\Http\Controllers\Api\RecipeInteractionController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Public Authentication
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Public Recipes & Categories Discovery
Route::get('/recipes', [RecipeController::class, 'index']);
Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/categories/{id}', [CategoryController::class, 'show']);

// Authenticated Routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [UserController::class, 'show']);
    Route::put('/user', [UserController::class, 'update']);

    // Protected Recipe Details
    Route::get('/recipes/{id}', [RecipeController::class, 'show']);

    // Recipe Interactions (Favorites)
    Route::get('/recipes/{recipe}/interactions', [RecipeInteractionController::class, 'show']);
    Route::post('/recipes/{recipe}/interactions', [RecipeInteractionController::class, 'toggle']);

    // Administrative Endpoints
    Route::middleware('admin')->group(function () {
        Route::get('/admin/statistics', [AdminStatisticsController::class, 'index']);

        // Recipe Management
        Route::post('/recipes', [RecipeController::class, 'store']);
        Route::match(['put', 'post'], '/recipes/{id}', [RecipeController::class, 'update']);
        Route::delete('/recipes/{id}', [RecipeController::class, 'destroy']);

        // Category Management
        Route::post('/categories', [CategoryController::class, 'store']);
        Route::put('/categories/{id}', [CategoryController::class, 'update']);
        Route::delete('/categories/{id}', [CategoryController::class, 'destroy']);
    });
});
