import { useState, type FormEvent } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { CookingPot, KeyRound, ArrowLeft } from "lucide-react";
import { resetPassword } from "@/services/authService";
import { Input } from "@/components/common/Input";
import { Button } from "@/components/common/Button";
import { Alert } from "@/components/common/Alert";
import { SiteLayout } from "@/components/layout/SiteLayout";

export const Route = createFileRoute("/reset-password")({
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);
  const email = params.get("email") || "";
  const token = params.get("token") || "";

  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    if (!password) {
      setError("Please enter a new password.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }
    if (password !== passwordConfirmation) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      const response = await resetPassword(email, token, password, passwordConfirmation);
      setMessage(response.message || "Password reset successfully!");
      // Redirect to login after a short delay
      setTimeout(() => navigate({ to: "/login" }), 2500);
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Password reset failed. The link may have expired."
      );
    } finally {
      setLoading(false);
    }
  };

  const missingParams = !email || !token;

  return (
    <SiteLayout>
      <div className="container-page flex min-h-[calc(100vh-220px)] items-center justify-center py-12">
        <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-card">
          {/* Header */}
          <div className="text-center">
            <span className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-primary text-primary-foreground shadow-sm">
              <CookingPot className="h-6 w-6" aria-hidden="true" />
            </span>
            <h1 className="mt-4 font-display text-2xl font-bold tracking-tight sm:text-3xl text-foreground">
              Set a new password
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Choose a strong password of at least 8 characters.
            </p>
          </div>

          {/* Alerts */}
          {error && (
            <Alert variant="error" className="mt-6" title="Reset Failed">
              {error}
            </Alert>
          )}

          {message && (
            <Alert variant="success" className="mt-6" title="Password Updated">
              {message} Redirecting you to the sign-in page…
            </Alert>
          )}

          {/* Invalid link state */}
          {missingParams && !message && (
            <Alert variant="error" className="mt-6" title="Invalid Reset Link">
              This password reset link is invalid or has expired. Please request
              a new one.
            </Alert>
          )}

          {/* Form */}
          {!missingParams && !message && (
            <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
              <Input
                label="New password"
                id="reset-password"
                type="password"
                autoComplete="new-password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Input
                label="Confirm new password"
                id="reset-password-confirm"
                type="password"
                autoComplete="new-password"
                required
                placeholder="••••••••"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
              />

              <Button
                type="submit"
                variant="primary"
                block
                size="lg"
                loading={loading}
                className="mt-2"
              >
                <KeyRound className="mr-2 h-4 w-4" />
                Reset Password
              </Button>
            </form>
          )}

          {/* Back to login */}
          <div className="mt-6 flex justify-center">
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}