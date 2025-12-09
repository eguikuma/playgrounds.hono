import type { Context } from "hono";
import { getConnInfo } from "hono/cloudflare-workers";
import { keeper } from "@/services/keeper";
import {
  createDatabaseStorage,
  createKeyValueStorage,
  createObjectStorage,
} from "@/services/storage";
import { factory } from "../helpers";

export type Environment = {
  Bindings: Cloudflare.Env;
  Variables: {
    ip: string;
    keeper: ReturnType<typeof keeper>;
    cache: {
      albums: ReturnType<typeof createKeyValueStorage>;
    };
    buckets: {
      pictures: ReturnType<typeof createObjectStorage>;
    };
    database: ReturnType<typeof createDatabaseStorage>;
  };
};

export const environment = () =>
  factory.createMiddleware(async (context, next) => {
    const _context = context as unknown as Context<Environment>;

    context.set(
      "ip",
      getConnInfo(context).remote.address ||
        context.req.header("x-real-ip") ||
        context.req.header("cf-connecting-ip") ||
        context.req.header("x-forwarded-for") ||
        "127.0.0.1",
    );

    context.set("keeper", keeper(createKeyValueStorage(_context.env.Families)));

    context.set("cache", {
      albums: createKeyValueStorage(_context.env.Albums),
    });

    context.set("buckets", {
      pictures: createObjectStorage(_context.env.Pictures),
    });

    context.set("database", createDatabaseStorage(_context.env.Database));

    await next();
  });
