import { loadUserModel } from './User';
import { loadSessionModel } from './Session';


export const LoadModels = (): void => {
    loadUserModel();
    loadSessionModel();
};