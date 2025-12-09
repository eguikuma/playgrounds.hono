import { eq } from "drizzle-orm";
import { StatusCodes } from "http-status-codes";
import { albums } from "@/database/schema";
import { validator } from "@/routes/middlewares";
import { factory } from "../../../helpers";
import { GetAlbumPathParameter } from "./schema";

export const get = factory.createHandlers(
  validator.path(GetAlbumPathParameter),
  async (context) => {
    try {
      const { id } = context.req.valid("param");

      if (!id) {
        return context.json(
          { message: "そのアルバムは見覚えがないようです" },
          StatusCodes.BAD_REQUEST,
        );
      }

      const album = (
        await context.var.database
          .select()
          .from(albums)
          .where(eq(albums.id, id))
          .limit(1)
      )[0];

      if (!album) {
        return context.json(
          { message: "そのアルバムは見覚えがないようです" },
          StatusCodes.NOT_FOUND,
        );
      }

      return context.json(
        {
          data: {
            id: album.id,
            title: album.title,
            createdAt: album.createdAt,
          },
        },
        StatusCodes.OK,
      );
    } catch (e) {
      console.error("⚠️ アルバムの取得に失敗しました", e);

      return context.json(
        { message: "アルバムの取得に失敗しました" },
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  },
);
