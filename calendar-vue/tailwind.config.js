/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{vue,js}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#414d53",
                secondary: "#435b67",
                primary_new: "#BCE2E6",
                secondary_new: "#5CB3C2",
                tertiary: "#2E5A6B",
                whiteish: "#F4F4F5",
            }
        },
    },
    plugins: [],
}

