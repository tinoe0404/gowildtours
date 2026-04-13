import { MetadataRoute } from 'next';
import { destinations } from '@/data/destinations';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://gowildtours.com';

    // Core pages
    const routes = [
        '',
        '/about',
        '/contact',
        '/safaris',
        '/destinations',
        '/gallery',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    // Destination pages
    const destinationRoutes = destinations.map((dest) => ({
        url: `${baseUrl}/destinations/${dest.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));

    return [...routes, ...destinationRoutes];
}
