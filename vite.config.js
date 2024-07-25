import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";
import { VitePWA } from "vite-plugin-pwa";

// const getCache = ({ name, pattern }) => ({
//   urlPattern: pattern,
//   handler: "CacheFirst",
//   options: {
//     cacheName: name,
//     expiration: {
//       maxEntries: 500,
//       maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
//     },
//     cacheableResponse: {
//       statuses: [0, 200],
//     },
//   },
// });

export default defineConfig({
  plugins: [
    react(),
    svgr(),
    VitePWA({
      workbox: {
        offlineGoogleAnalytics: true,
        // runtimeCaching: [
        //   getCache({
        //     name: "youtube-assets",
        //     // pattern: /^https:\/\/i.ytimg.com\/vi/,
        //     pattern: ({ url }) => url.origin === "https://i.ytimg.com",
        //   }),
        // ],
      },

      includeAssets: ["**/*"],
      manifest: false,
    }),
  ],
  build: {
    outDir: "build",
  },
});
