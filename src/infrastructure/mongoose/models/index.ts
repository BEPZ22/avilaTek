import { loadUserModel } from './User';
import { loadSessionModel } from './Session';
import { loadProductModel } from './Product';
import { loadRetailModel } from './Retail';

export const LoadModels = (): void => {
    loadUserModel();
    loadSessionModel();
    loadProductModel();
    loadRetailModel();
};