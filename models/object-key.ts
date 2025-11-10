export const ObjectKey = {
  Picture: {
    original: "original",
    thumbnail: "thumbnail",
  },
} as const;

export type ObjectKey = typeof ObjectKey;
