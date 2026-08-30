import type { Metadata } from 'next';

export const siteConfig = {
    name: 'Go Wild Tours',
    description: 'Expertly curated safari adventures in Zimbabwe. Experience Victoria Falls, Hwange National Park, and more with our professional wildlife guides.',
    url: 'https://gowildtours.com',
    ogImage: '/images/logo/go-wild-tours-full.svg',
    links: {
        facebook: 'https://www.facebook.com/share/1HiexqeiEB/?mibextid=wwXIfr',
        instagram: 'https://www.instagram.com/gowildtourszimbabwe?igsi=MWhqNXEwN3l3d2Y4cQ==',
    },
};

export function constructMetadata({
    title = siteConfig.name,
    description = siteConfig.description,
    image = siteConfig.ogImage,
    icons = '/images/logo/go-wild-tours-icon.png',
    noIndex = false,
}: {
    title?: string;
    description?: string;
    image?: string;
    icons?: string;
    noIndex?: boolean;
} = {}): Metadata {
    return {
        title: {
            default: title,
            template: `%s | ${siteConfig.name}`,
        },
        description,
        openGraph: {
            title,
            description,
            images: [
                {
                    url: image,
                },
            ],
            type: 'website',
            siteName: siteConfig.name,
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [image],
            creator: '@gowildtours',
        },
        icons: {
            icon: '/images/logo/go-wild-tours-icon.png',
            shortcut: '/images/logo/go-wild-tours-icon.png',
            apple: '/images/logo/go-wild-tours-icon.png',
        },
        metadataBase: new URL(siteConfig.url),
        ...(noIndex && {
            robots: {
                index: false,
                follow: false,
            },
        }),
    };
}
