import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { CookingPot, UserCheck, ShieldCheck } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Input } from "@/components/common/Input";
import { Button } from "@/components/common/Button";
import { Alert } from "@/components/common/Alert";

interface LoginFormProps {
  redirectTo?: string | undefined;
}

export function LoginForm({ redirectTo }: LoginFormProps) {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }
    if (!password) {
      setError("Please enter your password.");
      return;
    }

    try {
      setLoading(true);
      const user = await login({ email: email.trim(), password });

      if (redirectTo && redirectTo !== "/login" && redirectTo !== "/register") {
        navigate({ to: redirectTo as any, replace: true });
      } else if (user.role === "admin") {
        navigate({ to: "/admin", replace: true });
      } else {
        navigate({ to: "/recipes", replace: true });
      }
    } catch (err: any) {
      setError(err?.message || "Invalid credentials. Please verify and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleQuickFill = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword("password");
    setError(null);
  };

  return (
    <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-card">
      <div className="text-center">
        <span className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-primary text-primary-foreground shadow-sm">
          <CookingPot className="h-6 w-6" aria-hidden="true" />
        </span>
        <h1 className="mt-4 font-display text-2xl font-bold tracking-tight sm:text-3xl text-foreground">
          Welcome back
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Sign in to your Rosui Ghor account to explore recipe details and save your favorites.
        </p>
      </div>

      {error && (
        <Alert variant="error" className="mt-6" title="Login Failed">
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
        <Input
          label="Email address"
          id="login-email"
          type="email"
          autoComplete="email"
          required
          placeholder="e.g. user@rosuighor.test"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          label="Password"
          id="login-password"
          type="password"
          autoComplete="current-password"
          required
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button type="submit" variant="primary" block size="lg" loading={loading} className="mt-2">
          Sign in
        </Button>
      </form>

      {/* Quick Demo Login Credentials helper */}
      <div className="mt-6 rounded-xl border border-border/80 bg-background/50 p-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Demo Credentials:
        </p>
        <div className="mt-2 flex flex-col sm:flex-row gap-2">
          <button
            type="button"
            onClick={() => handleQuickFill("user@rosuighor.test")}
            className="flex-1 flex items-center justify-center gap-1.5 rounded-lg border border-border bg-card py-2 px-3 text-xs font-medium text-foreground transition-colors hover:bg-muted hover:border-primary/40"
          >
            <UserCheck className="h-3.5 w-3.5 text-primary" />
            <span>User Demo</span>
          </button>
          <button
            type="button"
            onClick={() => handleQuickFill("admin@rosuighor.test")}
            className="flex-1 flex items-center justify-center gap-1.5 rounded-lg border border-border bg-card py-2 px-3 text-xs font-medium text-foreground transition-colors hover:bg-muted hover:border-primary/40"
          >
            <ShieldCheck className="h-3.5 w-3.5 text-secondary" />
            <span>Admin Demo</span>
          </button>
        </div>
      </div>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Don&apos;t have an account yet?{" "}
        <Link to="/register" className="font-semibold text-primary hover:underline">
          Create an account
        </Link>
      </p>
    </div>
  );
}
