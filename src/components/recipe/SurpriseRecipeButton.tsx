import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { recipeService } from "@/services/recipeService";
import { Button } from "@/components/common/Button";

interface SurpriseRecipeButtonProps {
    variant?: "primary" | "secondary" | "ghost" | "green";
    size?: "sm" | "md" | "lg" | "icon";
    className?: string;
    label?: string;
}

export function SurpriseRecipeButton({
    variant = "secondary",
    size = "md",
    className,
    label = "Surprise Me",
}: SurpriseRecipeButtonProps) {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSurpriseMe = async () => {
        try {
            setLoading(true);
            // Fetch all recipes from your service
            const recipes = await recipeService.all();

            if (!recipes || recipes.length === 0) {
                alert("No recipes available at the moment.");
                return;
            }

            // Pick a random recipe
            const randomIndex = Math.floor(Math.random() * recipes.length);
            const randomRecipe = recipes[randomIndex];

            // Navigate to the chosen recipe's details page
            navigate({
                to: "/recipes/$id",
                params: { id: String(randomRecipe.id) },
            });
        } catch (error) {
            console.error("Failed to fetch random recipe:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button
            variant={variant}
            size={size}
            loading={loading}
            onClick={handleSurpriseMe}
            className={className}
            title="Open a random recipe"
        >
            <Sparkles className="h-4 w-4 text-amber-500" aria-hidden="true" />
            <span>{label}</span>
        </Button>
    );
}
