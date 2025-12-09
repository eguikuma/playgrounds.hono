import type { KeyValueStorageFactory } from "@/models";
import { env } from "@/services/env/server";
import { createCloudflareKV } from "./cloudflare-kv";
import { createInMemory } from "./in-memory";

const createFactory = (): KeyValueStorageFactory => {
  if (!env.APP_DEBUG) return createCloudflareKV;

  return createInMemory;
};

export const createKeyValueStorage = createFactory();
