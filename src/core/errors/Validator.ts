export interface ValidatorResult {
  succeeded: boolean;
  message?: string;
}

export interface ValidatorArgument {
  arg: any;
  argName: string;
}

export type ValidatorArgumentCollection = ValidatorArgument[];

export class Validator {
  public static combine(guardResults: ValidatorResult[]): ValidatorResult {
    for (const result of guardResults) {
      if (result.succeeded === false) return result;
    }

    return { succeeded: true };
  }

  public static notNullOrUndefined(arg: any, argName: string): ValidatorResult {
    if (arg === null || arg === undefined) {
      return {
        succeeded: false,
        message: `${argName} is null or undefined`
      };
    }
    return { succeeded: true };
  }

  public static notEmptyString(arg: string, argName: string): ValidatorResult {
    if (arg === '') {
      return {
        succeeded: false,
        message: `${argName} is empty`
      };
    }
    return { succeeded: true };
  }

  public static notEmptyStringBulk(
    args: ValidatorArgumentCollection
  ): ValidatorResult {
    for (const arg of args) {
      const result = Validator.notEmptyString(arg.arg, arg.argName);
      if (!result.succeeded) return result;
    }

    return { succeeded: true };
  }

  public static notNullOrUndefinedBulk(
    args: ValidatorArgumentCollection
  ): ValidatorResult {
    for (const arg of args) {
      const result = Validator.notNullOrUndefined(arg.arg, arg.argName);
      if (!result.succeeded) return result;
    }

    return { succeeded: true };
  }

  public static isOneOf(
    value: any,
    validEnum: any[],
    argName: string
  ): ValidatorResult {
    let isValid = false;

    for (const v of validEnum) {
      if (value === v) {
        isValid = true;
      }
    }

    if (isValid) {
      return { succeeded: true };
    }

    return {
      succeeded: false,
      message: `Value ${argName} is not a valid option of ${JSON.stringify(
        validEnum
      )}. Got: ${value}`
    };
  }
}
