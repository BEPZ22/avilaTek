import {
    Either,
    GenericError,
    Result,
    right,
    UseCaseError,
    wrong,
} from '../../../../core/errors';

import { createProductDTO } from './CreateProductDTO';
import { createProductResponse } from './CreateProductResponse';
import { ProductMongoRepository } from '../../repositories/productMongoRepository';
import { ProductToPersistance } from '../../../../infrastructure/mongoose/models/Product';



type Response = Either<Result<UseCaseError>, Result<createProductResponse>>;
export class CreateProductUseCase {

    public async execute(req: createProductDTO):Promise<Response>{

        const productRepository = new ProductMongoRepository();

        const name = req.name;
        const sku = req.sku;
        const stock = req.stock;
        const description = req.description;
        const price = req.price;

        if (
            !name || 
            !sku || 
            !stock || 
            !description || 
            !price
        ){
            return wrong(
                new GenericError.InvalidParameters('name, sku, stock, description or price not found')
            );
        }
                
        const productObject = {
            name: name,
            sku: sku,
            stock: stock,
            description: description,
            price: price,
            active: true,
            createdAt: new Date()
        } as ProductToPersistance;
        
        try {
            await productRepository.create(productObject);
        } catch (err) {
            return wrong( new GenericError.DatabaseError() );
        }

        return right(
            Result.OK<createProductResponse>({ success: true})
        );
    };
}