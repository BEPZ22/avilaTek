import {
    Either,
    GenericError,
    Result,
    right,
    UseCaseError,
    wrong,
} from '../../../../core/errors';

import { createRetailDTO } from './CreateRetailDTO';
import { createRetailResponse } from './CreateRetailResponse';
import { RetailMongoRepository } from '../../repositories/retailMongoRepository';
import { RetailToPersistance, RetailDocument } from '../../../../infrastructure/mongoose/models/Retail';
import { ProductDocument } from '../../../../infrastructure/mongoose/models/Product';
import { ProductMongoRepository } from '../../../product/repositories/productMongoRepository';


type Response = Either<Result<UseCaseError>, Result<createRetailResponse>>;
export class CreateRetailUseCase {

    public async execute(req: createRetailDTO):Promise<Response>{

        const retailRepository = new RetailMongoRepository();
        const productRepository = new ProductMongoRepository();

        const userId = req.userId;
        const product = req.product;

        if (
            !userId || 
            !product ||
            product.length === 0
        ){
            return wrong(
                new GenericError.InvalidParameters('userId or products not found')
            );
        }
        
        const userRetailProductIds = product.map( p => {
            return p.productId;
        });

        let foundProducts: ProductDocument[] | [];
        try {
            foundProducts = await productRepository.findByIds(userRetailProductIds);
        } catch (error) {
            return wrong( new GenericError.DatabaseError() );
        }

        if(foundProducts.length === 0 ){
            return wrong(
                new GenericError.UnexpectedError(`All the products you try to buy not exist`)
            );
        }

        let foundProductsIds: string[] = foundProducts.map( p => { 
            return p._id.toString() 
        });

        if( 
            (userRetailProductIds.length !== foundProducts.length) || 
            (!this.compareStringArrays(foundProductsIds, userRetailProductIds))
        ){
            return wrong(
                new GenericError.UnexpectedError(`One of the products you try to buy not exist`)
            );
        }

        const bill = [];
        let total = 0;

        for(let p of product){
            let pickProduct = this.pickProduct(
                p.productId.toString(), 
                foundProducts
            );

            if(!pickProduct){
                return wrong(
                    new GenericError.UnexpectedError(`This product with id ${p.productId} does not exist`)
                );
            }

            if(pickProduct.stock < p.productQty){
                return wrong(
                    new GenericError.UnexpectedError(`${pickProduct.name} out of stock`)
                );
            }

            pickProduct.stock =  pickProduct.stock - p.productQty;
            await pickProduct.save();

            const productTotalPrice = Number(pickProduct?.price) * p.productQty;
            total = total + productTotalPrice;

            bill.push(
                {
                    "name": pickProduct?.name || '',
                    "qty": p.productQty,
                    "unitPrice": pickProduct?.price || 0,
                    "totalPrice": productTotalPrice
                }
            );
        }

        const retailObject = {
            userId: userId,
            product: product,
            total: total,
            createdAt: new Date()
        } as RetailToPersistance;
        
        try {
            await retailRepository.create(retailObject);
        } catch (err) {
            console.log(err);
            return wrong( new GenericError.DatabaseError() );
        }

        return right(
            Result.OK<createRetailResponse>({ bill, total })
        );
    };

    private compareStringArrays(array1:string[], array2:string[]) {
        const set = new Set(array2);
        return array1.every(element => set.has(element));
    }

    private pickProduct(id:string, foundProducts: ProductDocument[]){
        return foundProducts.find(
            (product) => product._id.toString() === id
        )
    }
}