import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src",
      "@/components": "/src/components",
      "@/pages": "/src/pages",
      "@/utils": "/src/utils",
      "@/types": "/src/types",
      "@/hooks": "/src/hooks",
      "@/services": "/src/services",
      "@/constants": "/src/constants",
      "@/assets": "/src/assets",
    },
  },
  build: {
    outDir: "dist",
    sourcemap: true,
  },
  server: {
    port: 3000,
    open: true,
  },
});
