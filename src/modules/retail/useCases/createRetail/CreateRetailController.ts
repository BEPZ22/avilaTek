import { HttpController } from '../../../../core/http/HttpController';
import { CreateRetailUseCase } from './CreateRetailUseCase';
import { createRetailDTO } from './CreateRetailDTO';
import { createRetailResponse } from './CreateRetailResponse';

export class CreateRetailController extends HttpController{
    private createRetailUseCase: CreateRetailUseCase;

    constructor(useCase: CreateRetailUseCase){
        super();
        this.createRetailUseCase = useCase;
    }

    public async executeImpl():Promise<any>{
                
        const dto = this.req.body as createRetailDTO;
        
        const result = await this.createRetailUseCase.execute(dto);

        if (result.isWrong()){
            const error = result.value;
            return this.fail(error.errorValue().message);
        }

        return this.ok(
            this.res,
            result.value.getValue() as createRetailResponse
        );
    }
}