import { Link } from "@tanstack/react-router";
import { FolderTree, LayoutDashboard, UtensilsCrossed } from "lucide-react";

const links = [
  { label: "Dashboard", to: "/admin", icon: LayoutDashboard, exact: true },
  { label: "Recipes", to: "/admin/recipes", icon: UtensilsCrossed, exact: false },
  { label: "Categories", to: "/admin/categories", icon: FolderTree, exact: false },
];

export function AdminSidebar({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav aria-label="Admin" className="flex flex-col gap-1">
      {links.map(({ label, to, icon: Icon, exact }) => (
        <Link
          key={to}
          to={to}
          onClick={onNavigate}
          activeOptions={{ exact }}
          className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          activeProps={{ className: "bg-primary-soft text-foreground" }}
        >
          <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
          {label}
        </Link>
      ))}
    </nav>
  );
}
