import { Result } from '../Result';
import { UseCaseError } from '../UseCaseError';

export class Unauthorized extends Result<UseCaseError> {
  constructor(message = 'Not Authorized') {
    super(false, { message } as UseCaseError);
  }
}
