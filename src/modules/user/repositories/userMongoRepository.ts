import { UserDocument, UserModel, UserToPersistance } from '../../../infrastructure/mongoose/models/User';

export class UserMongoRepository {

    async findByEmail(
        email: string
    ): Promise<UserDocument | null> {
        let user = null;
        user = await UserModel
            .findOne({
                email: email
            })

        if (!user){
            return null;
        }
        return user;
    }

    async findById(id: string): Promise<UserDocument | null> {
        let user = null;
        user = await UserModel
            .findById(id);

        if (!user){
            return null;
        }
        return user;
    }

    async create(user : UserToPersistance): Promise<UserDocument>{
        return await UserModel.create(user);
    }
}