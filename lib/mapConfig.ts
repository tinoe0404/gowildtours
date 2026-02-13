export const mapConfig = {
    accessToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "",
    // Safari style map (Satellite Streets or custom)
    styleUrl: "mapbox://styles/mapbox/outdoors-v12",
    defaultCenter: {
        latitude: -19.0154, // Zimbabwe/Botswana region
        longitude: 29.1549,
        zoom: 5
    }
};
