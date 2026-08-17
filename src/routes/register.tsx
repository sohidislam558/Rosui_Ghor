import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { RegisterForm } from "@/components/auth/RegisterForm";

export const Route = createFileRoute("/register")({
  component: RegisterPage,
});

function RegisterPage() {
  return (
    <SiteLayout>
      <div className="container-page flex min-h-[calc(100vh-220px)] items-center justify-center py-12">
        <RegisterForm />
      </div>
    </SiteLayout>
  );
}
