import { Document, PaginateModel, Schema, SchemaTypes } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { avilaTekConnection } from '../';

interface RetailToPersistance {
  userId: string;
  product: {
    productId: string;
    productQty: number;
  }[],
  total: number;
  createdAt: Date;
}

interface RetailDocument extends Document, RetailToPersistance {}

type RetailModel<T extends Document> = PaginateModel<T>;

let RetailModel: RetailModel<RetailDocument>;

const loadRetailModel = (): void => {
  const RetailSchema = new Schema(
    {
      userId: { type: SchemaTypes.ObjectId, ref: 'User' },
      product: [
        {
            productId: { type: SchemaTypes.ObjectId, ref: 'Product' },
            productQty: SchemaTypes.Number,
        }
      ],
      total: SchemaTypes.Number,
      createdAt: SchemaTypes.Date
    },
    { collection: 'Retail' }
  );

  RetailSchema.plugin(mongoosePaginate);

  RetailModel = avilaTekConnection.model<RetailDocument>(
    'Retail',
    RetailSchema
  ) as RetailModel<RetailDocument>;
};

export {
    RetailModel,
    loadRetailModel,
    RetailDocument,
    RetailToPersistance
};
