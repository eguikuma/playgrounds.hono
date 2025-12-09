import type { Context } from "hono";
import type { z } from "zod";

export const toBody = async <Schema extends z.ZodType>(
  context: Context,
  schema: Schema,
) => {
  const body: Record<string, any> = {};

  for (const [key, value] of Object.entries(
    await context.req.parseBody({ all: true }),
  )) {
    if (value instanceof File) {
      body[key] = [value];
    } else if (Array.isArray(value)) {
      body[key] = [];
      for (const [index, values] of value.entries()) {
        body[key][index] = parse(values);
      }
    } else {
      try {
        body[key] =
          typeof value === "string" ? JSON.parse(value) : parse(value);
      } catch {
        body[key] = value;
      }
    }
  }

  const { success, data } = schema.safeParse(body);

  if (!success) return null;

  return data;
};

const parse = (value: any): any => {
  if (value instanceof File) {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map((_value) => parse(_value));
  }

  if (value && typeof value === "object" && !(value instanceof File)) {
    const parsed: Record<string, any> = {};

    for (const [_key, _value] of Object.entries(value)) {
      parsed[_key] = parse(_value);
    }

    return parsed;
  }

  if (typeof value === "string") {
    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  }

  return value;
};
