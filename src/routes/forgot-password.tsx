import { useState, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CookingPot, ArrowLeft } from "lucide-react";
import { forgotPassword } from "@/services/authService";
import { Input } from "@/components/common/Input";
import { Button } from "@/components/common/Button";
import { Alert } from "@/components/common/Alert";
import { SiteLayout } from "@/components/layout/SiteLayout";

export const Route = createFileRoute("/forgot-password")({
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    try {
      setLoading(true);
      const response = await forgotPassword(email.trim());
      setMessage(
        response.message || "Password reset link sent! Check your inbox."
      );
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
        err?.message ||
        "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

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
              Forgot Password?
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              No worries! Enter your email address and we'll send you a link to
              reset your password.
            </p>
          </div>

          {/* Alerts */}
          {error && (
            <Alert variant="error" className="mt-6" title="Request Failed">
              {error}
            </Alert>
          )}

          {message && (
            <Alert variant="success" className="mt-6" title="Email Sent">
              {message}
            </Alert>
          )}

          {/* Form */}
          {!message && (
            <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
              <Input
                label="Email address"
                id="forgot-email"
                type="email"
                autoComplete="email"
                required
                placeholder="e.g. user@rosuighor.test"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Button
                type="submit"
                variant="primary"
                block
                size="lg"
                loading={loading}
                className="mt-2"
              >
                Send Reset Link
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