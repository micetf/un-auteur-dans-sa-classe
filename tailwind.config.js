/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,jsx}"],
    theme: {
        extend: {
            colors: {
                // Palette adaptée au monde du livre jeunesse
                primary: {
                    DEFAULT: "#3B82F6", // Bleu vif
                    dark: "#1E40AF",
                },
                accent: {
                    DEFAULT: "#F59E0B", // Orange chaleureux
                    dark: "#D97706",
                },
                success: "#10B981",
                error: "#EF4444",
            },
            fontSize: {
                // Tailles adaptées à la projection
                "projection-title": ["3.5rem", { lineHeight: "1.2" }],
                "projection-text": ["2rem", { lineHeight: "1.5" }],
                "projection-button": ["1.75rem", { lineHeight: "1.4" }],
            },
        },
    },
    plugins: [],
};
