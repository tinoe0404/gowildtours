import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { Download, ExternalLink, FileText, Image as ImageIcon } from "lucide-react";

export const metadata = {
    title: "Press & Media Center | Go Wild Tours",
    description: "Official press resources, brand assets, and latest news from Go Wild Tours.",
};

export default function PressPage() {
    return (
        <div className="bg-light min-h-screen pb-20">
            {/* Header */}
            <section className="bg-dark-deep text-white py-20">
                <Container className="text-center">
                    <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">Press Center</h1>
                    <p className="text-xl text-white/80 max-w-2xl mx-auto">
                        Resources for journalists, bloggers, and content creators.
                    </p>
                </Container>
            </section>

            <Container className="py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-12">

                        {/* Latest News */}
                        <section>
                            <h2 className="text-3xl font-display font-bold text-dark-deep mb-8">Latest News</h2>
                            <div className="space-y-8">
                                <PressRelease
                                    date="February 10, 2026"
                                    title="Go Wild Tours Launches Exclusive Mana Pools Conservation Safari"
                                    excerpt="New itinerary focuses on anti-poaching efforts and community involvement in the spectacular Mana Pools National Park."
                                />
                                <PressRelease
                                    date="January 15, 2026"
                                    title="Go Wild Tours Named Top Safari Operator for 2026"
                                    excerpt="Prestigious travel publication recognizes Go Wild Tours for excellence in sustainable tourism and guest experience."
                                />
                                <PressRelease
                                    date="December 05, 2025"
                                    title="Expansion into Eastern Highlands: New Hidden Gems Revealed"
                                    excerpt="Discover the misty mountains and waterfalls of Zimbabwe's Eastern Highlands with our newest guided expeditions."
                                />
                            </div>
                        </section>

                        {/* About Boilerplate */}
                        <section>
                            <h2 className="text-3xl font-display font-bold text-dark-deep mb-6">About Go Wild Tours</h2>
                            <div className="prose prose-lg text-warm-gray">
                                <p>
                                    Go Wild Tours is a premier safari operator based in Victoria Falls, Zimbabwe. Founded in 2020, we specialize in authentic, sustainable, and luxury wildlife experiences across Zimbabwe's most iconic national parks.
                                </p>
                                <p>
                                    Our mission is to connect travelers with the raw beauty of Africa while actively contributing to wildlife conservation and community empowerment. With a team of expert local guides, we offer bespoke itineraries that go beyond the ordinary.
                                </p>
                            </div>
                        </section>

                    </div>

                    {/* Sidebar / Downloads */}
                    <div className="space-y-8">

                        {/* Press Kit */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-beige">
                            <h3 className="text-xl font-bold text-dark-deep mb-4 flex items-center gap-2">
                                <FileText className="w-5 h-5 text-accent" /> Media Kit
                            </h3>
                            <p className="text-sm text-warm-gray mb-6">
                                Download our official electronic press kit (EPK) containing company fact sheet, executive bios, and backgrounder.
                            </p>
                            <Button className="w-full flex items-center justify-center gap-2">
                                <Download className="w-4 h-4" /> Download EPK (ZIP)
                            </Button>
                        </div>

                        {/* Brand Assets */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-beige">
                            <h3 className="text-xl font-bold text-dark-deep mb-4 flex items-center gap-2">
                                <ImageIcon className="w-5 h-5 text-accent" /> Brand Assets
                            </h3>
                            <ul className="space-y-3">
                                <AssetDownload title="Official Logo (PNG/SVG)" size="2.4 MB" />
                                <AssetDownload title="Brand Guidelines" size="5.1 MB" />
                                <AssetDownload title="High-Res Safari Imagery" size="128 MB" />
                                <AssetDownload title="Executive Headshots" size="15 MB" />
                            </ul>
                        </div>

                        {/* Contact */}
                        <div className="bg-dark-deep text-white p-6 rounded-2xl">
                            <h3 className="text-xl font-bold mb-4">Media Contact</h3>
                            <p className="text-white/80 text-sm mb-4">
                                For press inquiries, interviews, or familiarization trip requests, please contact:
                            </p>
                            <div className="space-y-1">
                                <p className="font-bold text-accent">Sarah Johnson</p>
                                <p className="text-sm">Head of Communications</p>
                                <a href="mailto:press@gowildtours.com" className="text-accent hover:underline text-sm block mt-2">
                                    press@gowildtours.com
                                </a>
                            </div>
                        </div>

                    </div>
                </div>
            </Container>
        </div>
    );
}

function PressRelease({ date, title, excerpt }: { date: string, title: string, excerpt: string }) {
    return (
        <div className="group cursor-pointer">
            <span className="text-sm font-bold text-accent uppercase tracking-wider block mb-2">{date}</span>
            <h3 className="text-2xl font-bold text-dark-deep mb-3 group-hover:text-accent transition-colors">{title}</h3>
            <p className="text-warm-gray leading-relaxed mb-4">{excerpt}</p>
            <div className="flex items-center gap-2 text-dark-deep font-bold text-sm group-hover:translate-x-1 transition-transform">
                Read Release <ArrowRight className="w-4 h-4" />
            </div>
        </div>
    );
}

function AssetDownload({ title, size }: { title: string, size: string }) {
    return (
        <li className="flex items-center justify-between p-3 bg-light rounded-lg hover:bg-beige/20 transition-colors cursor-pointer group">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-white flex items-center justify-center border border-beige text-dark-deep">
                    <Download className="w-4 h-4" />
                </div>
                <span className="text-sm font-bold text-dark-deep">{title}</span>
            </div>
            <span className="text-xs text-warm-gray">{size}</span>
        </li>
    );
}

// Minimal ArrowRight icon locally since it wasn't imported
import { ArrowLeft } from "lucide-react";
function ArrowRight({ className }: { className?: string }) {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
}
