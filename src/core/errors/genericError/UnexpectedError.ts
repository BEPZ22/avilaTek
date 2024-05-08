import { Result } from '../Result';
import { UseCaseError } from '../UseCaseError';

export class UnexpectedError extends Result<UseCaseError> {
  constructor(message = 'Unexpected error occurred') {
    super(false, { message: `Unexpected error: ${message}` } as UseCaseError);
  }
}
