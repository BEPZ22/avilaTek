import { Document, PaginateModel, Schema, SchemaTypes } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { avilaTekConnection } from '../';


interface ProductToPersistance {
  name: string;
  sku: string;
  stock: number;
  description: string;
  price: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface ProductDocument extends Document, ProductToPersistance {}

type ProductModel<T extends Document> = PaginateModel<T>;

let ProductModel: ProductModel<ProductDocument>;

const loadProductModel = (): void => {
  const ProductSchema = new Schema(
    {
      name: SchemaTypes.String,
      sku: SchemaTypes.String,
      stock: SchemaTypes.Number,
      description: SchemaTypes.String,
      price: SchemaTypes.String,
      active: SchemaTypes.Boolean,
      createdAt: SchemaTypes.Date,
      updatedAt: SchemaTypes.Date
    },
    { collection: 'Product' }
  );

  ProductSchema.plugin(mongoosePaginate);

  ProductModel = avilaTekConnection.model<ProductDocument>(
    'Product',
    ProductSchema
  ) as ProductModel<ProductDocument>;
};

export {
    ProductModel,
    loadProductModel,
    ProductDocument,
    ProductToPersistance
};
