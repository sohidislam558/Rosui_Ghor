import { Link } from "@tanstack/react-router";
import { CookingPot } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-card">
      <div className="container-page grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2">
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-secondary text-secondary-foreground">
              <CookingPot className="h-4 w-4" aria-hidden="true" />
            </span>
            <span className="font-display text-xl font-bold">Rosui Ghor</span>
          </div>
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">
            A warm, simple home for everyday recipes — discover something to cook tonight and keep your
            favourites close.
          </p>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide">Browse</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/" className="hover:text-foreground">Home</Link>
            </li>
            <li>
              <Link to="/recipes" className="hover:text-foreground">All recipes</Link>
            </li>
            <li>
              <Link to="/" hash="categories" className="hover:text-foreground">Categories</Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide">Account</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/login" className="hover:text-foreground">Login</Link>
            </li>
            <li>
              <Link to="/register" className="hover:text-foreground">Register</Link>
            </li>
            <li>
              <Link to="/profile" className="hover:text-foreground">Profile</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="container-page border-t border-border py-6 text-xs text-muted-foreground">
        © {new Date().getFullYear()} Rosui Ghor. A university course project.
      </div>
    </footer>
  );
}
