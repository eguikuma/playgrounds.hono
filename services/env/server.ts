import z from "zod";
import { EnvironmentForClient } from "./client";

const EnvironmentForServer = EnvironmentForClient.extend({
  CLOUDFLARE_ACCOUNT_ID: z.string(),
  CLOUDFLARE_DATABASE_ID: z.string(),
  CLOUDFLARE_D1_TOKEN: z.string(),
  SQLITE_DATABASE_URL: z.string().optional(),
});

export const env = EnvironmentForServer.parse({
  APP_ENV: process.env.APP_ENV,
  APP_URL: process.env.APP_URL,
  APP_DEBUG: process.env.APP_DEBUG,
  APP_ANALYZE: process.env.APP_ANALYZE,
  CLOUDFLARE_ACCOUNT_ID: process.env.CLOUDFLARE_ACCOUNT_ID,
  CLOUDFLARE_DATABASE_ID: process.env.CLOUDFLARE_DATABASE_ID,
  CLOUDFLARE_D1_TOKEN: process.env.CLOUDFLARE_D1_TOKEN,
  SQLITE_DATABASE_URL: process.env.SQLITE_DATABASE_URL,
});
