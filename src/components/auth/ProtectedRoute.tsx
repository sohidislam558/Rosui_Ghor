import { useNavigate } from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { useAuth } from "@/context/AuthContext";
import { LoadingIndicator, UnauthorizedState } from "@/components/common/States";
import { Button } from "@/components/common/Button";

interface ProtectedRouteProps {
  children: ReactNode;
  requireAdmin?: boolean;
}

export function ProtectedRoute({ children, requireAdmin = false }: ProtectedRouteProps) {
  const { isReady, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isReady && !isAuthenticated) {
      navigate({
        to: "/login",
        search: { redirect: window.location.pathname },
        replace: true,
      });
    }
  }, [isReady, isAuthenticated, navigate]);

  if (!isReady) {
    return (
      <div className="container-page flex min-h-[60vh] items-center justify-center">
        <LoadingIndicator label="Checking authorization…" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="container-page flex min-h-[60vh] items-center justify-center py-12">
        <UnauthorizedState
          title="Authentication Required"
          description="You must be logged in to view this content."
        />
      </div>
    );
  }

  if (requireAdmin && !isAdmin) {
    return (
      <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-12">
        <UnauthorizedState
          title="Access Restricted"
          description="This section is reserved for administrators only."
        />
        <Button
          variant="secondary"
          className="mt-6"
          onClick={() => navigate({ to: "/recipes", replace: true })}
        >
          Back to Recipes
        </Button>
      </div>
    );
  }

  return <>{children}</>;
}
