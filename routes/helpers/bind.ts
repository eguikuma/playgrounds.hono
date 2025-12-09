import { getCloudflareContext } from "@opennextjs/cloudflare";
import type { app } from "..";

export const bind = (_app: typeof app) => (request: Request) => {
  const context = getCloudflareContext();

  return _app.fetch(request, context.env, context.ctx);
};
