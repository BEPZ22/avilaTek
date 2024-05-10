import { RetailDocument, RetailModel, RetailToPersistance  } from '../../../infrastructure/mongoose/models/Retail';

export interface Filters {
    filters?: {
        userId?: string;
    },
    pagination?:{
        currentPage?: number;
        perPage?: number;
    }
}

export class RetailMongoRepository {

    async findById(id: string): Promise<RetailDocument | null> {
        return await RetailModel.findById(id);
    }

    async find(filters: Filters): Promise<RetailDocument[] | []> {
        const filter = filters.filters;
        const pagination = filters.pagination;

        const query: { [key: string]: any } = {};

        const populate = {
            path: 'product.productId',
            model: 'Product',
            select: {
                name: 1,
                sku: 1,
                description: 1,
                price: 1,
            }
        };

        if(undefined !== filter){

            if(filter.userId){
                query.userId = filter.userId;
            }

        }

        if(undefined !== pagination?.currentPage || undefined !== pagination?.perPage ){
            const page = pagination?.currentPage ? pagination?.currentPage : 1;
            const limit = pagination?.perPage ? pagination.perPage : 10;
            const options = {
                page,
                limit
            }
            query.populate = populate;
            return (await RetailModel.paginate(query, options)).docs;
        }

        return await RetailModel
            .find(query)
            .populate(populate);
    }

    async create(retail : RetailToPersistance): Promise<void>{
        await RetailModel.create(retail);
    }
}