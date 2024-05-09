import { HttpController } from '../../../../core/http/HttpController';
import { BulkDeleteProductsUseCase } from './BulkDeleteProductsUseCase';
import { bulkDeleteProductsDTO } from './BulkDeleteProductsDTO';
import { bulkDeleteProductsResponse } from './BulkDeleteProductsResponse';

export class BulkDeleteProductsController extends HttpController{
    private bulkDeleteProductsUseCase: BulkDeleteProductsUseCase;

    constructor(useCase: BulkDeleteProductsUseCase){
        super();
        this.bulkDeleteProductsUseCase = useCase;
    }

    public async executeImpl():Promise<any>{
                
        const dto = this.req.body as bulkDeleteProductsDTO;
        
        const result = await this.bulkDeleteProductsUseCase.execute(dto);

        if (result.isWrong()){
            const error = result.value;
            return this.fail(error.errorValue().message);
        }

        return this.ok(
            this.res,
            result.value.getValue() as bulkDeleteProductsResponse
        );
    }
}