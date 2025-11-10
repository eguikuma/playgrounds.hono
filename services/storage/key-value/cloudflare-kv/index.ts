import type { KeyValueStorageFactory } from "@/models";

export const createCloudflareKV: KeyValueStorageFactory<KVNamespace> = (
  namespace,
) => ({
  get: async (key, kind = "text") => {
    try {
      return namespace.getWithMetadata(key, kind as any);
    } catch (e) {
      console.error("🔥 CloudflareKVからの取得に失敗しました", e);

      return null;
    }
  },
  set: async (key, value, options = {}) => {
    try {
      await namespace.put(key, value, {
        expirationTtl: options.expiry,
        ...(options.metadata ? { metadata: options.metadata } : {}),
      });
    } catch (e) {
      console.error("🔥 CloudflareKVへの書き込みに失敗しました", e);
    }
  },
  delete: async (key) => {
    try {
      await namespace.delete(key);

      return true;
    } catch (e) {
      console.error("🔥 CloudflareKVからの削除に失敗しました", e);

      return false;
    }
  },
  list: async (prefix) => {
    try {
      const { keys } = await namespace.list({ prefix });

      return keys.map((k) => k.name);
    } catch (e) {
      console.error("🔥 CloudflareKVからの一覧取得に失敗しました", e);

      return [];
    }
  },
});
