type ApplicationErrorProps = {
  code: string;
  title: string;
  description: string;
};

export class ApplicationError extends Error {
  name: string;
  code: string;
  title: string;
  description: string;

  constructor({ code, title, description }: ApplicationErrorProps) {
    super(title);

    this.name = this.constructor.name;
    this.code = code;
    this.title = title;
    this.description = description;

    Object.setPrototypeOf(this, ApplicationError.prototype);
  }
}
