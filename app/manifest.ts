import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "おうちずかん",
    short_name: "おうちずかん",
    description: "おうちの大切な瞬間を記録する家族のずかん",
    start_url: "/",
    display: "standalone",
    icons: [
      {
        src: "/favicon-192x192.png",
        type: "image/png",
        sizes: "192x192",
      },
      {
        src: "/favicon-512x512.png",
        type: "image/png",
        sizes: "512x512",
      },
      {
        src: "/favicon-192x192-maskable.png",
        type: "image/png",
        sizes: "192x192",
        purpose: "maskable",
      },
      {
        src: "/favicon-512x512-maskable.png",
        type: "image/png",
        sizes: "512x512",
        purpose: "maskable",
      },
    ],
    shortcuts: [
      {
        name: "おうちずかん",
        short_name: "おうちずかん",
        url: "/",
        icons: [
          {
            src: "/favicon-192x192.png",
            type: "image/png",
            sizes: "192x192",
          },
          {
            src: "/favicon-192x192-maskable.png",
            type: "image/png",
            sizes: "192x192",
            purpose: "maskable",
          },
        ],
      },
    ],
  };
}
