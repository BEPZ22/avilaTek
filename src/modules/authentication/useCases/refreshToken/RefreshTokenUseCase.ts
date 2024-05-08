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

import { refreshTokenDTO } from './RefreshTokenDTO';
import { refreshTokenResponse } from './RefreshTokenResponse';

import { UserMongoRepository } from '../../../user/repositories/userMongoRepository';
import { SessionMongoRepository } from '../../../authentication/repositories/sessionMongoRepository';

import { SessionToPersistance }  from '../../../../infrastructure/mongoose/models/Session';// to types not necessary resolver when mappers create

// CREATE MAPPERS TO FORMAT THE DATA

type Response = Either<Result<UseCaseError>, Result<refreshTokenResponse>>;
export class RefreshTokenUseCase {
    
    public async execute(req: refreshTokenDTO):Promise<Response>{ // can return error add

        const sessionRepository = new SessionMongoRepository();
        const userRepository = new UserMongoRepository();

        const token = req.token;
        const refreshToken = req.refreshToken;
        const userId = req.userId;

        if (
            !token ||
            !refreshToken ||
            !userId
        ){
            return wrong(
                new GenericError.InvalidParameters(
                    'Please provide all the token credentials'
                )
            );
        }
                        
        let session;
        try {
            session = await sessionRepository.find(
                token,
                refreshToken,
                userId
            );
        } catch (err) {
            console.log(err);
            return wrong( new GenericError.DatabaseError() );
        }
        
        if(!session){
            return wrong(
                new GenericError.NotFound(
                    'Session not found, please login again'
                )
            );
        }
        
        let user;
        try {
            user = await userRepository.findById(userId);
        } catch (err) {
            console.log(err);
            return wrong( new GenericError.DatabaseError() );
        }

        if(!user){
            return wrong(
                new GenericError.NotFound(
                    `This user ${userId} has not been found`
                )
            );
        };

        let newToken: string = '';
        try {
            newToken = jwt.sign(
                {
                    userId: user._id,
                },
                jwtSecret
            );
        } catch (err) {
            return wrong( 
                new GenericError.UnexpectedError('failed to create token') 
            );
        }
        
        const newRefreshToken = randomBytes(32).toString('hex');
        
        let sessionToUpdate = {
            token: newToken,
            refresh: newRefreshToken,
            user: user._id,
            active: true,
            createdAt: session.createdAt,
            updatedAt: new Date()
        } as SessionToPersistance;

        try {
            await sessionRepository.update(session._id, sessionToUpdate);
        } catch (err) {
            return wrong( new GenericError.DatabaseError() );
        }

        return right(
            Result.OK<refreshTokenResponse>({ 
                token : newToken,
                refreshToken: newRefreshToken
            })
        );
    };
}