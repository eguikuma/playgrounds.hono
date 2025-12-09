import { validate as isUUID } from "uuid";
import { z } from "zod";
import { ObjectKey } from "@/models";

export const GetPicturePathParameter = z.object({
  id: z.string().refine((id) => !id || id.split(/[^a-zA-Z0-9-]/).some(isUUID), {
    message: "IDの形式が正しくありません",
  }),
});

export type GetPicturePathParameter = z.infer<typeof GetPicturePathParameter>;

export const GetPictureQueryParameter = z.object({
  kind: z.enum(ObjectKey.Picture).optional(),
});

export type GetPictureQueryParameter = z.infer<typeof GetPictureQueryParameter>;
