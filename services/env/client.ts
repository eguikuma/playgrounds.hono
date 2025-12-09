import z from "zod";

export const EnvironmentForClient = z.object({
  APP_ENV: z.enum(["preview", "production"]).default("preview"),
  APP_URL: z.url(),
  APP_DEBUG: z.preprocess((value) => JSON.parse(`${value}`), z.boolean()),
  APP_ANALYZE: z.preprocess((value) => JSON.parse(`${value}`), z.boolean()),
});

export const env = EnvironmentForClient.parse({
  APP_ENV: process.env.APP_ENV,
  APP_URL: process.env.APP_URL,
  APP_DEBUG: process.env.APP_DEBUG,
  APP_ANALYZE: process.env.APP_ANALYZE,
});

export const stringify = (
  env: Record<string, unknown>,
): Record<string, string> =>
  Object.fromEntries(
    Object.entries(env).map(([key, value]) => [key, String(value)]),
  );
