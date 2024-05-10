import {
    Either,
    GenericError,
    Result,
    right,
    UseCaseError,
    wrong,
} from '../../../../core/errors';

import { listProductsDTO } from './ListProductsDTO';
import { listProductsResponse } from './ListProductsResponse';
import { ProductMongoRepository } from '../../repositories/productMongoRepository';
import { ProductToPersistance, ProductDocument } from '../../../../infrastructure/mongoose/models/Product';



type Response = Either<Result<UseCaseError>, Result<listProductsResponse>>;
export class ListProductsUseCase {

    public async execute(req: listProductsDTO):Promise<Response>{

        const productRepository = new ProductMongoRepository();
        
        const name = req.name;
        const sku = req.sku;
        const stock = req.stock;
        const active = req.active;
        const currentPage = req.currentPage;
        const perPage = req.perPage;

        let productList: ProductDocument[] | [];
        try {
            productList = await productRepository.find(
                {
                    filters: { name, sku, stock, active},
                    pagination: { currentPage, perPage}
                }
            );
        } catch (err) {
            return wrong( new GenericError.DatabaseError() );
        }

        const products = productList.map(product => {
            return {
                id: product._id,
                name: product.name,
                sku: product.sku,
                stock: product.stock,
                description: product.description,
                price: product.price,
                active: product.active,
                createdAt: product.createdAt,
            }
        });

        return right(
            Result.OK<listProductsResponse>({products})
        );
    };
}