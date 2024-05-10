import { Result } from '../Result';
import { UseCaseError } from '../UseCaseError';

export class PhoneVerificationError extends Result<UseCaseError> {
  constructor() {
    super(false, {
      message: `Phone verification service error`
    } as UseCaseError);
  }
}
