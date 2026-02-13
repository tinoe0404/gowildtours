"use client";

import { LucideIcon } from "lucide-react";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/cn";

interface EmptyStateProps {
    icon?: LucideIcon;
    title: string;
    description: string;
    actionLabel?: string;
    onAction?: () => void;
    className?: string;
}

export default function EmptyState({
    icon: Icon,
    title,
    description,
    actionLabel,
    onAction,
    className,
}: EmptyStateProps) {
    return (
        <div className={cn("flex flex-col items-center justify-center text-center py-12 px-4 border-2 border-dashed border-beige/50 rounded-xl bg-white/50", className)}>
            {Icon && (
                <div className="bg-beige/30 p-4 rounded-full mb-4">
                    <Icon className="h-8 w-8 text-primary/60" />
                </div>
            )}
            <h3 className="text-xl font-semibold font-display text-dark-deep mb-2">{title}</h3>
            <p className="text-muted-foreground max-w-sm mb-6 text-warm-gray">{description}</p>
            {actionLabel && onAction && (
                <Button onClick={onAction} variant="outline">
                    {actionLabel}
                </Button>
            )}
        </div>
    );
}
