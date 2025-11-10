import { StatusCodes } from "http-status-codes";
import { albums } from "@/database/schema";
import { validator } from "@/routes/middlewares";
import { date } from "@/services/date";
import { uuid } from "@/services/uuid";
import { factory } from "../../../helpers";
import { CreateAlbumBody } from "./schema";

export const create = factory.createHandlers(
  validator.json(CreateAlbumBody),
  async (context) => {
    try {
      const body = context.req.valid("json");
      const id = uuid();
      const now = date().valueOf();

      await context.var.database.insert(albums).values({
        id,
        title: body.title,
        createdAt: now,
      });

      return context.json(
        {
          data: {
            id,
            title: body.title,
            createdAt: now,
          },
        },
        StatusCodes.CREATED,
      );
    } catch (e) {
      console.error("🔥 アルバムの作成に失敗しました", e);

      return context.json(
        { message: "アルバムの作成に失敗しました" },
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  },
);
