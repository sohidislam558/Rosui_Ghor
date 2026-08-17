import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { interactionService } from "@/services/interactionService";
import { cn } from "@/lib/utils";

interface RecipeInteractionButtonProps {
  recipeId: number;
  className?: string;
}

export function RecipeInteractionButton({ recipeId, className }: RecipeInteractionButtonProps) {
  const { user, isAuthenticated } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated && user?.id) {
      interactionService.get(user.id, recipeId).then(setIsFavorite).catch(console.error);
    }
  }, [isAuthenticated, user?.id, recipeId]);

  const handleToggle = async () => {
    if (!isAuthenticated || !user?.id || loading) return;

    try {
      setLoading(true);
      const nextState = await interactionService.toggle(user.id, recipeId);
      setIsFavorite(nextState);
    } catch (err) {
      console.error("Failed to toggle favorite:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) return null;

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={loading}
      aria-label={isFavorite ? "Remove recipe from favorites" : "Save recipe to favorites"}
      className={cn(
        "inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all duration-200",
        isFavorite
          ? "border-rose-200 bg-rose-50 text-rose-600 shadow-xs hover:bg-rose-100"
          : "border-border bg-card text-muted-foreground shadow-xs hover:bg-muted hover:text-foreground",
        loading && "opacity-60 cursor-not-allowed",
        className
      )}
    >
      <Heart
        className={cn("h-4 w-4 transition-transform", isFavorite && "fill-rose-500 text-rose-500 scale-110")}
        aria-hidden="true"
      />
      <span>{isFavorite ? "Saved in Favorites" : "Save to Favorites"}</span>
    </button>
  );
}
