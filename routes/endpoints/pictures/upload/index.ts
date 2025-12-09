import { eq } from "drizzle-orm";
import { chunk } from "es-toolkit/array";
import { StatusCodes } from "http-status-codes";
import { albums, pictures } from "@/database/schema";
import { ObjectKey } from "@/models";
import { validator } from "@/routes/middlewares";
import { date } from "@/services/date";
import { uuid } from "@/services/uuid";
import { factory, toBody } from "../../../helpers";
import { UploadPicturesBody } from "./schema";

export const upload = factory.createHandlers(
  validator.form(UploadPicturesBody),
  async (context) => {
    const body = (await toBody(context, UploadPicturesBody))!;

    if (!body) {
      return context.json(
        { message: "何も送られていません" },
        StatusCodes.BAD_REQUEST,
      );
    }

    if (body.albumId) {
      const exists = !!(
        await context.var.database
          .select()
          .from(albums)
          .where(eq(albums.id, body.albumId))
          .limit(1)
      )[0];

      if (!exists) {
        return context.json(
          { message: "そのアルバムは見覚えがないようです" },
          StatusCodes.BAD_REQUEST,
        );
      }
    }

    const data: (typeof pictures.$inferSelect)[] = [];
    const uploaded: string[] = [];

    try {
      for (let i = 0; i < body.originals.length; i++) {
        const originalKey = `${ObjectKey.Picture.original}/${uuid()}`;
        const thumbnailKey = `${ObjectKey.Picture.thumbnail}/${uuid()}`;
        const now = date().valueOf();

        try {
          await context.var.buckets.pictures.put(
            originalKey,
            await body.originals[i].arrayBuffer(),
            {
              mime: body.originals[i].type,
            },
          );
          uploaded.push(originalKey);

          await context.var.buckets.pictures.put(
            thumbnailKey,
            await body.thumbnails[i].arrayBuffer(),
            {
              mime: body.thumbnails[i].type,
            },
          );
          uploaded.push(thumbnailKey);

          data.push({
            id: uuid(),
            albumId: body.albumId,
            originalKey,
            thumbnailKey,
            takenAt: now,
            createdAt: now,
          });
        } catch (e) {
          console.error(
            `⚠️ ${body.originals[i].name}のアップロードに失敗しました`,
            e,
          );

          throw e;
        }
      }

      if (data.length > 0) {
        const chunks = chunk(data, 16);
        const inserted: string[] = [];

        try {
          for (const chunk of chunks) {
            await context.var.database.insert(pictures).values(chunk);

            inserted.push(...chunk.map(({ id }) => id));
          }
        } catch (e) {
          console.error("⚠️ 写真の追加に失敗しました", e);

          if (inserted.length > 0) {
            try {
              for (const id of inserted) {
                await context.var.database
                  .delete(pictures)
                  .where(eq(pictures.id, id));
              }
            } catch (e) {
              console.error("⚠️ 写真の削除に失敗しました", e);
            }
          }

          throw e;
        }
      }

      return context.json({ data }, StatusCodes.CREATED);
    } catch (e) {
      console.error("🔥 写真のアップロードに失敗しました", e);

      try {
        await Promise.all(
          uploaded.map(async (key: string) => {
            try {
              await context.var.buckets.pictures.delete(key);
            } catch (e) {
              console.error(`⚠️ ${key}の削除に失敗しました`, e);
            }
          }),
        );
      } catch (e) {
        console.error(`⚠️ 写真のクリーンアップに失敗しました`, e);
      }

      return context.json(
        { message: "写真のアップロードに失敗しました" },
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  },
);
