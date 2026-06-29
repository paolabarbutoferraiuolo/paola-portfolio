import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  vite: {
    base: "/paola-portfolio/",
  },
  tanstackStart: {
    server: { entry: "server" },
  },
  nitro: {
    preset: "github-pages"
  }
});
