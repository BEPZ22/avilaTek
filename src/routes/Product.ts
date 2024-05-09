import { 
	Request, 
	Response, 
	Router 
} from 'express';

import { authGuard } from '../middleware';

import {
    CreateProductController,
    createProductUseCase
} from '../modules/product/useCases/createProduct';

import {
    FindProductByIdController,
    findProductByIdUseCase
} from '../modules/product/useCases/findProductById';
export const ProductRouter = Router();

import {
    UpdateProductController,
    updateProductUseCase
} from '../modules/product/useCases/updateProduct';

ProductRouter.post(
    '/',
    authGuard,
	(req: Request, res: Response) => {
        const controller = new CreateProductController(createProductUseCase);
        controller.execute(req, res);
      }
);

ProductRouter.put(
    '/',
    authGuard,
	(req: Request, res: Response) => {
        const controller = new UpdateProductController(updateProductUseCase);
        controller.execute(req, res);
      }
);

ProductRouter.get(
    '/:id',
    authGuard,
	(req: Request, res: Response) => {
        const controller = new FindProductByIdController(findProductByIdUseCase);
        controller.execute(req, res);
      }
);
