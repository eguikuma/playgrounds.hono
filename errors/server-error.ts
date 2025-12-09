import { ApplicationError } from "./application-error";

export class ServerError extends ApplicationError {
  constructor() {
    super({
      code: "SERVER_ERROR",
      title: "ありゃ...",
      description: "今はうまく応えてくれないようです。",
    });

    Object.setPrototypeOf(this, ServerError.prototype);
  }
}
