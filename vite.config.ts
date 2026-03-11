import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig(() => {
  return {
    base: "/wintoolkit/",
    plugins: [react(), tailwindcss()],
    build: {
      // Disable source maps in production for security and performance
      sourcemap: false,
      // Use terser for better minification
      minify: "terser" as const,
      terserOptions: {
        compress: {
          // Remove console.log in production
          drop_console: true,
          // Remove debugger statements in production
          drop_debugger: true,
          // Remove unused code
          dead_code: true,
        },
        mangle: {
          // Shorten variable names in production
          safari10: true,
        },
      },
      // Optimize chunk splitting
      rollupOptions: {
        output: {
          // Manual chunks for better caching
          manualChunks: {
            "vendor-react": ["react", "react-dom"],
            "vendor-motion": ["motion"],
            "vendor-lucide": ["lucide-react"],
          },
        },
      },
      // CSS code splitting
      cssCodeSplit: true,
      // Generate manifest file
      manifest: true,
      // Pre-fetch GitHub data during build
      writeBundle: () => {
        const { execSync } = require("child_process");
        try {
          console.log("🔄 Pre-fetching GitHub data during build...");
          execSync("node scripts/generate-github-data.mjs", {
            stdio: "inherit",
          });
        } catch (error) {
          console.error("❌ Error pre-fetching GitHub data:", error.message);
        }
      },
    },
    server: {
      // HMR configuration
      hmr: true,
    },
    // Optimize dependencies
    optimizeDeps: {
      include: ["react", "react-dom", "motion", "lucide-react"],
    },
  };
});
