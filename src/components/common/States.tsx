import { AlertTriangle, Loader2, SearchX, ShieldAlert } from "lucide-react";
import { Button } from "./Button";
import { cn } from "@/lib/utils";

export function LoadingIndicator({
  label = "Loading…",
  className,
}: {
  label?: string | undefined;
  className?: string | undefined;
}) {
  return (
    <div role="status" className={cn("flex flex-col items-center gap-3 py-16 text-muted-foreground", className)}>
      <Loader2 className="h-6 w-6 animate-spin text-primary" aria-hidden="true" />
      <p className="text-sm">{label}</p>
    </div>
  );
}

export function RecipeCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card">
      <div className="aspect-[4/3] w-full animate-pulse bg-muted" />
      <div className="space-y-3 p-5">
        <div className="h-3 w-20 animate-pulse rounded bg-muted" />
        <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
        <div className="h-3 w-1/2 animate-pulse rounded bg-muted" />
      </div>
    </div>
  );
}

interface StateProps {
  title: string;
  description?: string | undefined;
  actionLabel?: string | undefined;
  onAction?: (() => void) | undefined;
  className?: string | undefined;
}

export function EmptyState({ title, description, actionLabel, onAction, className }: StateProps) {
  return (
    <div className={cn("rounded-xl border border-dashed border-border bg-card px-6 py-16 text-center", className)}>
      <SearchX className="mx-auto h-8 w-8 text-muted-foreground" aria-hidden="true" />
      <h3 className="mt-4 text-lg font-semibold">{title}</h3>
      {description && <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">{description}</p>}
      {actionLabel && onAction && (
        <Button variant="secondary" className="mt-6" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}

export function ErrorState({ title, description, actionLabel = "Try again", onAction, className }: StateProps) {
  return (
    <div
      role="alert"
      className={cn("rounded-xl border border-destructive/30 bg-destructive-soft px-6 py-16 text-center", className)}
    >
      <AlertTriangle className="mx-auto h-8 w-8 text-destructive" aria-hidden="true" />
      <h3 className="mt-4 text-lg font-semibold">{title}</h3>
      {description && <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">{description}</p>}
      {onAction && (
        <Button variant="secondary" className="mt-6" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}

export function UnauthorizedState({ title, description, className }: StateProps) {
  return (
    <div className={cn("rounded-xl border border-border bg-card px-6 py-16 text-center", className)}>
      <ShieldAlert className="mx-auto h-8 w-8 text-primary" aria-hidden="true" />
      <h3 className="mt-4 text-lg font-semibold">{title}</h3>
      {description && <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">{description}</p>}
    </div>
  );
}
