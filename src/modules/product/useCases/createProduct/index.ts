import { CreateProductController } from './CreateProductController';
import { CreateProductUseCase } from './CreateProductUseCase';

const createProductUseCase = new CreateProductUseCase();

export { CreateProductController, createProductUseCase };
