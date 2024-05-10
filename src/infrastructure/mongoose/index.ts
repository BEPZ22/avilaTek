import mongoose, { Connection } from 'mongoose';
import { avilaTekDB } from '../../env';
import { LoadModels } from './models';

enum DatabaseError {
  ConnectionError = 'Unable to connect to database'
}

let avilaTekConnection: Connection;

async function ConnectDatabase(): Promise<void> {
  try {
    avilaTekConnection = mongoose.createConnection(avilaTekDB, {});
    LoadModels();
  } catch (e) {
    throw new Error(DatabaseError.ConnectionError);
  }
}

export { ConnectDatabase, avilaTekConnection };
