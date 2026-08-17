<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Recipe;
use App\Models\User;
use Illuminate\Http\JsonResponse;

class AdminStatisticsController extends Controller
{
    /**
     * Return administrative statistics and recent recipe activities.
     */
    public function index(): JsonResponse
    {
        $totalUsers = User::count();
        $totalRecipes = Recipe::count();
        $totalCategories = Category::count();

        $recentRecipes = Recipe::with('category')
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get();

        return response()->json([
            'total_users' => $totalUsers,
            'total_recipes' => $totalRecipes,
            'total_categories' => $totalCategories,
            'recent_recipes' => $recentRecipes,
        ]);
    }
}
