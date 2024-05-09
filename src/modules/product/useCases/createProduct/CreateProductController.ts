import { HttpController } from '../../../../core/http/HttpController';
import { CreateProductUseCase } from './CreateProductUseCase';
import { createProductDTO } from './CreateProductDTO';
import { createProductResponse } from './CreateProductResponse';

export class CreateProductController extends HttpController{
    private createProductUseCase: CreateProductUseCase;

    constructor(useCase: CreateProductUseCase){
        super();
        this.createProductUseCase = useCase;
    }

    public async executeImpl():Promise<any>{
                
        const dto = this.req.body as createProductDTO;
        
        const result = await this.createProductUseCase.execute(dto);

        if (result.isWrong()){
            const error = result.value;
            return this.fail(error.errorValue().message);
        }

        return this.ok(
            this.res,
            result.value.getValue() as createProductResponse
        );
    }
}