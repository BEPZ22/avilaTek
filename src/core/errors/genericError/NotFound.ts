import { Result } from '../Result';
import { UseCaseError } from '../UseCaseError';

export class NotFound extends Result<UseCaseError> {
  constructor(message = 'Not found') {
    super(false, { message } as UseCaseError);
  }
}
