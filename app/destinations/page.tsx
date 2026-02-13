import DestinationExplorer from "@/components/features/DestinationExplorer";
import Container from "@/components/ui/Container";

export const metadata = {
    title: "Explore Destinations | Go Wild Tours",
    description: "Interactive map of our premier safari destinations in Southern Africa.",
};

export default function DestinationsPage() {
    return (
        <div className="pt-32 pb-20">
            <Container>
                <DestinationExplorer />
            </Container>
        </div>
    );
}
