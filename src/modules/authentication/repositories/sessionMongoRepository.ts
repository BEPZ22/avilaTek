import { Session } from 'inspector';
import { SessionDocument, SessionModel, SessionToPersistance  } from '../../../infrastructure/mongoose/models/Session';

export class SessionMongoRepository {

    async find(
        token: string, 
        refresh: string, 
        userId: string
    ): Promise<SessionDocument | null> {
        let session = await SessionModel.findOne({
                token: token,
                refresh: refresh,
                user: userId,
                active: true
            });
        
        if(!session){
            return null;
        }
        
        return session;
    }

    async create(session : SessionToPersistance): Promise<void>{
        await SessionModel.create(session);
    }

    async update(id: string, session : SessionToPersistance): Promise<void>{
        await SessionModel.updateOne(
            { _id: id },
            { 
                token: session.token,
                refresh: session.refresh,
                updatedAt: new Date()
            }
        );
    }
}