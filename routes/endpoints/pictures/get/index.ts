import { eq } from "drizzle-orm";
import { StatusCodes } from "http-status-codes";
import { pictures } from "@/database/schema";
import { CacheKey, ObjectKey } from "@/models";
import { validator } from "@/routes/middlewares";
import { factory } from "../../../helpers";
import { GetPicturePathParameter, GetPictureQueryParameter } from "./schema";

export const get = factory.createHandlers(
  validator.path(GetPicturePathParameter),
  validator.query(GetPictureQueryParameter),
  async (context) => {
    try {
      const { id } = context.req.valid("param");
      const kind = context.req.query("kind") || ObjectKey.Picture.original;

      if (!id) {
        return context.json(
          { message: "その写真は見覚えがないようです" },
          StatusCodes.BAD_REQUEST,
        );
      }

      const cached = await context.var.cache.albums.get(
        `${CacheKey.Pictures}:${id}:${kind}`,
        "arrayBuffer",
      );

      if (cached && cached.value && cached.metadata && cached.metadata.mime) {
        return context.newResponse(cached.value, StatusCodes.OK, {
          "Content-Type": cached.metadata.mime,
          "Cache-Control": "public, max-age=3600",
        });
      }

      const picture = (
        await context.var.database
          .select({
            id: pictures.id,
            originalKey: pictures.originalKey,
            thumbnailKey: pictures.thumbnailKey,
          })
          .from(pictures)
          .where(eq(pictures.id, id))
          .limit(1)
      )[0];

      if (!picture) {
        return context.json(
          { message: "その写真は見覚えがないようです" },
          StatusCodes.NOT_FOUND,
        );
      }

      const object = await context.var.buckets.pictures.get(
        kind === ObjectKey.Picture.original
          ? picture.originalKey
          : picture.thumbnailKey,
      );

      if (!object) {
        return context.json(
          { message: "その写真は見覚えがないようです" },
          StatusCodes.NOT_FOUND,
        );
      }

      await context.var.cache.albums.set(
        `${CacheKey.Pictures}:${picture.id}:${kind}`,
        object.data,
        {
          metadata: { mime: object.mime },
        },
      );

      return context.newResponse(object.data, StatusCodes.OK, {
        "Content-Type": object.mime,
        "Cache-Control": "public, max-age=3600",
        "ETag": picture.id,
      });
    } catch (e) {
      console.error("⚠️ 写真の取得に失敗しました", e);

      return context.json(
        { message: "写真の取得に失敗しました" },
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  },
);
