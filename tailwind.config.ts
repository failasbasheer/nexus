/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                dark: "#0B0A10",     /* Deep Obsidian */
                surface: "#15121E",  /* Dark Violet-Grey */
                card: "#1E1B2E",     /* Richer Card BG */
                muted: "#3E3B50",    /* Muted Violet-Grey */
                primary: "#FFFFFF",
                secondary: "#A39EB5",/* Soft Lilac Grey */
                accent: {
                    primary: "#6E56CF",   /* Vivid Iris */
                    secondary: "#00C2FF", /* Cyan */
                    magenta: "#FF5DAD"    /* Hot Pink */
                }
            },
            backgroundImage: {
                'primary-sweep': 'linear-gradient(135deg, #6E56CF, #00C2FF)',
                'glow-gradient': 'linear-gradient(160deg, #5B45AB, #FF5DAD)',
                'neutral-depth': 'linear-gradient(180deg, #15121E, #0B0A10)',
                'glass': 'linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)',
                'grid-pattern': "radial-gradient(rgba(110, 86, 207, 0.15) 1px, transparent 1px)"
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
            letterSpacing: {
                tight: '-0.02em',
                tighter: '-0.04em',
            },
            animation: {
                'fade-in': 'fadeIn 0.8s ease-out forwards',
                'slide-up': 'slideUp 0.8s ease-out forwards',
                'float': 'float 6s ease-in-out infinite',
                'float-slow': 'float 8s ease-in-out infinite',
                'scan': 'scan 3s ease-in-out infinite',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'beacon': 'beacon 2s infinite',
                'scroll': 'scroll 40s linear infinite',
            },
            keyframes: {
                scroll: {
                    '0%': { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(-50%)' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                scan: {
                    '0%': { top: '0%' },
                    '50%': { top: '100%' },
                    '100%': { top: '0%' },
                },
                beacon: {
                    '0%': { transform: 'scale(1)', opacity: '1' },
                    '100%': { transform: 'scale(3)', opacity: '0' },
                }
            }
        }
    },
    plugins: [],
}
