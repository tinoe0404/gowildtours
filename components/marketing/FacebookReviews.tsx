import { Facebook, Star } from "lucide-react";
import Image from "next/image";

const REVIEWS = [
    {
        id: 1,
        name: "Sarah Jenkins",
        avatar: "/images/avatar-1.jpg",
        rating: 5,
        date: "2 days ago",
        text: "Absolutely the best safari experience! The guides were knowledgeable and we saw the Big 5 on our first day. Highly recommend Go Wild Tours.",
    },
    {
        id: 2,
        name: "Michael Chen",
        avatar: "/images/avatar-2.jpg",
        rating: 5,
        date: "1 week ago",
        text: "Incredible service from start to finish. The booking process was easy and the accommodation in Victoria Falls was stunning.",
    },
    {
        id: 3,
        name: "Emma Wilson",
        avatar: "/images/avatar-3.jpg",
        rating: 4,
        date: "2 weeks ago",
        text: "Great trip overall. The Hwange walking safari was the highlight. A bit of a bumpy ride to the camp but worth it!",
    }
];

export default function FacebookReviews() {
    return (
        <section className="py-20 bg-light">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-12">
                    <div className="flex items-center gap-3">
                        <div className="bg-[#1877F2] text-white p-2 rounded-full">
                            <Facebook className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-dark-deep leading-none">Reviews</h2>
                            <div className="flex items-center gap-1 text-sm text-warm-gray mt-1">
                                <span className="font-bold text-dark-deep">4.9</span>
                                <div className="flex text-[#1877F2]">
                                    {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-3 h-3 fill-current" />)}
                                </div>
                                <span>based on 128 reviews</span>
                            </div>
                        </div>
                    </div>

                    <a href="https://www.facebook.com/share/1HiexqeiEB/?mibextid=wwXIfr" target="_blank" className="text-[#1877F2] font-semibold hover:underline">
                        Write a Review
                    </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {REVIEWS.map((review) => (
                        <div key={review.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden relative">
                                        {/* Placeholder avatar */}
                                        <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-bold">
                                            {review.name.charAt(0)}
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-dark-deep text-sm">{review.name}</h4>
                                        <p className="text-xs text-gray-400">{review.date}</p>
                                    </div>
                                </div>
                                <div className="bg-[#1877F2] p-1 rounded-full">
                                    <Facebook className="w-3 h-3 text-white" />
                                </div>
                            </div>
                            <div className="flex text-[#1877F2] mb-3">
                                {Array.from({ length: review.rating }).map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-current" />
                                ))}
                            </div>
                            <p className="text-warm-gray text-sm leading-relaxed">
                                "{review.text}"
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
