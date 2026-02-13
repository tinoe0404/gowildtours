import { Metadata } from "next";
import { activities } from "@/lib/activities-data";
import { notFound } from "next/navigation";
import ActivityDetailClient from "./ActivityDetailClient";

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const activity = activities.find((a) => a.slug === slug);

    if (!activity) {
        return {
            title: "Activity Not Found | Go Wild Tours",
        };
    }

    return {
        title: `${activity.title} | Safari Activities`,
        description: activity.shortDescription,
        openGraph: {
            images: [activity.image],
        },
    };
}

export default async function ActivityDetailPage({ params }: Props) {
    const { slug } = await params;
    const activity = activities.find((a) => a.slug === slug);

    if (!activity) {
        notFound();
    }

    return <ActivityDetailClient activity={activity} />;
}
