import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Utensils, RotateCcw } from "lucide-react";
import type { Category, Recipe, Pagination } from "@/types";
import { recipeService } from "@/services/recipeService";
import { categoryService } from "@/services/categoryService";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { SearchBar } from "@/components/recipe/SearchBar";
import { CategoryFilter } from "@/components/recipe/CategoryFilter";
import { RecipeGrid } from "@/components/recipe/RecipeGrid";
import { Button } from "@/components/common/Button";

interface RecipeSearchState {
  search?: string | undefined;
  categoryId?: number | undefined;
  page?: number | undefined;
}

export const Route = createFileRoute("/recipes/")({
  validateSearch: (search: Record<string, unknown>): RecipeSearchState => ({
    search: typeof search["search"] === "string" ? search["search"] : undefined,
    categoryId: typeof search["categoryId"] === "number" ? search["categoryId"] : undefined,
    page: typeof search["page"] === "number" ? search["page"] : undefined,
  }),
  component: RecipesPage,
});

function RecipesPage() {
  const searchParams = Route.useSearch();
  const navigate = useNavigate({ from: "/recipes/" });

  const [search, setSearch] = useState(searchParams.search ?? "");
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    searchParams.categoryId ?? null
  );
  const [page, setPage] = useState(searchParams.page ?? 1);

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    current_page: 1,
    last_page: 1,
    per_page: 8,
    total: 0,
  });
  const [loading, setLoading] = useState(true);

  // Sync state if URL search parameters change externally
  useEffect(() => {
    if (searchParams.search !== undefined && searchParams.search !== search) {
      setSearch(searchParams.search);
    }
    if (searchParams.categoryId !== undefined && searchParams.categoryId !== selectedCategoryId) {
      setSelectedCategoryId(searchParams.categoryId);
    }
    if (searchParams.page !== undefined && searchParams.page !== page) {
      setPage(searchParams.page);
    }
  }, [searchParams]);

  // Load Categories on mount
  useEffect(() => {
    categoryService.list().then(setCategories).catch(console.error);
  }, []);

  // Fetch recipes whenever search, categoryId, or page changes
  useEffect(() => {
    let active = true;
    async function loadRecipes() {
      try {
        setLoading(true);
        const res = await recipeService.list({
          search,
          categoryId: selectedCategoryId,
          page,
          perPage: 8,
        });
        if (active) {
          setRecipes(res.data);
          setPagination(res.meta);
        }
      } catch (err) {
        console.error("Failed to fetch recipes:", err);
      } finally {
        if (active) setLoading(false);
      }
    }

    loadRecipes();
    return () => {
      active = false;
    };
  }, [search, selectedCategoryId, page]);

  const handleSearchChange = (val: string) => {
    setSearch(val);
    setPage(1);
    navigate({
      search: (prev: RecipeSearchState) => {
        const next: RecipeSearchState = { ...prev, page: 1 };
        if (val) next.search = val;
        else delete next.search;
        return next;
      },
      replace: true,
    });
  };

  const handleSelectCategory = (catId: number | null) => {
    setSelectedCategoryId(catId);
    setPage(1);
    navigate({
      search: (prev: RecipeSearchState) => {
        const next: RecipeSearchState = { ...prev, page: 1 };
        if (catId !== null) next.categoryId = catId;
        else delete next.categoryId;
        return next;
      },
      replace: true,
    });
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    navigate({
      search: (prev: RecipeSearchState) => ({
        ...prev,
        page: newPage,
      }),
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleResetFilters = () => {
    setSearch("");
    setSelectedCategoryId(null);
    setPage(1);
    navigate({
      search: () => ({}),
      replace: true,
    });
  };

  const hasActiveFilters = Boolean(search || selectedCategoryId !== null);

  return (
    <SiteLayout>
      <div className="container-page py-10">
        {/* Page Header */}
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
            <Utensils className="h-3.5 w-3.5" />
            <span>Recipe Collection</span>
          </div>
          <h1 className="mt-1 font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Explore All Recipes
          </h1>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            Browse our library of tried and tested everyday recipes. Filter by meal category or search for specific dishes.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="mt-8 space-y-4 rounded-2xl border border-border bg-card p-4 sm:p-6 shadow-card">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <SearchBar
              value={search}
              onChange={handleSearchChange}
              placeholder="Search recipes by title (e.g. Masala Omelette, Pancakes)…"
              className="flex-1"
            />
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleResetFilters}
                className="shrink-0 text-muted-foreground hover:text-foreground"
              >
                <RotateCcw className="h-3.5 w-3.5 mr-1" />
                Reset Filters
              </Button>
            )}
          </div>

          <CategoryFilter
            categories={categories}
            selectedCategoryId={selectedCategoryId}
            onSelectCategory={handleSelectCategory}
          />
        </div>

        {/* Results Metadata */}
        <div className="mt-6 flex items-center justify-between text-xs text-muted-foreground">
          <p>
            Showing <span className="font-semibold text-foreground">{recipes.length}</span> of{" "}
            <span className="font-semibold text-foreground">{pagination.total}</span> recipes
          </p>
          {pagination.last_page > 1 && (
            <p>
              Page {pagination.current_page} of {pagination.last_page}
            </p>
          )}
        </div>

        {/* Recipe Grid */}
        <div className="mt-6">
          <RecipeGrid
            recipes={recipes}
            loading={loading}
            onClearFilters={hasActiveFilters ? handleResetFilters : undefined}
          />
        </div>

        {/* Pagination UI */}
        {pagination.last_page > 1 && (
          <nav aria-label="Pagination" className="mt-12 flex items-center justify-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              disabled={pagination.current_page <= 1 || loading}
              onClick={() => handlePageChange(pagination.current_page - 1)}
              aria-label="Previous page"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Previous</span>
            </Button>

            <div className="flex items-center gap-1 px-2">
              {Array.from({ length: pagination.last_page }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => handlePageChange(p)}
                  aria-current={p === pagination.current_page ? "page" : undefined}
                  className={`h-9 w-9 rounded-lg text-xs font-semibold transition-colors ${
                    p === pagination.current_page
                      ? "bg-primary text-primary-foreground shadow-xs"
                      : "border border-border bg-card text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>

            <Button
              variant="secondary"
              size="sm"
              disabled={pagination.current_page >= pagination.last_page || loading}
              onClick={() => handlePageChange(pagination.current_page + 1)}
              aria-label="Next page"
            >
              <span>Next</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </nav>
        )}
      </div>
    </SiteLayout>
  );
}
