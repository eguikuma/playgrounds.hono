import { ApplicationError } from "./application-error";

export class NetworkError extends ApplicationError {
  constructor() {
    super({
      code: "NETWORK_ERROR",
      title: "あら...",
      description: "インターネットの調子が悪いようです。",
    });

    Object.setPrototypeOf(this, NetworkError.prototype);
  }
}
