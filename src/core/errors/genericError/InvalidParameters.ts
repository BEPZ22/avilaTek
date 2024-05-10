import { Result } from '../Result';
import { UseCaseError } from '../UseCaseError';

export class InvalidParameters extends Result<UseCaseError> {
  constructor(message: string) {
    super(false, {
      message
    } as UseCaseError);
  }
}
