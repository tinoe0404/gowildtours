import { cn } from "@/lib/cn";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    trend?: { value: number; label: string };
    className?: string;
}

export default function StatCard({ title, value, icon: Icon, trend, className }: StatCardProps) {
    return (
        <div className={cn("bg-white rounded-xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow", className)}>
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm text-gray-500 font-medium">{title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
                    {trend && (
                        <div className="flex items-center gap-1 mt-2">
                            {trend.value >= 0 ? (
                                <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
                            ) : (
                                <TrendingDown className="h-3.5 w-3.5 text-red-500" />
                            )}
                            <span className={cn("text-xs font-semibold", trend.value >= 0 ? "text-emerald-600" : "text-red-600")}>
                                {trend.value > 0 ? "+" : ""}{trend.value}%
                            </span>
                            <span className="text-xs text-gray-400">{trend.label}</span>
                        </div>
                    )}
                </div>
                <div className="h-10 w-10 rounded-lg bg-amber-50 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-amber-600" />
                </div>
            </div>
        </div>
    );
}
