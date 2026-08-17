import { useState, type FormEvent } from "react";
import { User, Mail, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { userService } from "@/services/userService";
import { Input } from "@/components/common/Input";
import { Button } from "@/components/common/Button";
import { Alert } from "@/components/common/Alert";

export function ProfileForm() {
  const { user, updateUser } = useAuth();

  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setError(null);
    setSuccess(false);

    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }

    try {
      setLoading(true);
      const updated = await userService.updateProfile(user.id, {
        name: name.trim(),
        email: email.trim(),
      });
      updateUser(updated);
      setSuccess(true);
    } catch (err: any) {
      setError(err?.message || "Failed to update profile information.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      {success && (
        <Alert variant="success" title="Profile Updated">
          Your profile information has been saved successfully.
        </Alert>
      )}

      {error && (
        <Alert variant="error" title="Update Failed">
          {error}
        </Alert>
      )}

      <Input
        label="Full Name"
        id="profile-name"
        type="text"
        required
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          setSuccess(false);
        }}
      />

      <Input
        label="Email Address"
        id="profile-email"
        type="email"
        required
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setSuccess(false);
        }}
      />

      <div className="pt-2">
        <Button type="submit" variant="primary" loading={loading}>
          Save Profile Changes
        </Button>
      </div>
    </form>
  );
}
