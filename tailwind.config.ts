import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#FFF3E6',
                    100: '#FFE7CC',
                    200: '#FFCF99',
                    300: '#FFB766',
                    400: '#FF9F33',
                    500: '#FF8C42', // Main orange from logo
                    600: '#CC6F35',
                    700: '#995328',
                    800: '#66371A',
                    900: '#331C0D',
                },
                accent: {
                    DEFAULT: '#FF8C42',
                    yellow: '#FFD700', // Yellow accent from logo
                    brown: '#8B4513',  // Brown tones from logo
                },
                wild: {
                    orange: '#FF8C42',
                    sunset: '#FFB84D',
                    earth: '#8B4513',
                    forest: '#2D5016',
                },
                // Keeping design tokens from original CSS for backward compatibility if needed, 
                // essentially mapping them to the new palette or keeping as utility classes
                cream: '#F8F6F0',
                dark: {
                    DEFAULT: '#3E2723',
                    deep: '#1A1410',
                }
            },
            fontFamily: {
                serif: ['var(--font-display)', 'Playfair Display', 'serif'],
                sans: ['var(--font-body)', 'Inter', 'sans-serif'],
                display: ['var(--font-display)', 'Playfair Display', 'serif'],
                accent: ['var(--font-accent)', 'Montserrat', 'sans-serif'],
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'hero-gradient': 'linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.4), rgba(0,0,0,0.7))',
            },
        },
    },
    plugins: [],
};
export default config;
