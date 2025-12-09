import { validate as isUUID } from "uuid";
import { z } from "zod";

export const GetAlbumPathParameter = z.object({
  id: z.string().refine((id) => !id || id.split(/[^a-zA-Z0-9-]/).some(isUUID), {
    message: "IDの形式が正しくありません",
  }),
});

export type GetAlbumPathParameter = z.infer<typeof GetAlbumPathParameter>;
