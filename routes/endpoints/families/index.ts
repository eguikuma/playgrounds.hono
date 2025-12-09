import { Hono } from "hono";
import { enter } from "./enter";
import { member } from "./member";

export const families = new Hono()
  .post("/enter", ...enter)
  .get("/member", ...member);
