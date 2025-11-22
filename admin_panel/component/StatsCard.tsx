import { ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: ReactNode;
  trend?: ReactNode;
}

export default function StatsCard({
  title,
  value,
  change,
  changeType = "neutral",
  icon,
  trend,
}: StatsCardProps) {
  return (
    <Card className="p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 animate-scale-in group">
      <div className="flex items-start justify-between">
        <div className="space-y-2 flex-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="space-y-1">
            <h3 className="text-3xl font-bold tracking-tight">{value}</h3>
            {change && (
              <p
                className={cn(
                  "text-xs font-medium flex items-center gap-1",
                  changeType === "positive" && "text-success",
                  changeType === "negative" && "text-destructive",
                  changeType === "neutral" && "text-muted-foreground"
                )}
              >
                {change}
              </p>
            )}
          </div>
        </div>
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
          {icon}
        </div>
      </div>
      {trend && <div className="mt-4 pt-4 border-t border-border">{trend}</div>}
    </Card>
  );
}
