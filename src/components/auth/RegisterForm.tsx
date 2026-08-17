import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { CookingPot } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Input } from "@/components/common/Input";
import { Button } from "@/components/common/Button";
import { Alert } from "@/components/common/Alert";

export function RegisterForm() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const nextErrors: Record<string, string> = {};
    if (!name.trim()) nextErrors["name"] = "Full name is required.";
    if (!email.trim()) {
      nextErrors["email"] = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors["email"] = "Please enter a valid email address.";
    }
    if (!password) {
      nextErrors["password"] = "Password is required.";
    } else if (password.length < 6) {
      nextErrors["password"] = "Password must be at least 6 characters.";
    }
    if (!passwordConfirmation) {
      nextErrors["password_confirmation"] = "Please confirm your password.";
    } else if (password !== passwordConfirmation) {
      nextErrors["password_confirmation"] = "Passwords do not match.";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validate()) return;

    try {
      setLoading(true);
      await register({
        name: name.trim(),
        email: email.trim(),
        password,
        password_confirmation: passwordConfirmation,
      });
      navigate({ to: "/recipes", replace: true });
    } catch (err: any) {
      if (err?.errors?.email) {
        setErrors((prev) => ({ ...prev, email: err.errors.email[0] }));
      }
      setError(err?.message || "Registration failed. Please check the form and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-card">
      <div className="text-center">
        <span className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-primary text-primary-foreground shadow-sm">
          <CookingPot className="h-6 w-6" aria-hidden="true" />
        </span>
        <h1 className="mt-4 font-display text-2xl font-bold tracking-tight sm:text-3xl text-foreground">
          Create an account
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Join Rosui Ghor to discover home-cooked recipes and save your favorites.
        </p>
      </div>

      {error && (
        <Alert variant="error" className="mt-6" title="Registration Error">
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
        <Input
          label="Full name"
          id="register-name"
          type="text"
          autoComplete="name"
          required
          placeholder="e.g. Fatima Rahman"
          value={name}
          error={errors["name"]}
          onChange={(e) => {
            setName(e.target.value);
            if (errors["name"]) setErrors((prev) => ({ ...prev, name: "" }));
          }}
        />

        <Input
          label="Email address"
          id="register-email"
          type="email"
          autoComplete="email"
          required
          placeholder="e.g. fatima@example.com"
          value={email}
          error={errors["email"]}
          onChange={(e) => {
            setEmail(e.target.value);
            if (errors["email"]) setErrors((prev) => ({ ...prev, email: "" }));
          }}
        />

        <Input
          label="Password"
          id="register-password"
          type="password"
          autoComplete="new-password"
          required
          placeholder="At least 6 characters"
          value={password}
          error={errors["password"]}
          onChange={(e) => {
            setPassword(e.target.value);
            if (errors["password"]) setErrors((prev) => ({ ...prev, password: "" }));
          }}
        />

        <Input
          label="Confirm password"
          id="register-password-confirmation"
          type="password"
          autoComplete="new-password"
          required
          placeholder="Re-enter password"
          value={passwordConfirmation}
          error={errors["password_confirmation"]}
          onChange={(e) => {
            setPasswordConfirmation(e.target.value);
            if (errors["password_confirmation"]) setErrors((prev) => ({ ...prev, password_confirmation: "" }));
          }}
        />

        <Button type="submit" variant="primary" block size="lg" loading={loading} className="mt-2">
          Create Account
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link to="/login" className="font-semibold text-primary hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
