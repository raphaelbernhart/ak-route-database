import defaultTheme from 'tailwindcss/defaultTheme';

export default {
    theme: {
        screens: {
            xs: '380px',
            ...defaultTheme.screens,
        },
        extend: {
            colors: {
                primary: '#6A6A6A',
                secondary: '#272727',
                appPrimary: '#AF2C1E',
                dark: '#1C1C1C',
                background: '#121212',
            },
            fontSize: {
                base: '0.9rem',
            },
        },
        container: {
            center: true,
            padding: {
                DEFAULT: '1rem',
                sm: '1.5rem',
                md: '2rem',
            },
        },
    },
    content: ['./index.html', './src/**/*.{vue,ts}'],
};
