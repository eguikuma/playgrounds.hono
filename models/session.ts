import type { AccessMethod } from "./access-method";

export type Session = {
  id: string;
  method: AccessMethod;
  ip: string;
  createdAt: number;
  expiredAt: number;
};

export const SessionOptions = {
  LifetimeMilliseconds: 30 * 24 * 60 * 60 * 1000,
} as const;
