import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true, // Allows Docker's port mapping to access Vite
    port: 5173, // Explicitly binds to your mapped port
    watch: {
      usePolling: true, // Forces Vite to pick up file saves from Windows/macOS
    },
  },
});
