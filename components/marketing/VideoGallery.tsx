import { Play } from "lucide-react";
import Image from "next/image";

const VIDEOS = [
    {
        id: "1",
        title: "Experience the Magic of Victoria Falls",
        thumbnail: "/images/video-thumb-1.jpg",
        duration: "2:34",
        url: "https://youtube.com/watch?v=placeholder1"
    },
    {
        id: "2",
        title: "Hwange National Park Safari Guide",
        thumbnail: "/images/video-thumb-2.jpg",
        duration: "5:12",
        url: "https://youtube.com/watch?v=placeholder2"
    },
    {
        id: "3",
        title: "Client Testimonials: The Go Wild Difference",
        thumbnail: "/images/video-thumb-3.jpg",
        duration: "3:45",
        url: "https://youtube.com/watch?v=placeholder3"
    }
];

export default function VideoGallery() {
    return (
        <section className="py-20 bg-dark-deep text-white">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-4xl font-display font-bold mb-4">Latest Videos</h2>
                        <p className="text-white/60 max-w-xl">
                            Watch highlights from our recent expeditions and get inspired for your next adventure.
                        </p>
                    </div>
                    <a href="https://youtube.com/gowildtours" target="_blank" className="hidden md:inline-block text-accent hover:text-white transition-colors font-bold uppercase tracking-wider text-sm">
                        View All Videos &rarr;
                    </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {VIDEOS.map((video) => (
                        <a
                            key={video.id}
                            href={video.url}
                            target="_blank"
                            className="group block"
                        >
                            <div className="relative aspect-video bg-gray-800 rounded-xl overflow-hidden mb-4 border border-white/10">
                                {/* Placeholder for thumbnail */}
                                <div className="absolute inset-0 bg-gray-700" />
                                <Image
                                    src={video.thumbnail}
                                    alt={video.title}
                                    fill
                                    className="object-cover opacity-60 group-hover:opacity-40 transition-opacity"
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-16 h-16 bg-accent/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <Play className="w-6 h-6 text-dark-deep fill-current ml-1" />
                                    </div>
                                </div>
                                <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                                    {video.duration}
                                </div>
                            </div>
                            <h3 className="text-xl font-bold group-hover:text-accent transition-colors">
                                {video.title}
                            </h3>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}
