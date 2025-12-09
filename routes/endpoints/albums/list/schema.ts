import { z } from "zod";

export const ListAlbumsQueryParameter = z.object({
  offset: z.coerce.number().min(0).default(0),
  limit: z.coerce.number().min(0).max(50).default(4),
});

export type ListAlbumsQueryParameter = z.infer<typeof ListAlbumsQueryParameter>;
