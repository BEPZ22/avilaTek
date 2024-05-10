import { BulkDeleteProductsController } from './BulkDeleteProductsController';
import { BulkDeleteProductsUseCase } from './BulkDeleteProductsUseCase';

const bulkDeleteProductsUseCase = new BulkDeleteProductsUseCase();

export { BulkDeleteProductsController, bulkDeleteProductsUseCase };
