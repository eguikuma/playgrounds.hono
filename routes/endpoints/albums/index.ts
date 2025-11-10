import { Hono } from "hono";
import { create } from "./create";
import { get } from "./get";
import { list } from "./list";

export const albums = new Hono()
  .get("/", ...list)
  .post("/", ...create)
  .get("/:id", ...get);
