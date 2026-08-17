import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { LoginForm } from "@/components/auth/LoginForm";

interface LoginSearch {
  redirect?: string | undefined;
}

export const Route = createFileRoute("/login")({
  validateSearch: (search: Record<string, unknown>): LoginSearch => ({
    redirect: typeof search["redirect"] === "string" ? search["redirect"] : undefined,
  }),
  component: LoginPage,
});

function LoginPage() {
  const { redirect } = Route.useSearch();

  return (
    <SiteLayout>
      <div className="container-page flex min-h-[calc(100vh-220px)] items-center justify-center py-12">
        <LoginForm redirectTo={redirect} />
      </div>
    </SiteLayout>
  );
}
