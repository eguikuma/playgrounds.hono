import { createFactory } from "hono/factory";

import { logger } from "hono/logger";
import { secureHeaders } from "hono/secure-headers";
import { type Environment, environment } from "../middlewares";

export const factory = createFactory<{
  Variables: Environment["Variables"];
}>({
  initApp: (app) => app.use(secureHeaders()).use(logger()).use(environment()),
});
