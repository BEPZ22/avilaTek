import { Document, PaginateModel, Schema, SchemaTypes } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { avilaTekConnection } from '../';


interface UserToPersistance {
  firstName?: string;
  lastName?: string;
  documentId: string;
  email: string;
  password: string;
  phone: string;
}

interface UserDocument extends Document, UserToPersistance {}

type UserModel<T extends Document> = PaginateModel<T>;

let UserModel: UserModel<UserDocument>;

const loadUserModel = (): void => {
  const UserSchema = new Schema(
    {
        firstName: SchemaTypes.String,
        lastName: SchemaTypes.String,
        documentId: SchemaTypes.String,
        email: SchemaTypes.String,
        password: SchemaTypes.String,
        phone: SchemaTypes.String,
    },
    { collection: 'User' }
  );

  UserSchema.plugin(mongoosePaginate);

  UserModel = avilaTekConnection.model<UserDocument>(
    'User',
    UserSchema
  ) as UserModel<UserDocument>;
};

export {
    UserModel,
    loadUserModel,
    UserDocument,
    UserToPersistance
};
