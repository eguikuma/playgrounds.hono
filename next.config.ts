import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
import type { NextConfig } from "next";
import { env, stringify } from "./services/env/client";

initOpenNextCloudflareForDev();

const config: NextConfig = {
  env: stringify(env),
  images: {
    loader: "custom",
    loaderFile: "./services/loader/index.ts",
    formats: ["image/webp", "image/avif"],
  },
};

export default env.APP_ANALYZE
  ? require("@next/bundle-analyzer")()(config)
  : config;
