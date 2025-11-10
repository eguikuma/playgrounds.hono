import { defineConfig } from "drizzle-kit";
import { env } from "@/services/env/server";

export default defineConfig({
  schema: "./database/schema.ts",
  out: "./database/migrations",
  dialect: "sqlite",
  ...(env.APP_DEBUG
    ? {
        url: env.SQLITE_DATABASE_URL!,
      }
    : {
        driver: "d1-http",
        dbCredentials: {
          accountId: env.CLOUDFLARE_ACCOUNT_ID,
          databaseId: env.CLOUDFLARE_DATABASE_ID,
          token: env.CLOUDFLARE_D1_TOKEN,
        },
      }),
});
