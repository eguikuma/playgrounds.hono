import { except } from "hono/combine";
import type { MiddlewareConfigInput as Config } from "next/dist/build/segment-config/middleware/middleware-config";
import { NextResponse } from "next/server";
import { bind, factory, redirect, url } from "./routes/helpers";
import { guard } from "./routes/middlewares";

export const config: Config = {
  matcher: [
    {
      source:
        "/((?!api|_next/static|_next/image|favicon*|icon.svg|manifest*|scripts).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        /**
         * { type: "header", key: "purpose", value: "prefetch" },
         *
         * @see https://developer.chrome.com/docs/web-platform/prerender-pages?hl=ja
         * @see https://lionralfs.dev/blog/exploring-the-usage-of-prefetch-headers
         */
      ],
    },
  ],
};

export const proxy = bind(
  factory
    .createApp()
    .get("/", (context) => NextResponse.redirect(url(context, redirect.home)))
    .use(
      except(
        [redirect.unexpected],
        guard({
          guests: [redirect.unauthenticated],
          failure: {
            unauthenticated: {
              redirect: redirect.unauthenticated,
            },
            authenticated: {
              redirect: redirect.authenticated,
            },
          },
        }),
      ),
    )
    .all("*", () => NextResponse.next())
    .onError((_, context) =>
      NextResponse.rewrite(url(context, redirect.unexpected)),
    ),
);
