import { ApplicationError } from "./application-error";

export class UnknownError extends ApplicationError {
  constructor() {
    super({
      code: "UNKNOWN_ERROR",
      title: "おっと...",
      description: "何かが思い通りに動いていないようです。",
    });

    Object.setPrototypeOf(this, UnknownError.prototype);
  }
}
