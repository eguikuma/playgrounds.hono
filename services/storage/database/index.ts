import type { DatabaseStorageFactory } from "@/models";
import { env } from "@/services/env/server";
import { createCloudflareD1 } from "./cloudflare-d1";

const createFactory = (): DatabaseStorageFactory => {
  if (!env.APP_DEBUG) return createCloudflareD1;

  return createCloudflareD1;
};

export const createDatabaseStorage = createFactory();
