import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://gowildtours.com';

    // Core pages
    const routes = [
        '',
        '/about',
        '/contact',
        '/packages',
        '/activities',
        '/hotels',
        '/experiences',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    // In a real app, you would fetch package/activity/hotel slugs from Prisma here
    // and append them to the routes array.

    return routes;
}
