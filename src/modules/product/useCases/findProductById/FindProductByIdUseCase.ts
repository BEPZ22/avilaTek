import {
    Either,
    GenericError,
    Result,
    right,
    UseCaseError,
    wrong,
} from '../../../../core/errors';

import { findProductByIdDTO } from './FindProductByIdDTO';
import { findProductByIdResponse } from './FindProductByIdResponse';
import { ProductMongoRepository } from '../../repositories/productMongoRepository';
import { ProductToPersistance, ProductDocument } from '../../../../infrastructure/mongoose/models/Product';



type Response = Either<Result<UseCaseError>, Result<findProductByIdResponse>>;
export class FindProductByIdUseCase {

    public async execute(req: findProductByIdDTO):Promise<Response>{

        const productRepository = new ProductMongoRepository();

        const id = req.id;

        if (!id){
            return wrong(
                new GenericError.InvalidParameters('Product id not found')
            );
        }
        
        let product: ProductDocument | null;
        try {
            product = await productRepository.findById(id);
        } catch (err) {
            return wrong( new GenericError.DatabaseError() );
        }

        if(!product){
            return wrong(
                new GenericError.NotFound(`Product with id ${id} not found`)
            );
        }

        return right(
            Result.OK<findProductByIdResponse>({
                name: product.name,
                sku: product.sku,
                stock: product.stock,
                description: product.description,
                price: product.price,
                active: product.active,
                createdAt: product.createdAt
            })
        );
    };
}