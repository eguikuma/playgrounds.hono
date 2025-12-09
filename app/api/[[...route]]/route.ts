import { app } from "@/routes";
import { bind } from "@/routes/helpers";

export const GET = bind(app);
export const POST = bind(app);
export const PATCH = bind(app);
export const PUT = bind(app);
export const DELETE = bind(app);
