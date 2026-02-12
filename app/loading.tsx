export default function Loading() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-light">
            <div className="flex flex-col items-center gap-4">
                <div className="relative h-16 w-16">
                    <div className="absolute inset-0 rounded-full border-4 border-cream" />
                    <div className="absolute inset-0 rounded-full border-4 border-t-accent animate-spin" />
                </div>
                <p className="font-accent text-sm text-warm-gray tracking-wide">
                    Loading your adventure...
                </p>
            </div>
        </div>
    );
}
