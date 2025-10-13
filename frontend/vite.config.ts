import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import { tanstackRouter } from "@tanstack/router-plugin/vite";

export default defineConfig({
    plugins: [
        svgr(),
        react(),
        tailwindcss(),
        tanstackRouter({
            target: "react",
            autoCodeSplitting: true,
        }),
    ],
    resolve: {
        alias: {
            "@": "/src",
        },
    },
});
