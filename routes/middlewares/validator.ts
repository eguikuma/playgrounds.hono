import { zValidator } from "@hono/zod-validator";
import type {
  Context,
  MiddlewareHandler,
  Next,
  TypedResponse,
  ValidationTargets,
} from "hono";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { z } from "zod";
import { factory, toBody } from "../helpers";

const hasBody = <Kind extends keyof Pick<ValidationTargets, "json" | "form">>(
  kind: Kind,
) =>
  zValidator(
    kind,
    z
      .record(z.any(), z.any())
      .refine((object) => Object.keys(object).length > 0),
    ({ success }, context) => {
      if (!success) {
        return context.json(
          { message: ReasonPhrases.UNPROCESSABLE_ENTITY },
          StatusCodes.UNPROCESSABLE_ENTITY,
        );
      }
    },
  );

const json = <Schema extends z.ZodType>(
  schema: Schema,
): MiddlewareHandler<
  any,
  string,
  {
    in: { json: z.input<Schema> };
    out: { json: z.output<Schema> };
  },
  | Response
  | TypedResponse<
      { message: ReasonPhrases },
      StatusCodes.UNPROCESSABLE_ENTITY,
      "json"
    >
> => {
  const middleware = zValidator("json", schema, ({ success }, context) => {
    if (!success) {
      return context.json(
        { message: ReasonPhrases.UNPROCESSABLE_ENTITY },
        StatusCodes.UNPROCESSABLE_ENTITY,
      );
    }
  });

  return async (context: Context, next: Next) => {
    const invalid = await hasBody("json")(context, async () => {});

    if (invalid) {
      return invalid;
    }

    return await middleware(context, next);
  };
};

const form = <Schema extends z.ZodType>(schema: Schema) => {
  const middleware = factory.createMiddleware(async (context, next) => {
    const body = await toBody(context, schema);

    if (!body) {
      return context.json(
        { message: ReasonPhrases.UNPROCESSABLE_ENTITY },
        StatusCodes.UNPROCESSABLE_ENTITY,
      );
    }

    await next();
  });

  return middleware;
};

const path = <Schema extends z.ZodType>(schema: Schema) =>
  zValidator("param", schema, ({ success }, context) => {
    if (!success) {
      return context.json(
        { message: ReasonPhrases.UNPROCESSABLE_ENTITY },
        StatusCodes.UNPROCESSABLE_ENTITY,
      );
    }
  });

const query = <Schema extends z.ZodType>(schema: Schema) =>
  zValidator("query", schema, ({ success }, context) => {
    if (!success) {
      return context.json(
        { message: ReasonPhrases.UNPROCESSABLE_ENTITY },
        StatusCodes.UNPROCESSABLE_ENTITY,
      );
    }
  });

export const validator = {
  json,
  form,
  path,
  query,
};
