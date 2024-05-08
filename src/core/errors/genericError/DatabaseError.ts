import { Result } from '../Result';
import { UseCaseError } from '../UseCaseError';

export class DatabaseError extends Result<UseCaseError> {
  constructor() {
    super(false, {
      message: 'Database failed to perform the requested operation'
    } as UseCaseError);
  }
}
