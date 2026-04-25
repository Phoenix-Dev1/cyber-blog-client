import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    // Prevents Vite from trying to load missing .map files
    // from third-party packages like react-quill-new
    devSourcemap: false,
  },
  build: {
    rollupOptions: {
      onwarn(warning, warn) {
        // Suppress broken source-map warnings from react-quill-new
        if (
          warning.code === "SOURCEMAP_ERROR" ||
          (warning.message && warning.message.includes("react-quill-new"))
        ) {
          return;
        }
        warn(warning);
      },
    },
  },
  server: {
    host: "localhost",
    port: 3000,
  },
});
