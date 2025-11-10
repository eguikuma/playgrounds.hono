export const AccessMethod = {
  Ip: "Ip",
  Email: "Email",
} as const;

export type AccessMethod = (typeof AccessMethod)[keyof typeof AccessMethod];
