import type { AccessMethod } from "./access-method";

export type VerifiedMember = {
  method: AccessMethod;
};

export type UnverifiedMember = null;

export type Member = VerifiedMember | UnverifiedMember;
