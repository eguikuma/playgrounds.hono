import { CacheKey, type KeyValueStorageFactory } from "@/models";
import { date } from "../../../date";

type Entry = {
  value: string | ArrayBuffer;
  expiry?: number;
  metadata?: any;
};

const store = new Map<string, Entry>();

export const createInMemory: KeyValueStorageFactory = () => {
  if (!store.has(`${CacheKey.Whitelists}:ips`)) {
    store.set(`${CacheKey.Whitelists}:ips`, {
      value: JSON.stringify(["127.0.0.1", "::1", "::ffff:127.0.0.1"]),
    });
  }

  if (!store.has(`${CacheKey.Whitelists}:emails`)) {
    store.set(`${CacheKey.Whitelists}:emails`, {
      value: JSON.stringify(["hono@example.com"]),
    });
  }

  return {
    get: async (key, _kind = "text") => {
      const entry = store.get(key);

      if (!entry) return null;

      if (entry.expiry && entry.expiry < date().valueOf()) {
        store.delete(key);

        return null;
      }

      return { value: entry.value, metadata: entry.metadata };
    },
    set: async (key, value, options = {}) => {
      store.set(key, {
        value,
        expiry: options.expiry
          ? date().valueOf() + options.expiry * 1000
          : undefined,
        metadata: options.metadata,
      });
    },
    delete: async (key) => {
      return store.delete(key);
    },
    list: async (prefix) => {
      const now = date().valueOf();
      const keys: string[] = [];

      for (const [key, entry] of store.entries()) {
        if (key.startsWith(prefix)) {
          if (!entry.expiry || entry.expiry > now) {
            keys.push(key);
          } else {
            store.delete(key);
          }
        }
      }

      return keys;
    },
  };
};
