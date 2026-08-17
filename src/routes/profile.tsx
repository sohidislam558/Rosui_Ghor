import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { User, Mail, Shield, Calendar, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { ProfileForm } from "@/components/user/ProfileForm";
import { Button } from "@/components/common/Button";

export const Route = createFileRoute("/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate({ to: "/login", replace: true });
  };

  const formattedDate = user?.created_at
    ? new Date(user.created_at).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "Recently";

  return (
    <SiteLayout>
      <ProtectedRoute>
        <div className="container-page py-10">
          <div className="max-w-3xl mx-auto space-y-8">
            {/* Header */}
            <div>
              <h1 className="font-display text-3xl font-bold tracking-tight text-foreground">
                My Profile
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Manage your account credentials and personal preferences.
              </p>
            </div>

            {/* Account Overview Card */}
            <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-card">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="grid h-16 w-16 place-items-center rounded-2xl bg-primary text-primary-foreground font-display text-2xl font-bold shadow-sm">
                    {user?.name?.charAt(0).toUpperCase() ?? "U"}
                  </div>
                  <div>
                    <h2 className="font-display text-xl font-bold text-foreground">{user?.name}</h2>
                    <p className="text-sm text-muted-foreground flex items-center gap-1.5 mt-0.5">
                      <Mail className="h-3.5 w-3.5" />
                      <span>{user?.email}</span>
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 rounded-full bg-secondary-soft px-2.5 py-0.5 text-xs font-semibold text-secondary">
                        <Shield className="h-3 w-3" />
                        <span className="capitalize">{user?.role} Account</span>
                      </span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        Joined {formattedDate}
                      </span>
                    </div>
                  </div>
                </div>

                <Button variant="secondary" onClick={handleLogout} className="sm:self-start">
                  <LogOut className="h-4 w-4 mr-1.5" />
                  Sign Out
                </Button>
              </div>
            </div>

            {/* Edit Profile Information Form */}
            <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-card">
              <h2 className="font-display text-lg font-bold text-foreground border-b border-border/80 pb-4">
                Update Account Information
              </h2>
              <div className="mt-6">
                <ProfileForm />
              </div>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    </SiteLayout>
  );
}
