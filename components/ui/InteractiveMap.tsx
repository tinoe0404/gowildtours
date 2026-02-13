"use client";

import { useState } from "react";
import Map, { Marker, NavigationControl, Popup } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { MapPin } from "lucide-react";
import { cn } from "@/lib/cn";
import { mapConfig } from "@/lib/mapConfig";

interface LocationMarker {
    id: string | number;
    latitude: number;
    longitude: number;
    title: string;
    description?: string;
    category?: "Hotel" | "Activity" | "Airport";
}

interface InteractiveMapProps {
    className?: string;
    markers?: LocationMarker[];
    initialViewFn?: {
        latitude: number;
        longitude: number;
        zoom: number;
    };
}

export default function InteractiveMap({ className, markers = [], initialViewFn }: InteractiveMapProps) {
    const [popupInfo, setPopupInfo] = useState<LocationMarker | null>(null);

    // If no token is provided, show a placeholder
    if (!mapConfig.accessToken) {
        return (
            <div className={cn("flex flex-col items-center justify-center bg-beige/20 border border-beige/30 rounded-xl h-[400px] w-full", className)}>
                <MapPin className="h-12 w-12 text-warm-gray mb-4" />
                <p className="text-dark-deep font-display text-lg">Map Unavailable</p>
                <p className="text-warm-gray text-sm">Please configure NEXT_PUBLIC_MAPBOX_TOKEN</p>
            </div>
        )
    }

    return (
        <div className={cn("relative h-[500px] w-full rounded-xl overflow-hidden shadow-lg", className)}>
            <Map
                initialViewState={initialViewFn || mapConfig.defaultCenter}
                style={{ width: "100%", height: "100%" }}
                mapStyle={mapConfig.styleUrl}
                mapboxAccessToken={mapConfig.accessToken}
                attributionControl={false}
            >
                <NavigationControl position="top-right" />

                {markers.map((marker) => (
                    <Marker
                        key={marker.id}
                        latitude={marker.latitude}
                        longitude={marker.longitude}
                        anchor="bottom"
                        onClick={(e: any) => {
                            e.originalEvent.stopPropagation();
                            setPopupInfo(marker);
                        }}
                    >
                        <div className="cursor-pointer hover:scale-110 transition-transform">
                            <MapPin className={cn("h-8 w-8 text-primary drop-shadow-md",
                                marker.category === 'Hotel' ? 'text-primary' :
                                    marker.category === 'Activity' ? 'text-accent' : 'text-dark-deep'
                            )} />
                        </div>
                    </Marker>
                ))}

                {popupInfo && (
                    <Popup
                        anchor="top"
                        longitude={popupInfo.longitude}
                        latitude={popupInfo.latitude}
                        onClose={() => setPopupInfo(null)}
                        className="text-dark-deep"
                    >
                        <div className="p-2 min-w-[200px]">
                            <h3 className="font-bold font-display text-base mb-1">{popupInfo.title}</h3>
                            {popupInfo.description && (
                                <p className="text-sm text-warm-gray">{popupInfo.description}</p>
                            )}
                            {popupInfo.category && (
                                <span className="inline-block mt-2 text-xs font-semibold px-2 py-0.5 bg-beige rounded-full text-dark">
                                    {popupInfo.category}
                                </span>
                            )}
                        </div>
                    </Popup>
                )}
            </Map>
        </div>
    );
}
