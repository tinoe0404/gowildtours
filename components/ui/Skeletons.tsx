import { cn } from "@/lib/cn";

function Skeleton({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn("animate-pulse rounded-md bg-neutral-200/50 dark:bg-neutral-800/50", className)}
            {...props}
        />
    );
}

export function CardSkeleton() {
    return (
        <div className="flex flex-col space-y-3 p-4 border border-beige/30 rounded-xl shadow-sm">
            <Skeleton className="h-[200px] w-full rounded-lg" />
            <div className="space-y-2 pt-2">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <div className="flex gap-2 pt-2">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-16" />
                </div>
            </div>
        </div>
    );
}

export function DashboardSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="col-span-1 space-y-4">
                <Skeleton className="h-32 w-full rounded-xl" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
            </div>
            <div className="col-span-1 md:col-span-3 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Skeleton className="h-24 w-full rounded-xl" />
                    <Skeleton className="h-24 w-full rounded-xl" />
                    <Skeleton className="h-24 w-full rounded-xl" />
                </div>
                <Skeleton className="h-[300px] w-full rounded-xl" />
            </div>
        </div>
    )
}

export function ListSkeleton() {
    return (
        <div className="space-y-4">
            {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-4 items-center p-4 border border-beige/30 rounded-lg">
                    <Skeleton className="h-16 w-16 rounded-md" />
                    <div className="space-y-2 flex-1">
                        <Skeleton className="h-4 w-1/3" />
                        <Skeleton className="h-3 w-1/2" />
                    </div>
                </div>
            ))}
        </div>
    )
}

export { Skeleton };
