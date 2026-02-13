"use client";

import { cn } from "@/lib/cn";
import { Check } from "lucide-react";
import { forwardRef, type InputHTMLAttributes } from "react";

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "onCheckedChange"> {
    onCheckedChange?: (checked: boolean) => void;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
    ({ className, onCheckedChange, checked, ...props }, ref) => {
        return (
            <div className="relative flex items-center">
                <input
                    type="checkbox"
                    ref={ref}
                    checked={checked}
                    onChange={(e) => onCheckedChange?.(e.target.checked)}
                    className={cn(
                        "peer h-4 w-4 shrink-0 rounded-sm border border-neutral-300 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none checked:bg-accent checked:border-accent transition-all",
                        className
                    )}
                    {...props}
                />
                <Check className="absolute left-0 top-0 w-4 h-4 text-dark-deep opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" />
            </div>
        );
    }
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
