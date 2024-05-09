import { HttpController } from '../../../../core/http/HttpController';
import { UpdateProductUseCase } from './UpdateProductUseCase';
import { updateProductDTO } from './UpdateProductDTO';
import { updateProductResponse } from './UpdateProductResponse';

export class UpdateProductController extends HttpController{
    private updateProductUseCase: UpdateProductUseCase;

    constructor(useCase: UpdateProductUseCase){
        super();
        this.updateProductUseCase = useCase;
    }

    public async executeImpl():Promise<any>{
                
        const dto = this.req.body as updateProductDTO;
        
        const result = await this.updateProductUseCase.execute(dto);

        if (result.isWrong()){
            const error = result.value;
            return this.fail(error.errorValue().message);
        }

        return this.ok(
            this.res,
            result.value.getValue() as updateProductResponse
        );
    }
}