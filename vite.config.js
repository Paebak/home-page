import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Deployed on root at neofound.org, so base = "/"
export default defineConfig({
  plugins: [react()],
  base: "/"
});
