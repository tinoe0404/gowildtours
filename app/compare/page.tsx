import ComparisonTable from "@/components/features/ComparisonTable";
import Container from "@/components/ui/Container";

export const metadata = {
    title: "Compare Packages | Go Wild Tours",
    description: "Compare our safari packages and accommodations side-by-side.",
};

export default function ComparePage() {
    return (
        <div className="pt-32 pb-20">
            <Container>
                <h1 className="text-4xl font-display font-bold text-dark-deep mb-8">Compare Options</h1>
                <div className="bg-white/50 backdrop-blur-sm rounded-xl border border-beige/50 p-6 shadow-sm">
                    <ComparisonTable />
                </div>
            </Container>
        </div>
    );
}
