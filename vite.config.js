import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";
import tailwindcss from "tailwindcss";

export default defineConfig({
  base: "/mini-b2c-ecommerce/", // Default to '/' for development
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)), // Maps @ to the src folder
    },
  },
});
