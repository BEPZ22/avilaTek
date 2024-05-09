import {
    Either,
    GenericError,
    Result,
    right,
    UseCaseError,
    wrong,
} from '../../../../core/errors';

import { updateProductDTO } from './UpdateProductDTO';
import { updateProductResponse } from './UpdateProductResponse';
import { ProductMongoRepository } from '../../repositories/productMongoRepository';
import { ProductToPersistance, ProductDocument } from '../../../../infrastructure/mongoose/models/Product';



type Response = Either<Result<UseCaseError>, Result<updateProductResponse>>;
export class UpdateProductUseCase {

    public async execute(req: updateProductDTO):Promise<Response>{

        const productRepository = new ProductMongoRepository();

        const id = req.id;
        const name = req.name;
        const sku = req.sku;
        const stock = req.stock;
        const description = req.description;
        const price = req.price;

        if (!id){
            return wrong(
                new GenericError.InvalidParameters('Product id not found')
            );
        }
        
        let product: ProductDocument | null; 
        try {
            product = await productRepository.findById(id);
        } catch (error) {
            return wrong( new GenericError.DatabaseError() );
        }

        if(!product){
            return wrong( new GenericError.NotFound(`Product with id ${id} not found`) );
        }

        const productObject = {
            name: name || product.name,
            sku: sku || product.sku,
            stock: stock || product.stock,
            description: description || product.description,
            price: price || product.price,
            updatedAt: new Date()
        } as ProductToPersistance;
        
        try {
            await productRepository.update(id, productObject);
        } catch (err) {
            return wrong( new GenericError.DatabaseError() );
        }

        return right(
            Result.OK<updateProductResponse>({ success: true})
        );
    };
}