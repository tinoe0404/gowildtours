"use client";

import { cn } from "@/lib/cn";
import { forwardRef, type ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    className?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
    primary:
        "bg-accent text-dark-deep hover:bg-accent-light shadow-lg hover:shadow-xl",
    secondary:
        "bg-primary text-white hover:bg-primary-light shadow-lg hover:shadow-xl",
    outline:
        "border-2 border-accent text-accent hover:bg-accent hover:text-dark-deep",
    ghost:
        "text-cream hover:bg-white/10",
};

const sizeStyles: Record<ButtonSize, string> = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ variant = "primary", size = "md", className, children, ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    "font-accent font-semibold rounded-[var(--radius-button)] transition-all duration-300 ease-out",
                    "transform hover:scale-[1.02] active:scale-[0.98]",
                    "focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
                    "inline-flex items-center justify-center gap-2 cursor-pointer",
                    variantStyles[variant],
                    sizeStyles[size],
                    className
                )}
                {...props}
            >
                {children}
            </button>
        );
    }
);

Button.displayName = "Button";
export default Button;
