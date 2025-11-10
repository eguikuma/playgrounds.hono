import { v4 as uuid } from "uuid";

import {
  type AccessMethod,
  type Attempt,
  type AttemptKind,
  CacheKey,
  type KeyValueStorage,
  RateLimitOptions,
  type Session,
  SessionOptions,
} from "@/models";
import { date } from "../date";

const sessions = (kv: KeyValueStorage) => {
  const generateKey = (ip: string) => `${CacheKey.Sessions}:${ip}`;

  const get = async (ip: string) => {
    try {
      const found = await kv.get(generateKey(ip));

      return found ? (JSON.parse(found.value as string) as Session) : null;
    } catch (e) {
      console.error("🔥 セッションの取得に失敗しました", e);

      return null;
    }
  };

  const create = async (ip: string, method: AccessMethod) => {
    const now = date().valueOf();
    const created: Session = {
      id: uuid(),
      method,
      ip,
      createdAt: now,
      expiredAt: now + SessionOptions.LifetimeMilliseconds,
    };

    try {
      await kv.set(generateKey(ip), JSON.stringify(created), {
        expiry: SessionOptions.LifetimeMilliseconds / 1000,
      });

      return created;
    } catch (e) {
      console.error("🔥 セッションの作成に失敗しました", e);

      return null;
    }
  };

  const remove = async (ip: string) => {
    try {
      return await kv.delete(generateKey(ip));
    } catch (e) {
      console.error("🔥 セッションの削除に失敗しました", e);

      return false;
    }
  };

  const expired = (session: Session) => session.expiredAt < date().valueOf();

  return {
    get,
    create,
    remove,
    expired,
  };
};

const whitelists = (kv: KeyValueStorage) => {
  const generateKey = (kind: "ips" | "emails") =>
    `${CacheKey.Whitelists}:${kind}`;

  const ip = async (ip: string) => {
    try {
      const found = await kv.get(generateKey("ips"));

      if (!found) {
        return false;
      }

      return (JSON.parse(found.value as string) as string[]).includes(ip);
    } catch (e) {
      console.error("🔥 IPアドレスの認証に失敗しました", e);

      return false;
    }
  };

  const email = async (email: string) => {
    try {
      const found = await kv.get(generateKey("emails"));

      if (!found) {
        return false;
      }

      return (JSON.parse(found.value as string) as string[]).includes(email);
    } catch (e) {
      console.error("🔥 メールアドレスの認証に失敗しました", e);

      return false;
    }
  };

  return {
    ip,
    email,
  };
};

const attempts = (kv: KeyValueStorage) => {
  const generateKey = (ip: string) => `${CacheKey.Attempts}:${ip}`;

  const add = async (ip: string, kind: AttemptKind) => {
    try {
      const key = generateKey(ip);
      const now = date().valueOf();
      const found = await kv.get(key);

      let attempts: Attempt[] = found ? JSON.parse(found.value as string) : [];
      attempts = attempts.filter(
        ({ at }) => now - at < RateLimitOptions.CountingPeriodMilliseconds,
      );
      attempts.push({ ip, kind, at: now });

      await kv.set(key, JSON.stringify(attempts), {
        expiry: RateLimitOptions.LockoutDurationSeconds,
      });
    } catch (e) {
      console.error("🔥 試行回数の追加に失敗しました", e);
    }
  };

  const verify = async (ip: string) => {
    try {
      const key = generateKey(ip);
      const found = await kv.get(key);

      if (!found) return true;

      const attempts = (JSON.parse(found.value as string) as Attempt[]).filter(
        ({ at }) =>
          date().valueOf() - at < RateLimitOptions.CountingPeriodMilliseconds,
      );

      return attempts.length < RateLimitOptions.MaxAttempts;
    } catch (e) {
      console.error("🔥 試行回数の検証に失敗しました", e);

      return true;
    }
  };

  return {
    add,
    verify,
  };
};

export const keeper = (kv: KeyValueStorage) => ({
  sessions: sessions(kv),
  whitelists: whitelists(kv),
  attempts: attempts(kv),
});
