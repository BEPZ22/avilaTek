import { loadUserModel } from './User';
import { loadSessionModel } from './Session';
import { loadProductModel } from './Product';

export const LoadModels = (): void => {
    loadUserModel();
    loadSessionModel();
    loadProductModel();
};