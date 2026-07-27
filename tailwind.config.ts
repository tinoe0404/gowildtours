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
                    50: '#FDF7F1',
                    100: '#F9ECD9',
                    200: '#EFCC9E',
                    300: '#E6AD63',
                    400: '#D99233',
                    500: '#C8832A', // Main terracotta from hero
                    600: '#B06B1F',
                    700: '#875114',
                    800: '#61390E',
                    900: '#42250B',
                },
                accent: {
                    DEFAULT: '#C8832A',
                    yellow: '#E5A95A', // Softer gold 
                    brown: '#8B4513',  
                    skyBlue: '#87CEEB', // Hero heading highlight
                },
                wild: {
                    orange: '#C8832A',
                    sunset: '#E8652B',
                    earth: '#2C1A0E',
                    forest: '#2D5F2D',
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
