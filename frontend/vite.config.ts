import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { tanstackRouter } from "@tanstack/router-plugin/vite";

export default defineConfig({
    plugins: [
        react(),
        tanstackRouter({
            target: "react",
            autoCodeSplitting: true,
        }),
    ],
});
