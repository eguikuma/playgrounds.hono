import { type Version4Options, v4 } from "uuid";

export const uuid = (options?: Version4Options) => v4(options);
