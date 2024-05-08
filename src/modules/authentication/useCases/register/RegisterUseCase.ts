import {
    Either,
    GenericError,
    Result,
    right,
    UseCaseError,
    wrong,
} from '../../../../core/errors';

import jwt from 'jsonwebtoken';
import { jwtSecret } from '../../../../env';

import { registerDTO } from './RegisterDTO';
import { registerResponse } from './RegisterResponse';
import { UserMongoRepository } from '../../../user/repositories/userMongoRepository';
import { UserToPersistance } from '../../../../infrastructure/mongoose/models/User';
import Bcrypt from '../../functions/bcrypt'


type Response = Either<Result<UseCaseError>, Result<registerResponse>>;
export class RegisterUseCase {

    public async execute(req: registerDTO):Promise<Response>{ // can return error add

        const userRepository = new UserMongoRepository();

        const firstName = req.firstName;
        const lastName = req.lastName;
        const documentId = req.documentId;
        const email = req.email;
        const password = req?.password || "123456";
        const phone = req.phone;

        if (
            !firstName || 
            !lastName || 
            !documentId || 
            !email || 
            !phone ||
            !password
        ){
            return wrong(
                new GenericError.InvalidParameters('firstName, lastName, email, phone or password not found')
            );
        }
                
        const userObject = {
            firstName: firstName,
            lastName: lastName,
            documentId: documentId,
            email: email,
            password: await Bcrypt.cryptPassword(password),
            phone: phone
        } as UserToPersistance;
        
        try {
            await userRepository.create(userObject);
        } catch (err) {
            return wrong( new GenericError.DatabaseError() );
        }

        return right(
            Result.OK<registerResponse>({ success: true})
        );
    };
}