import { HttpController } from '../../../../core/http/HttpController';
import { FindProductByIdUseCase } from './FindProductByIdUseCase';
import { findProductByIdDTO } from './FindProductByIdDTO';
import { findProductByIdResponse } from './FindProductByIdResponse';

export class FindProductByIdController extends HttpController{
    private findProductByIdUseCase: FindProductByIdUseCase;

    constructor(useCase: FindProductByIdUseCase){
        super();
        this.findProductByIdUseCase = useCase;
    }

    public async executeImpl():Promise<any>{
        
        this.req.body.id = this.req.params.id;
        
        const dto = this.req.body as findProductByIdDTO;
        
        const result = await this.findProductByIdUseCase.execute(dto);

        if (result.isWrong()){
            const error = result.value;
            return this.fail(error.errorValue().message);
        }

        return this.ok(
            this.res,
            result.value.getValue() as findProductByIdResponse
        );
    }
}