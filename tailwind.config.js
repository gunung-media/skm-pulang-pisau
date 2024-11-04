import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/**/*.blade.php',
        './resources/**/*.js',
        './resources/**/*.vue',
        './resources/**/*.tsx',
    ],
    theme: {
        extend: {
            colors: {
                main: '#88aaee',
                mainAccent: '#4d80e6', // not needed for shadcn components
                overlay: 'rgba(0,0,0,0.8)', // background color overlay for alert dialogs, modals, etc.

                // light mode
                bg: '#dfe5f2',
                text: '#000',
                border: '#000',

                // dark mode
                darkBg: '#272933',
                darkText: '#eeefe9',
                darkBorder: '#000',
                secondaryBlack: '#212121', // opposite of plain white, not used pitch black because borders and box-shadows are that color
            },
            borderRadius: {
                base: '5px'
            },
            boxShadow: {
                light: '4px 4px 0px 0px #000',
                dark: '4px 4px 0px 0px #000',
            },
            translate: {
                boxShadowX: '4px',
                boxShadowY: '4px',
                reverseBoxShadowX: '-4px',
                reverseBoxShadowY: '-4px',
            },
            fontFamily: {
                sans: ['"DM Sans"', 'sans-serif'],
            },
            fontWeight: {
                base: '500',
                heading: '700',
            },
        },
    },
    plugins: [],
};
