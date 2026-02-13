import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Generates a unique booking reference in the format GWT-YYYY-XXXXXX
 * where YYYY is the current year and XXXXXX is a random alphanumeric string.
 */
export function generateBookingReference(): string {
    const year = new Date().getFullYear();
    const randomStr = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `GWT-${year}-${randomStr}`;
}

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
