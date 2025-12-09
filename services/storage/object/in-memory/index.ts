import type { ObjectStorageFactory } from "@/models";

type Entry = {
  data: ArrayBuffer;
  mime: string;
};

const store = new Map<string, Entry>();

export const createInMemory: ObjectStorageFactory = () => ({
  async get(key) {
    try {
      const object = store.get(key);

      if (!object) return null;

      return {
        data: object.data,
        mime: object.mime,
      };
    } catch (e) {
      console.error("🔥 インメモリからの取得に失敗しました", e);

      return null;
    }
  },
  async put(key, value, options) {
    try {
      const buffer =
        value instanceof ArrayBuffer
          ? value
          : new TextEncoder().encode(String(value)).buffer;

      store.set(key, {
        data: buffer,
        mime: options?.mime || "application/octet-stream",
      });
    } catch (e) {
      console.error("🔥 インメモリへの書き込みに失敗しました", e);
    }
  },
  async delete(key) {
    try {
      return store.delete(key);
    } catch (e) {
      console.error("🔥 インメモリからの削除に失敗しました", e);

      return false;
    }
  },
});
