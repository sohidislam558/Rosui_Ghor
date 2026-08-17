import { AlertCircle, CheckCircle2, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface AlertProps {
  variant?: "success" | "error" | "info";
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const styles = {
  success: "bg-success-soft text-foreground border-success/40",
  error: "bg-destructive-soft text-foreground border-destructive/40",
  info: "bg-primary-soft text-foreground border-primary/40",
};

const icons = { success: CheckCircle2, error: AlertCircle, info: Info };

export function Alert({ variant = "info", title, children, className }: AlertProps) {
  const Icon = icons[variant];
  return (
    <div
      role={variant === "error" ? "alert" : "status"}
      className={cn("flex items-start gap-3 rounded-md border p-3 text-sm", styles[variant], className)}
    >
      <Icon
        className={cn(
          "mt-0.5 h-4 w-4 shrink-0",
          variant === "error" && "text-destructive",
          variant === "success" && "text-success",
          variant === "info" && "text-primary",
        )}
        aria-hidden="true"
      />
      <div className="min-w-0">
        {title && <p className="font-semibold">{title}</p>}
        <div className="text-muted-foreground">{children}</div>
      </div>
    </div>
  );
}
