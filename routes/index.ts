import { except } from "hono/combine";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { toYYYYMMDDHHmmss } from "@/services/date";
import { env } from "@/services/env/server";
import { albums } from "./endpoints/albums";
import { families } from "./endpoints/families";
import { pictures } from "./endpoints/pictures";
import { factory } from "./helpers";
import { guard } from "./middlewares";

export const app = factory
  .createApp()
  .basePath("/api")
  .use(
    except(
      ["/api/families/member"],
      guard({
        guests: ["/api/families/enter"],
        failure: {
          unauthenticated: {
            message: "おうちに入ることができませんでした",
          },
          authenticated: {
            message: "既におうちに入っています",
          },
        },
      }),
    ),
  )
  .route("/families", families)
  .route("/albums", albums)
  .route("/pictures", pictures)
  .notFound((context) =>
    context.json({ message: ReasonPhrases.NOT_FOUND }, StatusCodes.NOT_FOUND),
  )
  .onError((e, context) => {
    console.error("🚨 予期せぬエラーが発生しました", {
      error: {
        name: e.name,
        message: e.message,
        stack: e.stack,
      },
      request: {
        method: context.req.method,
        path: context.req.path,
        userAgent: context.req.header("user-agent"),
        ip: context.get("ip"),
        timestamp: toYYYYMMDDHHmmss(),
      },
    });

    return context.json(
      {
        message: ReasonPhrases.INTERNAL_SERVER_ERROR,
        ...(env.APP_DEBUG && {
          debug: {
            error: e.message,
            path: context.req.path,
            method: context.req.method,
          },
        }),
      },
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
  });
