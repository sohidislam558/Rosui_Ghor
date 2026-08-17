import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Users, UtensilsCrossed, FolderTree, Plus, ArrowRight } from "lucide-react";
import type { Recipe } from "@/types";
import { userService } from "@/services/userService";
import { recipeService } from "@/services/recipeService";
import { categoryService } from "@/services/categoryService";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { DashboardStatCard } from "@/components/admin/DashboardStatCard";
import { Button } from "@/components/common/Button";
import { LoadingIndicator } from "@/components/common/States";
import { recipeImage } from "@/services/mockDb";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboardPage,
});

function AdminDashboardPage() {
  const [userCount, setUserCount] = useState<number>(0);
  const [recipeCount, setRecipeCount] = useState<number>(0);
  const [categoryCount, setCategoryCount] = useState<number>(0);
  const [recentRecipes, setRecentRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        setLoading(true);
        const [users, recipesRes, categories, recent] = await Promise.all([
          userService.count(),
          recipeService.list({ perPage: 1 }),
          categoryService.list(),
          recipeService.latest(5),
        ]);
        setUserCount(users);
        setRecipeCount(recipesRes.meta.total);
        setCategoryCount(categories.length);
        setRecentRecipes(recent);
      } catch (err) {
        console.error("Failed to load admin stats:", err);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  return (
    <ProtectedRoute requireAdmin>
      <AdminLayout
        title="Admin Dashboard"
        description="Overview of Rosui Ghor system records and content management."
        actions={
          <div className="flex flex-wrap gap-2">
            <Link to="/admin/recipes/create">
              <Button variant="primary" size="sm">
                <Plus className="h-4 w-4 mr-1" />
                Add New Recipe
              </Button>
            </Link>
          </div>
        }
      >
        {loading ? (
          <LoadingIndicator label="Loading dashboard data…" />
        ) : (
          <div className="space-y-8">
            {/* 3 Metric Cards */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              <DashboardStatCard
                title="Total Users"
                value={userCount}
                description="Registered accounts"
                icon={Users}
                color="blue"
              />
              <DashboardStatCard
                title="Total Recipes"
                value={recipeCount}
                description="Active published recipes"
                icon={UtensilsCrossed}
                color="amber"
              />
              <DashboardStatCard
                title="Categories"
                value={categoryCount}
                description="Organized meal courses"
                icon={FolderTree}
                color="green"
              />
            </div>

            {/* Quick Actions & Recent Recipes */}
            <div className="rounded-xl border border-border bg-card p-6 shadow-card">
              <div className="flex items-center justify-between border-b border-border/80 pb-4">
                <div>
                  <h2 className="font-display text-lg font-bold text-foreground">Recent Recipes</h2>
                  <p className="text-xs text-muted-foreground">Latest recipes added to the catalogue.</p>
                </div>
                <Link
                  to="/admin/recipes"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                >
                  <span>Manage all</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              <div className="mt-4 divide-y divide-border/60">
                {recentRecipes.map((r) => (
                  <div key={r.id} className="flex items-center justify-between py-3 gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={recipeImage(r)}
                        alt={r.title}
                        className="h-10 w-10 shrink-0 rounded-lg object-cover bg-muted"
                      />
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-foreground truncate">{r.title}</p>
                        <p className="text-xs text-muted-foreground">{r.category?.name ?? "General"} • {r.cooking_time} mins</p>
                      </div>
                    </div>

                    <Link
                      to="/admin/recipes/$id/edit"
                      params={{ id: String(r.id) }}
                      className="shrink-0 text-xs font-medium text-primary hover:underline"
                    >
                      Edit
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </AdminLayout>
    </ProtectedRoute>
  );
}
