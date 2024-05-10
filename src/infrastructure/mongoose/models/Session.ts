import { Document, PaginateModel, Schema, SchemaTypes } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { avilaTekConnection } from '../';
import { UserDocument } from './User';


interface SessionToPersistance {
  token: string;
  refresh: string;
  user: string | UserDocument;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface SessionDocument extends Document, SessionToPersistance {}

type SessionModel<T extends Document> = PaginateModel<T>;

let SessionModel: SessionModel<SessionDocument>;

const loadSessionModel = (): void => {
  const SessionSchema = new Schema(
    {
        token: SchemaTypes.String,
        refresh: SchemaTypes.String,
        user: { type: SchemaTypes.ObjectId, ref: 'User' },
        active: SchemaTypes.Boolean,
        createdAt: SchemaTypes.Date,
        updatedAt: SchemaTypes.Date
    },
    { collection: 'Session' }
  );

  SessionSchema.plugin(mongoosePaginate);

  SessionModel = avilaTekConnection.model<SessionDocument>(
    'Session',
    SessionSchema
  ) as SessionModel<SessionDocument>;
};

export {
    SessionModel,
    loadSessionModel,
    SessionDocument,
    SessionToPersistance
};
