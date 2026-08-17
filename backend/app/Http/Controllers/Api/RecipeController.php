<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Recipe\StoreRecipeRequest;
use App\Http\Requests\Recipe\UpdateRecipeRequest;
use App\Models\Recipe;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class RecipeController extends Controller
{
    /**
     * Display a listing of recipes with search, category filtering, and pagination.
     */
    public function index(Request $request): JsonResponse
    {
        $query = Recipe::with('category');

        // Search by title (case-insensitive)
        if ($request->filled('search')) {
            $term = trim($request->input('search'));
            $query->where('title', 'like', "%{$term}%");
        }

        // Filter by category
        if ($request->filled('category_id') && is_numeric($request->input('category_id'))) {
            $query->where('category_id', (int) $request->input('category_id'));
        }

        // Sorting: newest first by default
        $query->orderBy('created_at', 'desc');

        // Optional non-paginated limit (for featured or latest subsets)
        if ($request->has('limit') && is_numeric($request->input('limit'))) {
            $limit = min((int) $request->input('limit'), 50);
            $recipes = $query->limit($limit)->get();
            return response()->json($recipes);
        }

        // Standard pagination
        $perPage = (int) $request->input('per_page', $request->input('perPage', 8));
        $paginated = $query->paginate($perPage);

        return response()->json([
            'data' => $paginated->items(),
            'meta' => [
                'current_page' => $paginated->currentPage(),
                'last_page' => $paginated->lastPage(),
                'per_page' => $paginated->perPage(),
                'total' => $paginated->total(),
            ],
        ]);
    }

    /**
     * Display the specified recipe details (protected for authenticated users).
     */
    public function show(int $id): JsonResponse
    {
        $recipe = Recipe::with('category')->find($id);

        if (! $recipe) {
            return response()->json(['message' => 'Recipe not found.'], 404);
        }

        return response()->json($recipe);
    }

    /**
     * Store a newly created recipe in storage.
     */
    public function store(StoreRecipeRequest $request): JsonResponse
    {
        $data = $request->validated();

        // Handle uploaded image file
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('recipes', 'public');
            $data['image_path'] = $path;
            $data['image_url'] = url('storage/' . $path);
        }

        unset($data['image']);

        $recipe = Recipe::create($data);
        $recipe->load('category');

        return response()->json($recipe, 201);
    }

    /**
     * Update the specified recipe in storage.
     */
    public function update(UpdateRecipeRequest $request, int $id): JsonResponse
    {
        $recipe = Recipe::find($id);

        if (! $recipe) {
            return response()->json(['message' => 'Recipe not found.'], 404);
        }

        $data = $request->validated();

        // Handle uploaded image replacement
        if ($request->hasFile('image')) {
            if ($recipe->image_path && Storage::disk('public')->exists($recipe->image_path)) {
                Storage::disk('public')->delete($recipe->image_path);
            }

            $path = $request->file('image')->store('recipes', 'public');
            $data['image_path'] = $path;
            $data['image_url'] = url('storage/' . $path);
        }

        unset($data['image']);

        $recipe->update($data);
        $recipe->load('category');

        return response()->json($recipe);
    }

    /**
     * Remove the specified recipe from storage permanently.
     */
    public function destroy(int $id): JsonResponse
    {
        $recipe = Recipe::find($id);

        if (! $recipe) {
            return response()->json(['message' => 'Recipe not found.'], 404);
        }

        // Clean up stored image file if exists
        if ($recipe->image_path && Storage::disk('public')->exists($recipe->image_path)) {
            Storage::disk('public')->delete($recipe->image_path);
        }

        $recipe->delete();

        return response()->json([
            'message' => 'Recipe deleted successfully.',
        ]);
    }
}
