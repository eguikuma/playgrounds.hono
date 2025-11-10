import type { Context, Next } from "hono";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { AccessMethod } from "@/models";
import { has } from "@/services/assertion/property";
import { factory, url } from "../helpers";

type FailureOptions =
  | {
      redirect: string;
    }
  | {
      message: string;
    };

type GuardOptions = {
  guests?: string[];
  failure: {
    unauthenticated: FailureOptions;
    authenticated: FailureOptions;
  };
};

export const guard = (_options: GuardOptions) =>
  factory.createMiddleware(async (context, next) => {
    const options = {
      guests: [],
      ..._options,
    } as Required<GuardOptions>;
    let session = await context.var.keeper.sessions.get(context.var.ip);

    if (session && context.var.keeper.sessions.expired(session)) {
      await context.var.keeper.sessions.remove(context.var.ip);

      session = null;
    }

    if (session) {
      return authenticated(context, options, next);
    }

    const isWhitelisted = await context.var.keeper.whitelists.ip(
      context.var.ip,
    );
    if (isWhitelisted) {
      await context.var.keeper.sessions.create(context.var.ip, AccessMethod.Ip);

      return authenticated(context, options, next);
    }

    if (!session && options.guests.includes(context.req.path)) {
      await next();

      return;
    }

    return unauthenticated(context, options, next);
  });

const unauthenticated = async (
  context: Context,
  options: Required<GuardOptions>,
  next: Next,
) => {
  if (options.guests.includes(context.req.path)) {
    await next();

    return;
  }

  if (has(options.failure.unauthenticated, "message")) {
    return context.json(
      { message: options.failure.unauthenticated.message },
      StatusCodes.UNAUTHORIZED,
    );
  }

  if (has(options.failure.unauthenticated, "redirect")) {
    return context.redirect(
      url(context, options.failure.unauthenticated.redirect),
    );
  }

  return context.json(
    { message: ReasonPhrases.UNAUTHORIZED },
    StatusCodes.UNAUTHORIZED,
  );
};

const authenticated = async (
  context: Context,
  options: Required<GuardOptions>,
  next: Next,
) => {
  if (!options.guests.includes(context.req.path)) {
    await next();

    return;
  }

  if (has(options.failure.authenticated, "message")) {
    return context.json(
      { message: options.failure.authenticated.message },
      StatusCodes.FORBIDDEN,
    );
  }

  if (has(options.failure.authenticated, "redirect")) {
    return context.redirect(
      url(context, options.failure.authenticated.redirect),
    );
  }

  return context.json(
    { message: ReasonPhrases.FORBIDDEN },
    StatusCodes.FORBIDDEN,
  );
};
