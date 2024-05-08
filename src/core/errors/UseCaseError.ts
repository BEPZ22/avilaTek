interface GenericUseCaseError {
  message: string;
}

export abstract class UseCaseError implements GenericUseCaseError {
  public readonly message: string;

  constructor(message: string) {
    this.message = message;
  }
}
