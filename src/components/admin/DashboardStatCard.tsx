import type { LucideIcon } from "lucide-react";

interface DashboardStatCardProps {
  title: string;
  value: number | string;
  description?: string;
  icon: LucideIcon;
  color?: "amber" | "green" | "blue";
}

const colorStyles = {
  amber: "bg-amber-50 text-amber-600 border-amber-200/60",
  green: "bg-emerald-50 text-emerald-600 border-emerald-200/60",
  blue: "bg-blue-50 text-blue-600 border-blue-200/60",
};

export function DashboardStatCard({
  title,
  value,
  description,
  icon: Icon,
  color = "amber",
}: DashboardStatCardProps) {
  const iconClass = colorStyles[color];

  return (
    <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-6 shadow-card transition-shadow hover:shadow-card-hover">
      <div className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl border ${iconClass}`}>
        <Icon className="h-6 w-6" aria-hidden="true" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{title}</p>
        <p className="mt-1 font-display text-3xl font-bold tracking-tight text-foreground">{value}</p>
        {description && <p className="mt-1 text-xs text-muted-foreground">{description}</p>}
      </div>
    </div>
  );
}
