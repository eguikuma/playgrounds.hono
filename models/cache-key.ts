export const CacheKey = {
  Sessions: "sessions",
  Whitelists: "whitelists",
  Attempts: "attempts",
  Pictures: "pictures",
} as const;

export type CacheKey = (typeof CacheKey)[keyof typeof CacheKey];
