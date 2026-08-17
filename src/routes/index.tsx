import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, Sparkles, Utensils, Clock, ChefHat, FolderTree, BookOpen } from "lucide-react";
import type { Recipe, Category } from "@/types";
import { recipeService } from "@/services/recipeService";
import { categoryService } from "@/services/categoryService";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { RecipeCard } from "@/components/recipe/RecipeCard";
import { RecipeCardSkeleton } from "@/components/common/States";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  const [featured, setFeatured] = useState<Recipe[]>([]);
  const [latest, setLatest] = useState<Recipe[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [featData, latestData, catData] = await Promise.all([
          recipeService.featured(3),
          recipeService.latest(4),
          categoryService.list(),
        ]);
        setFeatured(featData);
        setLatest(latestData);
        setCategories(catData);
      } catch (err) {
        console.error("Failed to load home page data:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <SiteLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-12 md:py-20 lg:py-24">
        <div className="container-page grid items-center gap-12 lg:grid-cols-12">
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-soft px-3.5 py-1.5 text-xs font-semibold text-primary shadow-xs">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Simple, Authentic Home Cooking</span>
            </div>

            <h1 className="font-display text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl leading-[1.1]">
              Discover Delicious <span className="text-primary">Homemade</span> Recipes
            </h1>

            <p className="max-w-xl text-base sm:text-lg leading-relaxed text-muted-foreground">
              A warm kitchen of simple, comforting recipes crafted for everyday cooks. Explore aromatic curries, quick weekday lunches, and wholesome weekend feasts.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/recipes"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-md transition-all hover:bg-primary-hover hover:shadow-lg"
              >
                <Utensils className="h-4 w-4" aria-hidden="true" />
                <span>Explore All Recipes</span>
              </Link>

              <a
                href="#categories"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-6 py-3.5 text-sm font-semibold text-foreground shadow-xs transition-all hover:bg-muted"
              >
                <span>Browse Categories</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>

            {/* Quick Stats Highlights */}
            <div className="grid grid-cols-3 gap-4 border-t border-border/80 pt-6">
              <div>
                <p className="font-display text-2xl font-bold text-foreground">12+</p>
                <p className="text-xs text-muted-foreground">Curated Recipes</p>
              </div>
              <div>
                <p className="font-display text-2xl font-bold text-foreground">4</p>
                <p className="text-xs text-muted-foreground">Meal Categories</p>
              </div>
              <div>
                <p className="font-display text-2xl font-bold text-foreground">100%</p>
                <p className="text-xs text-muted-foreground">Tested in Kitchen</p>
              </div>
            </div>
          </div>

          {/* Right Hero Image Card */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-card-hover">
                <img
                  src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=75"
                  alt="Fragrant bowl of slow-simmered curry"
                  className="aspect-[4/3] w-full object-cover"
                />
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-secondary-soft px-3 py-1 text-xs font-semibold text-secondary">
                      Dinner Classic
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground font-medium">
                      <Clock className="h-3.5 w-3.5 text-primary" /> 55 mins
                    </span>
                  </div>
                  <h2 className="mt-2 font-display text-lg font-bold text-foreground">
                    Slow-Simmered Chicken Curry
                  </h2>
                  <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                    A fragrant weeknight curry with warm spices and a silky tomato base.
                  </p>
                </div>
              </div>

              {/* Decorative Accent Badge */}
              <div className="absolute -bottom-4 -left-4 hidden sm:flex items-center gap-3 rounded-xl border border-border bg-background/95 backdrop-blur p-3.5 shadow-card">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary text-primary-foreground">
                  <ChefHat className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-foreground">Beginner Friendly</p>
                  <p className="text-[11px] text-muted-foreground">Step-by-step guidance</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Recipes Section */}
      <section className="border-t border-border/80 bg-card py-16">
        <div className="container-page">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Chef's Choice</span>
              </div>
              <h2 className="mt-1 font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Featured Recipes
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Handpicked favorites loved for their deep flavors and approachable prep.
              </p>
            </div>

            <Link
              to="/recipes"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
            >
              <span>Explore all recipes</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {loading
              ? Array.from({ length: 3 }).map((_, i) => <RecipeCardSkeleton key={i} />)
              : featured.map((r) => <RecipeCard key={r.id} recipe={r} />)}
          </div>
        </div>
      </section>

      {/* Categories Explorer Section */}
      <section id="categories" className="py-16">
        <div className="container-page">
          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-secondary">
              <FolderTree className="h-3.5 w-3.5" />
              <span>Explore by Meal</span>
            </div>
            <h2 className="mt-1 font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Browse by Category
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Whatever the time of day, find the perfect plate to whip up in your kitchen.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to="/recipes"
                search={{ categoryId: cat.id }}
                className="group flex flex-col justify-between rounded-2xl border border-border bg-card p-6 shadow-card transition-all duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-card-hover"
              >
                <div>
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary-soft text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <BookOpen className="h-6 w-6" />
                  </span>
                  <h3 className="mt-4 font-display text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {cat.name}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {cat.description}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-border/60 pt-4 text-xs">
                  <span className="font-semibold text-foreground">
                    {cat.recipes_count ?? 0} {cat.recipes_count === 1 ? "recipe" : "recipes"}
                  </span>
                  <span className="flex items-center gap-1 font-semibold text-primary group-hover:translate-x-0.5 transition-transform">
                    <span>Browse</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Recipes Section */}
      <section className="border-t border-border/80 bg-card py-16">
        <div className="container-page">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Latest Kitchen Additions
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Freshly added recipes straight from our test kitchen.
              </p>
            </div>

            <Link
              to="/recipes"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
            >
              <span>View full recipe collection</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {loading
              ? Array.from({ length: 4 }).map((_, i) => <RecipeCardSkeleton key={i} />)
              : latest.map((r) => <RecipeCard key={r.id} recipe={r} />)}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20">
        <div className="container-page">
          <div className="relative overflow-hidden rounded-3xl bg-secondary px-6 py-12 text-center text-secondary-foreground shadow-card sm:px-12 md:py-16">
            <h2 className="font-display text-3xl font-bold sm:text-4xl text-white">
              Ready to Cook Something Wonderful?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm sm:text-base leading-relaxed text-secondary-foreground/90">
              Create a free account to unlock full ingredient measurements, detailed step-by-step instructions, and save your favourite dishes for quick access.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                to="/register"
                className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-md transition-all hover:bg-primary-hover hover:shadow-lg"
              >
                Create Free Account
              </Link>
              <Link
                to="/recipes"
                className="inline-flex items-center justify-center rounded-xl border border-white/30 bg-white/10 backdrop-blur px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-white/20"
              >
                Explore Recipes First
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
