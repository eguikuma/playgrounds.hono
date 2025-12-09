import { z } from "zod";

export const EnterFamilyBody = z.object({
  email: z.email("メールアドレスの形式が正しくないようです"),
});

export type EnterFamilyBody = z.infer<typeof EnterFamilyBody>;
