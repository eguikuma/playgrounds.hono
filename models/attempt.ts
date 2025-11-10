export const AttemptKind = {
  FailedEmail: "FailedEmail",
} as const;

export type AttemptKind = (typeof AttemptKind)[keyof typeof AttemptKind];

export type Attempt = {
  ip: string;
  kind: AttemptKind;
  at: number;
};
