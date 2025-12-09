import { drizzle } from "drizzle-orm/d1";
import type { DatabaseStorageFactory } from "@/models";

export const createCloudflareD1: DatabaseStorageFactory<D1Database> = (
  _database,
) => drizzle(_database);
