import { Link, useNavigate } from "@tanstack/react-router";
import { CookingPot, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/common/Button";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  to: string;
  hash?: string | undefined;
}

const guestNav: NavItem[] = [
  { label: "Home", to: "/" },
  { label: "Recipes", to: "/recipes" },
  { label: "Categories", to: "/", hash: "categories" },
];

const userNav: NavItem[] = [
  { label: "Home", to: "/" },
  { label: "Recipes", to: "/recipes" },
  { label: "Profile", to: "/profile" },
];

const adminNav: NavItem[] = [
  { label: "Home", to: "/" },
  { label: "Recipes", to: "/recipes" },
  { label: "Admin Dashboard", to: "/admin" },
];

export function Navbar() {
  const { isAuthenticated, isAdmin, user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const items = isAdmin ? adminNav : isAuthenticated ? userNav : guestNav;

  const handleLogout = async () => {
    setOpen(false);
    await logout();
    navigate({ to: "/login", replace: true });
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <div className="container-page grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 py-3 lg:py-4">
        <Link to="/" className="flex min-w-0 items-center gap-2" onClick={() => setOpen(false)}>
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground shadow-xs">
            <CookingPot className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="truncate font-display text-xl font-bold tracking-tight sm:text-2xl text-foreground">
            Rosui Ghor
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {items.map((item) => (
            <Link
              key={item.label}
              to={item.to as any}
              {...(item.hash ? { hash: item.hash } : {})}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              activeOptions={{ exact: item.to === "/" && !item.hash, includeHash: false }}
              activeProps={{ className: "text-foreground font-semibold bg-muted/60" }}
            >
              {item.label}
            </Link>
          ))}
          <span className="mx-2 h-6 w-px bg-border" aria-hidden="true" />
          {isAuthenticated ? (
            <>
              <span className="max-w-36 truncate px-2 text-sm text-muted-foreground font-medium">
                {user?.name}
              </span>
              <Button variant="secondary" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4" aria-hidden="true" />
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                )}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-xs transition-colors hover:bg-primary-hover"
              >
                Register
              </Link>
            </>
          )}
        </nav>

        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-lg border border-border bg-card md:hidden shadow-xs"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="border-t border-border bg-card md:hidden animate-in slide-in-from-top-2 duration-200 shadow-card"
        >
          <div className="container-page flex flex-col py-3">
            {items.map((item) => (
              <Link
                key={item.label}
                to={item.to as any}
                {...(item.hash ? { hash: item.hash } : {})}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-base font-medium text-foreground transition-colors hover:bg-muted"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-3 flex flex-col gap-2 border-t border-border pt-3">
              {isAuthenticated ? (
                <Button variant="secondary" block onClick={handleLogout}>
                  <LogOut className="h-4 w-4" aria-hidden="true" />
                  Logout
                </Button>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setOpen(false)}
                    className="flex h-11 items-center justify-center rounded-lg border border-border text-sm font-medium text-foreground hover:bg-muted"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setOpen(false)}
                    className="flex h-11 items-center justify-center rounded-lg bg-primary text-sm font-semibold text-primary-foreground hover:bg-primary-hover shadow-xs"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
