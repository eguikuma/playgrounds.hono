import { Hono } from "hono";
import { get } from "./get";
import { list } from "./list";
import { upload } from "./upload";

export const pictures = new Hono()
  .get("/", ...list)
  .post("/", ...upload)
  .get("/:id", ...get);
