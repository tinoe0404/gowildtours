import Link from "next/link";
import Image from "next/image";
import { Instagram } from "lucide-react";

const INSTAGRAM_POSTS = [
    { id: 1, src: "/images/safari-1.jpg", alt: "Lion sighting in Hwange", likes: 124 },
    { id: 2, src: "/images/safari-2.jpg", alt: "Sunset boat cruise", likes: 89 },
    { id: 3, src: "/images/safari-3.jpg", alt: "Walking safari experience", likes: 256 },
    { id: 4, src: "/images/safari-4.jpg", alt: "Luxury tent interior", likes: 167 },
    { id: 5, src: "/images/safari-5.jpg", alt: "Victoria Falls aerial view", likes: 302 },
    { id: 6, src: "/images/safari-6.jpg", alt: "Elephant herd at waterhole", likes: 198 },
];

export default function InstagramFeed() {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center text-center mb-12">
                    <div className="inline-flex items-center gap-2 text-accent font-bold uppercase tracking-wider text-sm mb-4">
                        <Instagram className="w-4 h-4" /> Follow Us
                    </div>
                    <h2 className="text-4xl font-display font-bold text-dark-deep mb-4">
                        @gowildtours
                    </h2>
                    <p className="text-warm-gray max-w-xl">
                        Join our community of wildlife enthusiasts and see daily updates from the bush. Tag us in your photos to be featured!
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
                    {INSTAGRAM_POSTS.map((post) => (
                        <Link
                            key={post.id}
                            href="https://instagram.com/gowildtours"
                            target="_blank"
                            className="relative aspect-square group overflow-hidden bg-gray-100"
                        >
                            {/* Placeholder functionality if images don't exist, we use a gray box or the image if valid */}
                            <div className="absolute inset-0 bg-gray-200 animate-pulse group-hover:bg-gray-300 transition-colors" />
                            <Image
                                src={post.src}
                                alt={post.alt}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                                <Instagram className="w-8 h-8" />
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <Link
                        href="https://instagram.com/gowildtours"
                        target="_blank"
                        className="inline-flex items-center gap-2 px-8 py-3 bg-dark-deep text-white font-bold rounded-full hover:bg-accent hover:text-dark-deep transition-colors"
                    >
                        Follow on Instagram
                    </Link>
                </div>
            </div>
        </section>
    );
}
