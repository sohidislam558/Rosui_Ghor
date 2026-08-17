<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Recipe;
use App\Models\RecipeInteraction;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class RecipeInteractionController extends Controller
{
    /**
     * Get the interaction status for the current authenticated user.
     */
    public function show(Request $request, int $recipeId): JsonResponse
    {
        $userId = $request->user()->id;

        $exists = RecipeInteraction::where('user_id', $userId)
            ->where('recipe_id', $recipeId)
            ->where('interaction_type', 'favorite')
            ->exists();

        return response()->json([
            'favorited' => $exists,
        ]);
    }

    /**
     * Toggle the favorite interaction for the current authenticated user.
     */
    public function toggle(Request $request, int $recipeId): JsonResponse
    {
        $recipe = Recipe::find($recipeId);

        if (! $recipe) {
            return response()->json(['message' => 'Recipe not found.'], 404);
        }

        $userId = $request->user()->id;

        $interaction = RecipeInteraction::where('user_id', $userId)
            ->where('recipe_id', $recipeId)
            ->where('interaction_type', 'favorite')
            ->first();

        if ($interaction) {
            $interaction->delete();
            return response()->json([
                'favorited' => false,
                'message' => 'Recipe removed from favorites.',
            ]);
        }

        RecipeInteraction::create([
            'user_id' => $userId,
            'recipe_id' => $recipeId,
            'interaction_type' => 'favorite',
        ]);

        return response()->json([
            'favorited' => true,
            'message' => 'Recipe added to favorites.',
        ]);
    }
}
