import { 
	Request, 
	Response, 
	Router 
} from 'express';

import { authGuard } from '../middleware';

import {
    CreateRetailController,
    createRetailUseCase
} from '../modules/retail/useCases/createRetail';

import {
    HistoryRetailByUserController,
    historyRetailByUserUseCase
} from '../modules/retail/useCases/historyRetailByUser';


export const RetailRouter = Router();

RetailRouter.post(
    '/',
    authGuard,
	(req: Request, res: Response) => {
        const controller = new CreateRetailController(createRetailUseCase);
        controller.execute(req, res);
      }
);

RetailRouter.get(
    '/user',
    authGuard,
	(req: Request, res: Response) => {
        const controller = new HistoryRetailByUserController(historyRetailByUserUseCase);
        controller.execute(req, res);
      }
);
