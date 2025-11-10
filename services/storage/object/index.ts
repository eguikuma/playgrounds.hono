import type { ObjectStorageFactory } from "@/models";
import { env } from "@/services/env/server";
import { createCloudflareR2 } from "./cloudflare-r2";
import { createInMemory } from "./in-memory";

const createFactory = (): ObjectStorageFactory => {
  if (!env.APP_DEBUG) return createCloudflareR2;

  return createInMemory;
};

export const createObjectStorage = createFactory();
