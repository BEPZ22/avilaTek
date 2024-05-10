import {
    Either,
    GenericError,
    Result,
    right,
    UseCaseError,
    wrong,
} from '../../../../core/errors';

import jwt from 'jsonwebtoken';
import { randomBytes } from 'crypto';

import { jwtSecret } from '../../../../env';

import { loginDTO } from './LoginDTO';
import { loginResponse } from './LoginResponse';
import { UserMongoRepository } from '../../../user/repositories/userMongoRepository';
import { SessionMongoRepository } from '../../../authentication/repositories/sessionMongoRepository';

import { SessionToPersistance }  from '../../../../infrastructure/mongoose/models/Session';// to types not necessary resolver when mappers create

import Bcrypt from '../../functions/bcrypt';
// CREATE MAPPERS TO FORMAT THE DATA

type Response = Either<Result<UseCaseError>, Result<loginResponse>>;
export class LoginUseCase {
    
    public async execute(req: loginDTO):Promise<Response>{ // can return error add

        const userRepository = new UserMongoRepository();
        const sessionRepository = new SessionMongoRepository();

        const email = req.email;
        const password = req.password;

        if (
            !email ||
            !password
        ){
            return wrong(
                new GenericError.InvalidParameters('Please provide email or password')
            );
        }
        
        let user;
        try {
           user = await userRepository.findByEmail(email);
        } catch (err) {
            console.log(err);
            return wrong( new GenericError.DatabaseError() );
        }
        
        if(
            !user || 
            !await Bcrypt.comparePassword(password, user?.password as string)
        ){
            return wrong(
                new GenericError.NotFound('Invalid credentials')
            );
        }

        let token: string = '';
        try {
            token = jwt.sign(
                {
                    userId: user._id,
                    userFirstName: user.firstName,
                    userLastName: user.lastName
                },
                jwtSecret
            );
        } catch (err) {
            return wrong( 
                new GenericError.UnexpectedError('failed to create token') 
            );
        }

        const newRefreshToken = randomBytes(32).toString('hex');

        let sessionToCreate = {
            token: token,
            refresh: newRefreshToken,
            user: user._id,
            active: true,
            createdAt: new Date(),
            updatedAt: new Date()
        } as SessionToPersistance;

        try {
            await sessionRepository.create(sessionToCreate);
        } catch (err) {
            return wrong( 
                new GenericError.DatabaseError() 
            );
        }

        return right(
            Result.OK<loginResponse>({ 
                token : token,
                refreshToken : newRefreshToken
            })
        );
    };
}