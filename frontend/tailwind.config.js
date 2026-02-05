/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#ff6b4a',
                    dark: '#ff5533',
                    light: '#ff8566',
                },
                dark: {
                    900: '#0a0a0a',
                    800: '#1a1a1a',
                    700: '#2d1515',
                    600: '#1a0f0f',
                }
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
            },
            backdropBlur: {
                xs: '2px',
            }
        },
    },
    plugins: [],
}
