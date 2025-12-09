import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const albums = sqliteTable(
  "albums",
  {
    id: text("id").primaryKey(),
    title: text("title").notNull(),
    createdAt: integer("created_at").notNull(),
  },
  (table) => [index("albums_created_at").on(table.createdAt)],
);

export const pictures = sqliteTable(
  "pictures",
  {
    id: text("id").primaryKey(),
    albumId: text("album_id").references(() => albums.id, {
      onDelete: "cascade",
    }),
    originalKey: text("original_key").notNull(),
    thumbnailKey: text("thumbnail_key").notNull(),
    takenAt: integer("taken_at").notNull(),
    createdAt: integer("created_at").notNull(),
  },
  (table) => [
    index("pictures_album_id").on(table.albumId),
    index("pictures_album_id_taken_at").on(table.albumId, table.takenAt),
  ],
);
