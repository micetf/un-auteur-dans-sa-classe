import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
    plugins: [react()],
    base: "/un-auteur-dans-sa-classe/",
    resolve: {
        alias: {
            "@": resolve(__dirname, "./src"),
            "@components": resolve(__dirname, "./src/components"),
            "@hooks": resolve(__dirname, "./src/hooks"),
            "@utils": resolve(__dirname, "./src/utils"),
        },
    },
    server: {
        port: 3000,
        open: true,
    },
});
