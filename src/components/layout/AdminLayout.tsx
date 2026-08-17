import { useState, type ReactNode } from "react";
import { PanelLeft } from "lucide-react";
import { Navbar } from "./Navbar";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

interface AdminLayoutProps {
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
}

export function AdminLayout({ title, description, actions, children }: AdminLayoutProps) {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="container-page w-full flex-1 py-8">
        <div className="lg:grid lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-10">
          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-xl border border-border bg-card p-3">
              <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Administration
              </p>
              <AdminSidebar />
            </div>
          </aside>

          <div className="min-w-0">
            <button
              type="button"
              onClick={() => setNavOpen((v) => !v)}
              aria-expanded={navOpen}
              className="mb-4 inline-flex h-11 items-center gap-2 rounded-md border border-border bg-card px-4 text-sm font-medium lg:hidden"
            >
              <PanelLeft className="h-4 w-4" aria-hidden="true" />
              Admin menu
            </button>
            {navOpen && (
              <div className="mb-6 rounded-xl border border-border bg-card p-3 lg:hidden">
                <AdminSidebar onNavigate={() => setNavOpen(false)} />
              </div>
            )}

            <header className="grid gap-4 sm:flex sm:items-center sm:justify-between">
              <div className="min-w-0">
                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h1>
                {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
              </div>
              {actions}
            </header>

            <div className="mt-8">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
