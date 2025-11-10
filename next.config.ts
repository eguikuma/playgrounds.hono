import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
import type { NextConfig } from "next";
import { env } from "./services/env/client";

const config: NextConfig = {
  env: env as unknown as NextConfig["env"],
  images: {
    loader: "custom",
    loaderFile: "./services/loader/index.ts",
    formats: ["image/webp", "image/avif"],
  },
};

initOpenNextCloudflareForDev();

export default env.APP_ANALYZE
  ? require("@next/bundle-analyzer")()(config)
  : config;
