import { hc } from "hono/client";

import type { app } from "@/routes";
import { env } from "../env/client";

export type PathParameters<T extends object> = {
  params: Promise<T>;
};

export const http = hc<typeof app>(env.APP_URL).api;
