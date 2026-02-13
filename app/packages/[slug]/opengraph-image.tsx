import { ImageResponse } from "next/og";
import { packages } from "@/lib/packages-data";

export const runtime = "edge";

export const alt = "Go Wild Tours Package";
export const size = {
    width: 1200,
    height: 630,
};

export const contentType = "image/png";

export default async function Image({ params }: { params: { slug: string } }) {
    const { slug } = await params;
    const pkg = packages.find((p) => p.slug === slug);

    if (!pkg) {
        return new ImageResponse(
            (
                <div
                    style={{
                        fontSize: 48,
                        background: "#1a1a1a",
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                    }}
                >
                    Go Wild Tours
                </div>
            ),
            { ...size }
        );
    }

    return new ImageResponse(
        (
            <div
                style={{
                    display: "flex",
                    height: "100%",
                    width: "100%",
                    flexDirection: "column",
                    position: "relative",
                    backgroundColor: "#1a1a1a",
                }}
            >
                {/* Background Image - Simulated with a div and absolute positioning since we can't easily fetch external images in edge without configuring fetching */}
                {/* Ideally provided image url would be used here, but for now we use a solid design with the title */}
                <img
                    src={pkg.images[0]}
                    alt={pkg.title}
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        opacity: 0.6,
                    }}
                />

                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-end",
                        width: "100%",
                        height: "100%",
                        padding: "60px",
                        background: "linear-gradient(to top, rgba(0,0,0,0.9), transparent)",
                    }}
                >
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
                        <div style={{ backgroundColor: "#D2B48C", padding: "5px 15px", borderRadius: "20px", color: "#1a1a1a", fontSize: "20px", fontWeight: "bold" }}>
                            {pkg.duration.days} Days
                        </div>
                        <div style={{ color: "#D2B48C", fontSize: "20px", fontWeight: "bold" }}>
                            {pkg.destinations.join(" · ")}
                        </div>
                    </div>

                    <div style={{ fontSize: 72, fontWeight: "bold", color: "white", lineHeight: 1.1, marginBottom: "20px" }}>
                        {pkg.title}
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                        <div style={{ fontSize: 32, color: "rgba(255,255,255,0.8)" }}>
                            Starting from
                        </div>
                        <div style={{ fontSize: 48, fontWeight: "bold", color: "#D2B48C" }}>
                            ${pkg.price.toLocaleString()}
                        </div>
                    </div>
                </div>

                <div style={{ position: "absolute", top: 40, right: 40, display: "flex" }}>
                    <div style={{ fontSize: 30, fontWeight: "bold", color: "white", border: "2px solid #D2B48C", padding: "10px 20px" }}>
                        GO WILD TOURS
                    </div>
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}
