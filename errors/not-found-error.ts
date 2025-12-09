import { ApplicationError } from "./application-error";

export class NotFoundError extends ApplicationError {
  constructor() {
    super({
      code: "NOT_FOUND_ERROR",
      title: "うーん...",
      description: "探しているものはどこか別の場所にあるようです。",
    });

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}
