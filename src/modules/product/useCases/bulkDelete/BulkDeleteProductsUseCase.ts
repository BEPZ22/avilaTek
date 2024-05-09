import {
    Either,
    GenericError,
    Result,
    right,
    UseCaseError,
    wrong,
} from '../../../../core/errors';

import { bulkDeleteProductsDTO } from './BulkDeleteProductsDTO';
import { bulkDeleteProductsResponse } from './BulkDeleteProductsResponse';
import { ProductMongoRepository } from '../../repositories/productMongoRepository';


type Response = Either<Result<UseCaseError>, Result<bulkDeleteProductsResponse>>;
export class BulkDeleteProductsUseCase {

    public async execute(req: bulkDeleteProductsDTO):Promise<Response>{

        const productRepository = new ProductMongoRepository();

        const ids = req.ids;

        if (!ids || ids.length === 0){
            return wrong(
                new GenericError.InvalidParameters(`We don't have products to delete`)
            );
        }
        

        try {
            await productRepository.bulkDelete(ids);
        } catch (error) {
            return wrong( new GenericError.DatabaseError() );
        }

        return right(
            Result.OK<bulkDeleteProductsResponse>({ success: true})
        );
    };
}