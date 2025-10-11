import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import { tanstackRouter } from "@tanstack/router-plugin/vite";

export default defineConfig({
    plugins: [
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
