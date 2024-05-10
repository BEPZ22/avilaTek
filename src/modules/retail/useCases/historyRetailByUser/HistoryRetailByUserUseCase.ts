import {
    Either,
    GenericError,
    Result,
    right,
    UseCaseError,
    wrong,
} from '../../../../core/errors';

import { historyRetailByUserDTO } from './HistoryRetailByUserDTO';
import { historyRetailByUserResponse } from './HistoryRetailByUserResponse';
import { RetailMongoRepository } from '../../repositories/retailMongoRepository';
import { RetailDocument } from '../../../../infrastructure/mongoose/models/Retail';



type Response = Either<Result<UseCaseError>, Result<historyRetailByUserResponse>>;
export class HistoryRetailByUserUseCase {

    public async execute(req: historyRetailByUserDTO):Promise<Response>{

        const retailRepository = new RetailMongoRepository();

        const userId = req.userId;
        const currentPage = req.currentPage;
        const perPage = req.perPage;

        if (!userId){
            return wrong(
                new GenericError.InvalidParameters('User id not found')
            );
        }
        
        let retails: RetailDocument[] | [];
        try {
            retails = await retailRepository.find({
                filters: { userId }, 
                pagination: { currentPage, perPage }
            });
        } catch (err) {
            console.log(err)
            return wrong( new GenericError.DatabaseError() );
        }


        return right(
            Result.OK<historyRetailByUserResponse>({
                retails
            })
        );
    };
}