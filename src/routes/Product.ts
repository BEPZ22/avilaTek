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

import {
    ListProductsController,
    listProductsUseCase
} from '../modules/product/useCases/listProducts';

import {
    BulkDeleteProductsController,
    bulkDeleteProductsUseCase
} from '../modules/product/useCases/bulkDelete';

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

ProductRouter.delete(
    '/',
    authGuard,
	(req: Request, res: Response) => {
        const controller = new BulkDeleteProductsController(bulkDeleteProductsUseCase);
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

ProductRouter.get(
    '/',
    authGuard,
	(req: Request, res: Response) => {
        const controller = new ListProductsController(listProductsUseCase);
        controller.execute(req, res);
      }
);
