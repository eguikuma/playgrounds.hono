import type { Context } from "hono";

export const redirect = {
  home: "/albums",
  unauthenticated: "/house-entries/enter",
  authenticated: "/",
  unexpected: "/house-trouble",
};

export const url = (context: Context, pathname: string) =>
  new URL(pathname, context.req.url);
