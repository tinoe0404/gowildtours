import { cn } from "@/lib/cn";

const statusColors: Record<string, string> = {
    // Inquiry / Booking statuses
    new: "bg-blue-50 text-blue-700 border-blue-200",
    in_progress: "bg-amber-50 text-amber-700 border-amber-200",
    responded: "bg-purple-50 text-purple-700 border-purple-200",
    converted: "bg-emerald-50 text-emerald-700 border-emerald-200",
    closed: "bg-gray-100 text-gray-600 border-gray-200",
    pending: "bg-amber-50 text-amber-700 border-amber-200",
    confirmed: "bg-emerald-50 text-emerald-700 border-emerald-200",
    cancelled: "bg-red-50 text-red-600 border-red-200",
    completed: "bg-blue-50 text-blue-700 border-blue-200",
    // Payment statuses
    deposit_paid: "bg-sky-50 text-sky-700 border-sky-200",
    fully_paid: "bg-emerald-50 text-emerald-700 border-emerald-200",
    refunded: "bg-red-50 text-red-600 border-red-200",
    // Review statuses
    approved: "bg-emerald-50 text-emerald-700 border-emerald-200",
    rejected: "bg-red-50 text-red-600 border-red-200",
    spam: "bg-gray-100 text-gray-500 border-gray-200",
    // Priority
    low: "bg-gray-100 text-gray-600 border-gray-200",
    medium: "bg-amber-50 text-amber-600 border-amber-200",
    high: "bg-orange-50 text-orange-600 border-orange-200",
    urgent: "bg-red-50 text-red-600 border-red-200",
    // Boolean
    active: "bg-emerald-50 text-emerald-700 border-emerald-200",
    inactive: "bg-gray-100 text-gray-500 border-gray-200",
};

interface StatusBadgeProps {
    status: string;
    className?: string;
}

export default function StatusBadge({ status, className }: StatusBadgeProps) {
    const color = statusColors[status] || "bg-gray-100 text-gray-600 border-gray-200";
    return (
        <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border capitalize", color, className)}>
            {status.replace(/_/g, " ")}
        </span>
    );
}
