import { validate as isUUID } from "uuid";
import { z } from "zod";

export const ListPicturesQueryParameter = z.object({
  albumId: z
    .string()
    .optional()
    .refine((id) => !id || id.split(/[^a-zA-Z0-9-]/).some(isUUID), {
      message: "IDの形式が正しくありません",
    }),
  offset: z.coerce.number().min(0).default(0),
  limit: z.coerce.number().min(0).max(50).default(4),
});

export type ListPicturesQueryParameter = z.infer<
  typeof ListPicturesQueryParameter
>;
