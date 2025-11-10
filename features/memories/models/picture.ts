import z from "zod";

export type PictureCard = {
  id: string;
  albumId: string | null;
  originalUrl: string;
  thumbnailUrl: string;
  takenAt: string;
  priority: boolean;
};

export const UploadPicturesFields = z.object({
  albumId: z.string().nullable(),
  files: z
    .array(
      z.object({
        id: z.string(),
        value: z
          .instanceof(File)
          .refine(
            (file) => file.size <= 10 * 1024 * 1024,
            "ファイルサイズは10MB以下にしてください",
          ),
        preview: z.string(),
      }),
    )
    .min(1, "写真を1枚以上選択してください")
    .max(20, "一度にアップロードできる写真は20枚までです")
    .refine(
      (files) =>
        files.reduce((sum, file) => sum + file.value.size, 0) <=
        10 * 1024 * 1024 * 5,
      "ファイルサイズは合計50MB以下にしてください",
    ),
});

export type UploadPicturesFields = z.infer<typeof UploadPicturesFields>;
