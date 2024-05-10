import { ProductDocument, ProductModel, ProductToPersistance  } from '../../../infrastructure/mongoose/models/Product';

export interface Filters {
    filters?: {
        name?: string;
        sku?: string;
        stock?: number;
        price?: number;
        active?: boolean;
    },
    pagination?:{
        currentPage?: number;
        perPage?: number;
    }
}

export class ProductMongoRepository {

    async findById(id: string): Promise<ProductDocument | null> {
        return await ProductModel.findById(id);
    }

    async findByIds(ids: string[]): Promise<ProductDocument[] | []>{
        return await ProductModel
            .find({
                $and: [
                    { _id: { $in: ids } },
                    { active: true }
                ]
                
            })
            .select({_id: 1, stock: 1, price: 1, name: 1})
    }

    async find(filters: Filters): Promise<ProductDocument[] | []> {
        const filter = filters.filters;
        const pagination = filters.pagination;

        const query: { [key: string]: any } = {};

        if(undefined !== filter){

            if(filter.name){
                let value = filter.name.replace(/^\s+|\s+$/g, '');
                value = value.replace(/ +(?= )/g, '');
                query.name = {$regex: new RegExp(value, 'i')};
            }

            if(filter.sku){
                query.sku = filter.sku;
            }

            if(filter.stock){
                query.stock = filter.stock;
            }

            if(filter.active !== undefined){
                query.active = filter.active;
            }else{
                filter.active = true;
            }
        }

        if(undefined !== pagination?.currentPage || undefined !== pagination?.perPage ){
            const page = pagination?.currentPage ? pagination?.currentPage : 1;
            const limit = pagination?.perPage ? pagination.perPage : 10;
            const options = {
                page,
                limit
            }
            return (await ProductModel.paginate(query, options)).docs;
        }

        return await ProductModel
            .find(query);
    }

    async create(product : ProductToPersistance): Promise<void>{
        await ProductModel.create(product);
    }

    async update(id: string, product : ProductToPersistance): Promise<void>{
        await ProductModel.updateOne(
            { _id: id },
            { 
                name: product.name,
                sku: product.sku,
                stock: product.stock,
                description: product.description,
                price: product.price,
                updatedAt: new Date()
            }
        );
    }

    async delete(id: string): Promise<void>{
        await ProductModel.updateOne(
            { _id: id },
            {
                active: false
            }
        );
    }

    async bulkDelete(ids: string[]): Promise<void>{
        await ProductModel.updateMany(
            { 
                _id: { $in: ids } 
            },
            {
                active: false
            }
        );
    }
}