export class ResourceNotFoundError extends Error {
  public message: string;
  public name: string;
    constructor(message: string, name: string) {
      super();
      this.message = message;
      this.name = name;
    }
}
