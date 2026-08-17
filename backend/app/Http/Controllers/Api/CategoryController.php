<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Category\StoreCategoryRequest;
use App\Http\Requests\Category\UpdateCategoryRequest;
use App\Models\Category;
use Illuminate\Http\JsonResponse;

class CategoryController extends Controller
{
    /**
     * Display a listing of categories with recipe counts.
     */
    public function index(): JsonResponse
    {
        $categories = Category::withCount('recipes')
            ->orderBy('name', 'asc')
            ->get();

        return response()->json($categories);
    }

    /**
     * Display the specified category.
     */
    public function show(int $id): JsonResponse
    {
        $category = Category::withCount('recipes')->find($id);

        if (! $category) {
            return response()->json(['message' => 'Category not found.'], 404);
        }

        return response()->json($category);
    }

    /**
     * Store a newly created category in storage.
     */
    public function store(StoreCategoryRequest $request): JsonResponse
    {
        $category = Category::create($request->validated());
        $category->recipes_count = 0;

        return response()->json($category, 201);
    }

    /**
     * Update the specified category in storage.
     */
    public function update(UpdateCategoryRequest $request, int $id): JsonResponse
    {
        $category = Category::find($id);

        if (! $category) {
            return response()->json(['message' => 'Category not found.'], 404);
        }

        $category->update($request->validated());
        $category->loadCount('recipes');

        return response()->json($category);
    }

    /**
     * Remove the specified category from storage with relational dependency guard.
     */
    public function destroy(int $id): JsonResponse
    {
        $category = Category::withCount('recipes')->find($id);

        if (! $category) {
            return response()->json(['message' => 'Category not found.'], 404);
        }

        if ($category->recipes_count > 0) {
            return response()->json([
                'message' => 'This category contains recipes and cannot be deleted until the related recipes are handled.',
            ], 409);
        }

        $category->delete();

        return response()->json([
            'message' => 'Category deleted successfully.',
        ], 200);
    }
}
